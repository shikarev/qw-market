import classNames from 'classnames/bind';
import React from 'react';
import { useGetProductsQuery } from '../../../api/product';
import styles from './productList.module.scss';
import ProductGrid from '../../common/ProductGrid';

const cx = classNames.bind(styles)

function ProductList({id}:any) {
    const [page, setPage] = React.useState(1);
    const {data: products, isLoading, isFetching} = useGetProductsQuery({catId: id, page: page}, {skip: !id})
   
    const handleChange = (value: number) => {
        setPage(value);
      };

    return (
        <div className={cx('wrapper')}>
            <ProductGrid loading={(isLoading || isFetching)} productsData={products?.data} total={products?.total} handlePagination={handleChange}/>
        </div>
    );
}

export default ProductList;