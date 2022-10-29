import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetRootCategoriesQuery } from '../../api/categories';
import Selector from '../../components/Catalog/Selector';
import Header from '../../components/Header';
import Collection from '../../components/Header/Collection'
import Promotions from '../../components/Home/Promotions';
import RecentlyViewed from '../../components/Home/RecentlyViewed';
import Reviews from '../../components/Home/Reviews';
import Stories from '../../components/Stories';
import styles from './home.module.scss'

const cx = classNames.bind(styles);

const Home = () => {
    const navigate = useNavigate();

    const { search } = useLocation();
    const {data: categoriesData} = useGetRootCategoriesQuery();
    let resentRef = useRef<HTMLDivElement | null>(null)

    function handleCategoryClick(id: string) {
      navigate(`/category/${id}`)
    }

    useEffect(() => {
      let params = new URLSearchParams(search)

      if(params.get('recentlyviewed')){
        setTimeout(() => {
          resentRef?.current?.scrollIntoView(true);
        }, 500)
      }
    }, [])

    return (
        <>
            <Header/>

            <div className={cx('last-view_desktop')}>
                <div className={cx('collections')}>
                    <Collection/>
                </div>
            </div>

            <div className={cx('block')}>
                <Promotions/>
            </div>

            <div className={cx('block')} ref={resentRef}>
                <RecentlyViewed />
            </div>

            <div className={cx('block')}>
                <Stories />
            </div>

            <div className={cx('block')}>
                <Selector selectOnLoad={false} title='Категории товаров' data={categoriesData}
                          onChange={handleCategoryClick}/>
            </div>

            <div className={cx('block')}>
                <Reviews/>
            </div>

        </>
    );
}

export default Home;

