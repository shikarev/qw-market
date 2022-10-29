import React, {useEffect, useState} from 'react';
import Banner from "../../Promotion/Banner";
import GridBanner from "../../Promotion/GridBanner";
import {useGetActionsQuery} from "../../../api/promotion";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {promotions, setPromotions} from "../../../store/actions";
import classNames from "classnames/bind";
import styles from "./Promotions.module.scss";
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Promotions = () => {

    const dispatch = useAppDispatch();

    const {id} = useParams()


    const [page, setPage] = useState(1);
    const {data, isFetching} = useGetActionsQuery({page: page.toString(), vendorId: id, limit: "8"});
    const {data: dataBanner, isFetching: isFetchingBanner} = useGetActionsQuery({page: page.toString(), vendorId: id, limit: "5"});

    const actions = useAppSelector(promotions);

    useEffect(() => {
        if (data) {
            dispatch(setPromotions(data.data));
        }
    }, [data, dataBanner, dispatch])

    return (
        <Box className={cx('wrapper')} sx={{p: 3}}>
            {((data && dataBanner) && (data.data.length && dataBanner.data.length > 0)) ?
                <>
                    <Typography variant="h1" className={cx('title')}>Акции и другие выгодные предложения</Typography>
                    <Banner
                        data={dataBanner}
                        isFetching={isFetchingBanner}
                    />
                    <GridBanner
                        data={data}
                        isFetching={isFetching}
                        page={page}
                        setPage={setPage}
                        actions={actions}
                    />
                </> : <Typography variant="h2">Акций пока нет</Typography>}
        </Box>
    );
};

export default Promotions;
