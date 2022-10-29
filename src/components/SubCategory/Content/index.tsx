import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTotalProductsCount } from '../../../store/categories';
import { useAppSelector } from '../../../store/hooks';
import ProductListWithSorting from '../../Category/ProductListWithSorting';
import HeadingWithCounter from '../../common/Headers/HeadingWithCounter';
import ProductFilter from '../ProductFilter';

const Content = ({ title }: { title: string }) => {
  let params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const manufacturerId = params.get('manufacturer') || undefined;

  const filter = useAppSelector((store) => store.searchFilter.fields);
  const totalProductsCount = useAppSelector(getTotalProductsCount);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <HeadingWithCounter title={title} count={totalProductsCount} countNames={[ 'товар', 'товара', 'товаров' ]} />

      <Box sx={{ display: 'flex', flexDirection: 'row', mt: '4rem' }}>
        <ProductFilter categoryId={categoryId}>
          <Button variant="outlined" sx={{
            color: 'text.primary',
            borderWidth: '2px',
            borderColor: 'primary.main',
            fontSize: '1.7rem',
            fontWeight: 700,
            '&:hover': {
              borderWidth: '2px',
            }
          }} onClick={() => navigate('/subcategory/' + categoryId + '/filters' + `?${params}`)}>Все фильтры</Button>
        </ProductFilter>
        <ProductListWithSorting filters={filter} categoryId={categoryId} manufacturerId={manufacturerId} />
      </Box>
    </Box>
  );
};

export default Content;
