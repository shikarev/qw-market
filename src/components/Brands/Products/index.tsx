import React from 'react';
import {IManufacturer} from "../../../types/Manufacturer";
import { Grid, Typography } from '@mui/material';
import styles from './Products.module.scss';
import classNames from "classnames/bind";
import {ListResponse} from "../../../types";
import QwPagination from '../../QwPagination';
const cx = classNames.bind(styles);

interface IProducts{
    data: ListResponse<IManufacturer>;
    handleClick: (categoryId: string) => void;
    loading?: boolean;
    onChange: (n:number) => void;
    page: number;
}

export const Category = ({title, picture, onClick}:{title: string; picture?: string; onClick: () => void;}) => {
    return (
        <div onClick={onClick} className={cx('category')}>
            <div className={cx('image')}>
                <img src={picture} alt='title'/>
            </div>
            <div className={cx('title')}>
                <Typography variant="h4">{title}</Typography>
            </div>

        </div>
    )
}

function Products({data, page, onChange, handleClick}:IProducts) {

    return (
        <>
            <Grid container spacing={3}>
                {data.data.length > 0 ?
                    data.data.map((item) =>
                    <Grid key={item.id} item sm={4} md={3} xs={6} lg={3} xl={2}>
                            <Category onClick={() => handleClick(item.id)} title={item.name} picture={item.picturePath}/>
                    </Grid>
                ) :
                    <Typography>товаров нет</Typography>
                }
            </Grid>
            {data['page-count'] > 1 &&
            <div className={cx('paginator')}>
                <hr/>
                <QwPagination color="primary" count={data['page-count']} page={page} onChange={(e: React.ChangeEvent<unknown>, num: number) => onChange(num)}/>
            </div>
            }
        </>
    );
}

export default Products;