import { Box, Button, Grid, styled, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { ReactChild, useState } from 'react';
import { useGetOptionsQuery } from '../../../api/search';
import { useAppSelector } from '../../../store/hooks';
import { FilterDesign, IOption, ISearchFilterField } from '../../../types/Filters';
import { AccordionContainer } from '../AccordionContainer';
import { CheckboxGroup, ColorSelect, LabelSwitch, RadioGroupFilter, RadioRatingFilter, Range } from '../Filters';
import CheckboxSingle from '../Filters/CheckboxSingle';
import DropDown from '../Filters/DropDown';
import styles from './productFilter.module.scss';

const cx = classNames.bind(styles);

const filters: {
  [ filter: string ]: (data: IOption, filters: ISearchFilterField[]) => JSX.Element
} = {
  [ FilterDesign.RANGE ]: (data, currentFilters) =>
    <Range selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.CHECKBOX_SINGLE ]: (data, currentFilters) =>
    <CheckboxSingle selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.SWITCH_SINGLE ]: (data, currentFilters) =>
    <LabelSwitch selected={currentFilters} data={(data && data.optionValues) ? data.optionValues[ 0 ] : undefined}
                 optionId={data.id} />,
  [ FilterDesign.CHECKBOX_GROUP ]: (data, currentFilters) =>
    <CheckboxGroup selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.CHECKBOX_GROUP_SEARCH ]: (data, currentFilters) =>
    <CheckboxGroup selected={currentFilters} data={data.optionValues} optionId={data.id} search />,
  [ FilterDesign.RADIO_GROUP ]: (data, currentFilters) =>
    <RadioGroupFilter selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.RADIO_GROUP_RATING ]: (data, currentFilters) =>
    <RadioRatingFilter selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.DROP_DOWN ]: (data, currentFilters) =>
    <DropDown selected={currentFilters} data={data.optionValues} optionId={data.id} />,
  [ FilterDesign.COLOR_PICKER ]: (data, currentFilters) =>
    <ColorSelect selected={currentFilters} data={data.optionValues} optionId={data.id} />,
};

const FilterButton = styled(Button)(() => ({
  root: {
    boxShadow: 'none',
    padding: '1rem'
  },
  label: {
    display: 'flex',
  }
}))

const ProductFilter = ({
                         categoryId,
                         children,
                         short = true
                       }: { categoryId: string, children?: ReactChild, short?: boolean }) => {

  const currentFilters = useAppSelector((store) => store.searchFilter.fields);
  const [ hideFilters, setFiltersHidden ] = useState(true);

  const { data: optionsData, isLoading: filtersLoading } = useGetOptionsQuery({
    categoryId: categoryId
  }, { skip: !categoryId })

  const total = optionsData?.options?.length
  const threeColumns = short
    ? undefined
    : optionsData?.options?.reduce((prev, current, index) => {
      let newPrev = [...prev]
      newPrev[index % 3].push(current)
      return newPrev
  }, [[],[],[]])


  function getFilter(data: IOption, type: FilterDesign) {
    return (type in filters) ? filters[ type ](data, currentFilters) : null;
  }

  function handleDrawerToggle() {
    setFiltersHidden(!hideFilters);
    if (!hideFilters) {
      document.body.classList.remove('disable-scroll');
    } else {
      document.body.classList.add('disable-scroll');
    }
  }

  return (
    <Box sx={{ minWidth: '28rem', mr: short ? '3rem' : 'unset', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: '2.4rem' }}>
        <Typography className={cx('title')}>Фильтр</Typography>
      </Box>

      {short
        ? optionsData?.options?.slice(0, 4).map((option: IOption) =>
          (option.designType && FilterDesign[ option.designType ])
            ? <AccordionContainer key={option.id} title={option.name} disableAccordion={true}>
              {getFilter(option, option.designType)}
            </AccordionContainer>
            : null
        )
        : <Grid container columnSpacing={6} rowSpacing={0} alignItems="flex-start">
          {threeColumns?.map((column, index) => <Grid key={index} item container spacing={0} xs={12} md={4}>
          {column.map((option: IOption) => (option.designType && FilterDesign[ option.designType ])
            ? <Grid key={option.id} item xs={12} >
              <AccordionContainer title={option.name} disableAccordion={false}
                                  collapsed={currentFilters.findIndex(filter => filter.id === option.id) < 0}>
                {getFilter(option, option.designType)}
              </AccordionContainer>
            </Grid>
            : null
          )}
        </Grid>)}
        </Grid>
      }
      {total &&
        children}
    </Box>
    // <div className={cx('container')}>
    //   {filtersLoading ?
    //     <Typography>Фильтры загружаются</Typography> :
    //     optionsData &&
    //     <>
    //       {isMobile &&
    //       <FilterButton className={cx('open')} onClick={() => handleDrawerToggle()}
    //                     endIcon={<SettingsIcon />}>Фильтр</FilterButton>
    //       }
    //
    //       <div className={cx('filters', hideFilters ? 'filters_hidden' : '')}>
    //         {/*<Button className={cx('close')} onClick={() => handleDrawerToggle()}>X</Button>*/}
    //
    //
    //         <div className={cx('wrapper')}>
    //           <div className={cx('head')}>
    //             <Typography className={cx('title')}>Фильтр</Typography>
    //             <div className={cx('count')}>
    //               <Typography className={cx('selected')}>Выбрано: {currentFilters?.length ?? 0}</Typography>
    //               {currentFilters?.length > 0 &&
    //               <Typography className={cx('clear')} onClick={() => handleClear()}> сбросить </Typography>}
    //             </div>
    //           </div>
    //
    //           {optionsData?.options?.map((option: IOption) => (option.designType && FilterDesign[ option.designType ]) ?
    //             <AccordionContainer key={option.id} title={option.name} disableAccordion={true}>
    //               {getFilter(option, option.designType)}
    //             </AccordionContainer>
    //             :
    //             null
    //           )}
    //         </div>
    //
    //       </div>
    //     </>
    //   }
    // </div>
  )
}

export default ProductFilter;
