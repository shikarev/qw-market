import {
  Backdrop,
  CircularProgress,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  styled,
  Typography
} from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import classNames from 'classnames/bind';
import React, { BaseSyntheticEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProductSearchQuery } from '../../../api/search';
import { useDeleteSearchHistoryMutation, useGetSearchHistoryQuery } from '../../../api/searchHistory';
import { IProductData } from '../../../types/Product';
import { SearchHistoryItem } from '../../../types/SearchHistory';
import { debounceTime } from '../../../utils/utils';
import SearchHistory from '../../Header/SearchHistory';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface ProductSearchParams {
    renderInput: (params: TextFieldProps) => React.ReactNode;
    largeSize?: boolean;
    callback?: () => void;
}

enum KeyboardKeys {
    Escape = 'Escape',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown'
}

const SearchResultList = styled(MenuList)(() => ({
    root: {
        '& .MuiMenuItem-root': {
            whiteSpace: 'normal'
        }
    }
}))

const SearchPaper = styled(Paper)(() => ({
    root: {
        borderRadius: '0 0 2rem 2rem',
        boxShadow: `none`,
        marginTop: '1rem',
        paddingLeft: '1rem',
    }
}))

function ProductSearch({renderInput, largeSize,callback}: ProductSearchParams) {

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Array<IProductData> | null>([]);
    const [searchHistoryData, setSearchHistoryData] = useState<SearchHistoryItem[]>([]);
    const [locationQuery, setLocationQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [isLoading] = useState(false);
    const menuListRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLDivElement>();
    const navigate = useNavigate();
    const location = useLocation();
    const minLength = 1;

    const [cookies] = useCookies(['access_token']);
    const isAuthenticated = !!(cookies && cookies.access_token);

    const {searchHistory, refetch: searchHistoryRefetch} = useGetSearchHistoryQuery({limit: "3"}, {
        skip: !isAuthenticated,
        //refetchOnMountOrArgChange: true,
        selectFromResult: ({data}) => ({
            searchHistory: data?.data,
        })
    });

    const [deleteAllHistory] = useDeleteSearchHistoryMutation();
    //const [search, {data: searchResultData}] = useLazyProductSearchQuery();
    const {data: searchResultData} = useProductSearchQuery({query, limit: 12, page: 1},{skip: !query});
    const getInputField = () => inputRef.current!.querySelector('input') as HTMLInputElement;

    // useLayoutEffect(() => {
    //     history.listen(location => {
    //         setOpen(false);
    //         setFocused(false);
    //         if (/^\/search\/?$/.test(location.pathname)) {
    //             const query = (new URLSearchParams(location.search)).get('q') as string;
    //             setLocationQuery(query);
    //         } else {
    //             if (inputRef && inputRef.current) {
    //                 getInputField().value = '';
    //             }
    //             clear();
    //         }
    //     });
    // }, []);

    useEffect(() => {
        if(searchResultData) {
            setSearchResult(searchResultData.data);
            setQuery('');
        } else {
            setSearchResult(null);
        }
        setOpen(focused);
    },[searchResultData])

    useEffect(() => {
        const query = (new URLSearchParams(location.search)).get('q') as string;
        if (query) {
            setLocationQuery(query);
        }
    }, []);

    useEffect(() => {
        //@ts-ignore
        //search({query: locationQuery}, true);
        setQuery(locationQuery);
        if (inputRef && inputRef.current) {
            getInputField().value = locationQuery;
        }
    }, [locationQuery]);

    useEffect(() => {
        window.addEventListener('keydown', globalHandlerKeyDown);
        return () => {
            window.removeEventListener('keydown', globalHandlerKeyDown);
        };
    }, []);

    useEffect(() => {
        if(searchHistory) {
            setSearchHistoryData(searchHistory);
        }
    }, [searchHistory])

    useEffect(() => {
        if (focused && !open && searchHistoryData.length > 0) {
            setOpen(true);
        }
    }, [searchHistoryData])


    function inputChangeHandler(value: string) {
        debounceTime(500, async () => {
            const query = value.trim().length < minLength ? '' : value;
            //@ts-ignore
            //search({query: query}, true);
            setQuery(query);
        });

        if (value.trim().length < minLength) {
            setOpen(false);
        }
    }

    function selectHistorySearchResult(value: string) {
        if (value.trim().length) {
          navigate(`/search?q=${value}`);
            clear();
        }
    }

    function formSubmitHandler(e: FormEvent) {
        e.preventDefault();
        setOpen(false);
        const query = getInputField().value;
        if (query.trim().length) {
          navigate(`/search?q=${query}`);
            clear();
        }
    }

    function openProduct(product: IProductData) {
        navigate(`/product/${product.id}`);
        setOpen(false);
        clear();
    }

    function clear() {
        setSearchResult([]);
        setLocationQuery('');
    }

    function globalHandlerKeyDown(e: KeyboardEvent) {
        if (e.key === KeyboardKeys.Escape) {
            setOpen(false);
        }
    }

    function deleteSearchHistory(e: React.MouseEvent<HTMLParagraphElement>) {
        e.stopPropagation();
        deleteAllHistory();
        setSearchHistoryData([]);
        if(searchResult && searchResult.length === 0) {
            setOpen(false);
        }
    }

    return (
        <ClickAwayListener onClickAway={() => {
            setOpen(false);
            setFocused(false);
        }}>
            <>
                <form className={cx('form', focused && 'form__focused', open && 'form__opened')} noValidate
                      autoComplete="off"
                      onSubmit={formSubmitHandler}>
                    {renderInput({
                        fullWidth: true,
                        InputProps: {
                            ref: inputRef,
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading && <CircularProgress color="inherit" size={24}/>}
                                </React.Fragment>
                            ),
                        },
                        onInput: (e: BaseSyntheticEvent) => {
                            inputChangeHandler(e.target.value);
                        },
                        onFocus: () => {
                            setFocused(true);
                            searchHistoryRefetch();
                            if (searchResult?.length || searchHistoryData.length) {
                                setOpen(true);
                            }
                        },
                        onKeyDown: (e) => {
                            switch (e.key) {
                                case KeyboardKeys.ArrowUp:
                                    if (searchResult?.length || (searchHistoryData.length > 0)) {
                                        if (!open) {
                                            setOpen(true);
                                        }
                                        setTimeout(() => {
                                            const items: HTMLCollection = menuListRef && (menuListRef.current as HTMLUListElement).children;
                                            (items.item(items.length - 1) as HTMLLIElement).focus();
                                        });
                                    }
                                    break;

                                case KeyboardKeys.ArrowDown:
                                    if (searchResult?.length || (searchHistoryData.length > 0)) {
                                        if (!open) {
                                            setOpen(true);
                                        }
                                        setTimeout(() => {
                                            const items: HTMLCollection = menuListRef && (menuListRef.current as HTMLUListElement).children;
                                            if (items.item(1)) {
                                                (items.item(1) as HTMLLIElement).focus();
                                            }
                                        });
                                    }
                                    break;
                            }
                        }
                    })}
                    {!open || !inputRef ? null : (
                        <Popper
                            open={open}
                            anchorEl={inputRef.current}
                            placement='bottom'
                            className={cx('autocomplete_popper', 'autocomplete_popper__low', largeSize && 'autocomplete_popper__high')}
                            disablePortal
                        >
                            <SearchPaper>
                                {searchHistoryData.length > 0 && <p className={cx('label', 'label_delete')}
                                                                    onClick={(e) => deleteSearchHistory(e)}> Очистить </p>}
                                <SearchResultList ref={menuListRef}>
                                    {searchHistoryData.length > 0 &&
                                    <>
                                        <Typography className={cx('label', 'label_search')}> История поиска </Typography>
                                        <SearchHistory handleClick={selectHistorySearchResult}
                                                       data={searchHistoryData}/>
                                    </>
                                    }
                                    {(searchResult && searchResult.length > 0) &&
                                    <>
                                        <Typography className={cx('label', 'label_products')}> Товары </Typography>
                                        {searchResult && searchResult.slice(0,5).map((product) => (
                                            <MenuItem key={product.id} onClick={() => openProduct(product)}
                                                      className={cx('product-item')}>
                                                <div style={{backgroundImage: `url(${product.picturePath})`}}/>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </>}
                                </SearchResultList>
                            </SearchPaper>
                        </Popper>
                    )}
                </form>
                {!largeSize &&
                <Backdrop open={open} className={cx('backdrop')} onClick={() => {
                    setOpen(false);
                    setFocused(false);
                    if(callback){
                        callback();
                    }
                }}/>
                }
            </>
        </ClickAwayListener>
    );
}

export default ProductSearch;
