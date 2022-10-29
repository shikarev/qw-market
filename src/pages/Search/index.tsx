import React, {useState} from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import {useProductSearchQuery} from "../../api/search";

import ProductGrid from "../../components/common/ProductGrid";
import {QCircularProgress} from "../../components/common/Progress";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [query] = useState(urlParams.get('q') || '');
    const [page] = useState(Number(urlParams.get('page')) || 1);
    const [limit] = useState(Number(urlParams.get('limit')) || 12);
    const {data: products, isLoading, isFetching} = useProductSearchQuery({query, limit, page}, {skip: !query});

    function handlePagination(pageNumber: number) {
        const params = new URLSearchParams(location.search);
        params.set('page', String(pageNumber));
        navigate(`${location.pathname}?${params.toString()}`);
        (document.scrollingElement as HTMLElement).scrollTop = 0;
    }

    return (
        <div className={cx('search')}>
            {isLoading ? <QCircularProgress/> :
            products && products.data?.length > 0 ?
                <ProductGrid
                    handlePagination={handlePagination}
                    loading={(isLoading || isFetching)}
                    productsData={products?.data || []}
                    total={products?.total || 0}
                    limit={limit}
                    page={page}
                />
                :
                <div className={cx('nothing')}>
                    <Typography variant="h1">По вашему запросу ничего не найдено</Typography>
                    <Typography className={cx('query')}>{query}</Typography>
                    <Typography>Попробуйте сократить запрос или задать его по-другому.
                        Убедитесь, что название бренда и модели написано правильно.</Typography>
                </div>

            }
        </div>
    );
}

export default Search;
