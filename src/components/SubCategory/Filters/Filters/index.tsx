import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearFields } from '../../../../store/searchFilter';
import HeadingWithCounter from '../../../common/Headers/HeadingWithCounter';
import ProductFilter from '../../ProductFilter';

const Filters = ({categoryId}:{categoryId: string}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [filters, setFilters] = useSearchParams('filter')
  const filter = useAppSelector((store) => store.searchFilter.fields)

  function clearFilters () {
    setFilters('')
    dispatch(clearFields())
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <HeadingWithCounter
        title='Все фильтры'
        count={filter?.length}
        countNames={[ 'фильтр', 'фильтра', 'фильтров' ]}
        startNames={[ 'Применен', 'Применено', 'Применены' ]}
      />
      <Box sx={{mb: '4rem'}}/>

      <ProductFilter categoryId={categoryId} short={false}/>

      <Box sx={{ml: 'auto', mt: 8, display: 'flex', flexDirection: 'row','& button': {width: {xs: '100%', sm: 'unset'}}, flexWrap: {xs: 'wrap', sm: 'nowrap'} }}>
        <Button variant='contained' sx={{flex: '1 1 auto',minHeight: '4rem'}} onClick={() => navigate('/subcategory/' + categoryId + `?${filters}`)}>
          Применить
        </Button>
        <Button variant='outlined' sx={{flex: '1 1 auto', ml: {xs: 'unset', sm: 4}, mt: {xs: 2, sm: 'unset'}}} onClick={() => clearFilters()}>
          Сбросить фильтры
        </Button>
      </Box>

    </Box>
  );
};

export default Filters;
