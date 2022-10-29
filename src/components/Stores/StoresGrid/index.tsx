import classNames from "classnames/bind";
import styles from "./storesGrid.module.scss";
import React from "react";
import { Grid, Typography } from '@mui/material';
import StoresPreview from "../StorePreview";
import Divider from "@mui/material/Divider";
import QwPagination from '../../QwPagination';

const cx = classNames.bind(styles);

const StoresGrid = ({stores, error, isLoading, pagination, page}:any) => {

    if(error) {
        return (
            <Grid container spacing={2} className={cx('storesGrid')}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <Typography>Ошибка</Typography>
                </Grid>
            </Grid>
        )
    }

    if(isLoading) {
        return (
            <Grid container spacing={2} className={cx('storesGrid')}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                    <Typography>Загрузка...</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={2} className={cx('storesGrid')}>
                {stores && stores.data.map((store:any) =>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={3} key={store.id}>
                            <StoresPreview
                                companyLogo={store.picture_path}
                                companyName={store.name}
                                companyProduct='https://www.gstatic.com/webp/gallery3/2_webp_a.webp'
                                companySub={store.description}
                                id={store.id}
                                rating={store.rating}
                            />
                    </Grid>
                )}
            </Grid>

            {stores && stores.total > 12 ?
                <>
                    <Divider variant="fullWidth" style={{marginBottom: '2.4rem'}} />
                    <QwPagination color="primary" count={Math.ceil(stores.total / 24)} onChange={pagination} page={parseInt(page)} />
                </>
            :null}
        </>
    )}

export default StoresGrid;
