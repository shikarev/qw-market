import React, {useEffect, useState} from "react";
import Promotion from '../Promotion';
import styles from './Promotions.module.scss';
import classNames from "classnames/bind";
import {Route, Routes, useLocation} from "react-router-dom";
import {useGetActionsQuery} from "../../api/promotion";
import Selector from "../../components/Catalog/Selector";
import {useGetRootCategoriesQuery} from "../../api/categories";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {clearPromotions, promotions, setPromotions} from "../../store/actions";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import Banner from "../../components/Promotion/Banner";
import GridBanner from "../../components/Promotion/GridBanner";
import {handleUrlParam} from "../../utils/utils";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const Promotions = () => {
    const [page, setPage] = useState(1);
    const location = useLocation();
    const dispatch = useAppDispatch();
    let params = new URLSearchParams(location.search);
    const id = params.get("id")

    const categoryId = params.get("category_id") || undefined;

    const [category, setCategory] = useState(categoryId)


    const {data, isFetching} = useGetActionsQuery({page: page.toString(), categoryId: category, limit: "8"});
    const {data: dataBanner, isFetching: isFetchingBanner} = useGetActionsQuery({page: page.toString(), categoryId: category, limit: "5"});
    const {data: categoriesData, isFetching: categoriesLoading} = useGetRootCategoriesQuery();
    const actions = useAppSelector(promotions);

    useEffect(() => {
      //clear on unmount
      return () => {
        dispatch(clearPromotions())
      }
    },[])

    useEffect(() => {
        if (data) {
            dispatch(setPromotions(data.data));
        }
    }, [data, dispatch])

    function setSection(id: string) {
        setPage(1);
        if (categoryId && categoryId === id) {
            params.delete('category_id');
        } else {
            //params.set('category_id', id);
            setCategory(id)
            handleUrlParam('category_id', id)
        }
        //history.push(window.location.pathname + "?" + params.toString());
        dispatch(clearPromotions());
    }

    return (
      <Routes>
        <Route index element={
          <div className={cx('root')}>
            {id ?
              <Typography>Акция</Typography>
              :
              <>
                <BreadCrumbs/>
                <div className={cx('selector')}>
                  <Selector
                    loading={categoriesLoading}
                    data={categoriesData}
                    onChange={setSection}
                    selectOnLoad={false}
                    selectedCategory={categoryId}
                    title="Акции и другие выгодные предложения"
                  />
                </div>
                <Banner
                  data={dataBanner}
                  isFetching={isFetchingBanner}
                />

                <GridBanner
                  data={data}
                  isFetching={false}
                  page={page}
                  setPage={setPage}
                  actions={actions}
                />
              </>
            }
          </div>
        }/>

        <Route path=':id' element={<Promotion/>}/>

      </Routes>

    );
}

export default Promotions;
