import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../api/categories';
import { useGetCategoryPathByCategoryIdQuery } from '../../api/product';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import Content from '../../components/SubCategory/Content';
import Filters from '../../components/SubCategory/Filters/Filters';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearFields, setFilterFromUrl } from '../../store/searchFilter';
import { handleUrlParam } from '../../utils/utils';
import styles from './sub.module.scss';

const cx = classNames.bind(styles)

const SubCategory = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  let params = new URLSearchParams(location.search);

  const { id: categoryId } = useParams();
  const manufacturerId = params.get('manufacturer') || undefined;
  const [ formatted, setFormatted ] = useState<string>('');
  const filter = useAppSelector((store) => store.searchFilter.fields);

  const { data: parentCategory } = useGetCategoryPathByCategoryIdQuery(categoryId || '', { skip: !categoryId })
  const { data: category } = useGetCategoryQuery({
    categoryId: categoryId,
    manufacturer: manufacturerId
  }, { skip: !categoryId && !manufacturerId })

  useEffect(() => {

        setFormatted(
          filter.reduce((acc, curr) => {
            let filter = `_id=${curr.id}${curr.value ? `,v=${curr.value}` : ''}${curr.value_id ? `,vi=${curr.value_id.join('.')}` : ''}${curr.from ? `,f=${curr.from}` : ''}${curr.to ? `,t=${curr.to}` : ''}${curr.operation ?
              `,o=${curr.operation}` : ''}`;
            return acc + filter
          }, ''))


  }, [ filter ])

  useEffect(() => {
    if (formatted) {
      handleUrlParam('filter', formatted);
    }
  }, [ formatted ])

  useEffect(() => {
    dispatch(clearFields());
    if (params.has('filter')) {
      const filters = params.get('filter');
      dispatch(setFilterFromUrl(filters));
    } else {
      handleUrlParam('filter', '');
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={cx('wrapper')}>
      <nav className={cx('navigation')}>

        <BreadCrumbs links={[ {
          name: 'Каталог',
          url: '/catalog'
        }, parentCategory?.sub_category ? {
          name: parentCategory.name,
          url: `/category/${parentCategory?.id}`
        } : { name: '', url: '' }, { name: category?.name || '', url: '' } ]} />

      </nav>

      <div className={cx('main')}>
        <Routes>

          <Route index element={
              <Content title={category?.name} />
          } />

          <Route path="filters" element={
            <Filters categoryId={categoryId}/>
          } />

        </Routes>
      </div>
    </div>
  )
}

export default SubCategory;
