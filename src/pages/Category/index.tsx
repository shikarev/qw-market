import classNames from 'classnames/bind';
import { useMatch, useNavigate } from 'react-router-dom';
import { useGetCategoryQuery } from '../../api/categories';
import styles from './category.module.scss';
import Sections from '../../components/Catalog/Sections';
import { useGetCategoryPathByCategoryIdQuery } from '../../api/product';
import { toTrueWordForm } from '../../utils/toTrueWordForm';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import React from 'react';
import ProductListWithSorting from '../../components/Category/ProductListWithSorting';
import { useAppSelector } from '../../store/hooks';
import { getTotalProductsCount } from '../../store/categories';
import { Typography } from '@mui/material';

const cx = classNames.bind(styles)

const Category = () => {
  const match = useMatch('/category/:id')
  const navigate = useNavigate();
  const totalProductsCount = useAppSelector(getTotalProductsCount);
  const {
    data: category,
    isLoading,
    error
  } = useGetCategoryQuery({ categoryId: match?.params.id }, { skip: !match?.params.id })
  const { data: parentCategory } = useGetCategoryPathByCategoryIdQuery(match?.params.id || '', { skip: !match?.params.id })

  let links = [ { name: 'Каталог', url: '/catalog' }, { name: category?.name || '', url: '' } ];
  if (parentCategory?.sub_category) {
    links = [ { name: 'Каталог', url: '/catalog' }, {
      name: parentCategory?.name || '',
      url: `/category/${parentCategory?.id}`
    }, { name: category?.name || '', url: '' } ]
  }

  function onSubCatSelect(id: string) {
    navigate(`/subcategory/${id}`)
  }

  function onCatSelect(id: string) {
    if (category?.sub_categories) {
      const cat = category.sub_categories.find((item: any) => item.id === id)
      if (cat) {
        if (cat.sub_categories) {
          navigate(`/category/${cat.id}`)
        } else {
          navigate(`/subcategory/${cat.id}`)
        }
      }
    }
  }

  return (
    <div className={cx('wrapper')}>
      <BreadCrumbs links={links} />
      {isLoading ?
        <Typography>Загрузка</Typography>
        : error ?
          <Typography>ошибка</Typography>
          :
          (category && category.sub_categories) ?
            <>
              <Typography variant="h1">{category.name}</Typography>
              <Typography
                className={cx('count')}>{toTrueWordForm(totalProductsCount, [ 'товар', 'товара', 'товаров' ])}</Typography>
              <div className={cx('content')}>
                <div className={cx('sections')}>
                  <Sections small sectionId={category.id} onCategorySelect={onCatSelect}
                            onSubCategorySelect={onSubCatSelect} />
                </div>
                <ProductListWithSorting categoryId={match?.params.id} />
              </div>
            </>
            :
            <Typography>404</Typography>
      }
    </div>
  );
}

export default Category;
