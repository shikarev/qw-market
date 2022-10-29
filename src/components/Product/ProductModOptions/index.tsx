import React from "react";
import classNames from "classnames/bind";
import styles from "../ShortInfo/shortInfo.module.scss";
import {IProductModOptions} from "../../../types/Product";
import {handleUrlParam} from "../../../utils/utils";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getModOptions, setModOptionsFromUrl} from "../../../store/modOption";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const ProductModOptions = (props: IProductModOptions) => {

    const dispatch = useAppDispatch();

    function handleModPicker(optId: string, modId: string) {
        handleUrlParam(optId, modId)
        dispatch(setModOptionsFromUrl(window.location.search.slice(1)))
    }

    const mods = useAppSelector(getModOptions)

    //let ModStrValues = (props.modStr.split('|').map(x => x) || [0])

    /*useEffect(() => {
        dispatch(setModOptionsFromUrl(window.location.search.slice(1)))
        //handleModPicker(props.objModOptions[1], ModStrValues[0])
       // handleModPicker(props.objModOptions[0], ModStrValues[1])
    },[])*/

    return (
        <>
            {props.values && (props.type === 'color') &&
                <div className={cx('modOptions')}>
                    <div className={cx('modTitle')}>
                        <Typography className={cx('variant')}>{`${props.name}: `}</Typography>
                        {/*${data.option_values[selectedProductId] || `не указан` }*/}
                    </div>

                    <div className={cx('select_wrapper')}>
                        {props.values && props.values.map(data =>
                            <div className={cx('testPicker')} onClick={() => handleModPicker(props.id, data.id)}
                                 key={data.id}>
                            <span className={cx('customSelector', mods?.includes(data.id) ? 'isActive' : '')}
                                  style={{
                                      background: data.modification_option_media_path
                                          ? `url(${data.modification_option_media_path})`
                                          : `#${data.description}`,
                                      backgroundSize: 'cover',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center'
                                  }}/>
                            </div>
                        )}
                    </div>
                </div>
            }

            {props.values && (props.type === 'string') &&
                <div className={cx('modOptions')}>
                    <div className={cx('modTitle')}>
                        <Typography className={cx('variant')}>{`${props.name}: `}</Typography>
                        {/*${data.option_values[selectedProductId] || `не указан` }*/}
                    </div>

                    <div className={cx('select_wrapper')}>
                        {props.values && props.values.map(data =>
                            <div className={cx('testPicker')} onClick={() => handleModPicker(props.id, data.id)}
                                 key={data.id}>
                                {data.modification_option_media_path
                                    ? <span className={cx('customSelector', mods?.includes(data.id) ? 'isActive' : '')}
                                            style={{
                                                background: `url(${data.modification_option_media_path})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }}/>
                                    : <Typography className={cx('customSelectorString', mods?.includes(data.id) ? 'isActive' : '')}>{data.name}</Typography>
                                }
                            </div>
                        )}
                    </div>
                </div>
            }

            {props.values && (props.type === 'number') &&
                <div className={cx('modOptions')}>
                    <div className={cx('modTitle')}>
                        <Typography className={cx('variant')}>{`${props.name}: `}</Typography>
                        {/*${data.option_values[selectedProductId] || `не указан` }*/}
                    </div>

                    <div className={cx('select_wrapper')}>
                        {props.values && props.values.map(data =>
                            <div className={cx('testPicker')} onClick={() => handleModPicker(props.id, data.id)}
                                 key={data.id}>
                                <Typography className={cx('customSelectorString', mods?.includes(data.id) ? 'isActive' : '')}>{data.name}</Typography>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>

    )

}

export default ProductModOptions;