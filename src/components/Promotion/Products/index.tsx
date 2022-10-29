import React from 'react';
import { useGetPromotionProductsQuery } from '../../../api/promotion';
import ProductGrid from '../../common/ProductGrid';

interface ProductsProps {
  id: string
}

const Products = ({ id }:ProductsProps) => {
  const [page, setPage] = React.useState(1);
  const {data, isLoading} = useGetPromotionProductsQuery(id);

  const handleChange = (value: number) => {
    setPage(value);
  };

  return (
    <ProductGrid handlePagination={handleChange} productsData={data} loading={isLoading} total={data?.length}/>
  );
};

export default Products;
