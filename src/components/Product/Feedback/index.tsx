import { Button, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { clearProductFeedback } from '../../../store/productFeedback';
import { IProductReviews } from '../../../types/Reviews';
import QwPagination from '../../QwPagination';
import RateProgress from '../RateProgress';
import ReviewCard from '../ReviewCard';
import ReviewCreateConfirmDialog from '../ReviewCard/ReviewCreateConfirmDialog';
import ReviewFilter from '../ReviewFilter';
import styles from './feedback.module.scss'
import LargeFeedbackViewer from './LargeFeedbackViewer';
//import MediaViewer from "./MediaViewer";

const cx = classNames.bind(styles);

interface IFeedbackData {
    reviewsData: any;
    productId: string;
    pagination: any;
    pageCount: any;
    points?: number;
    page?: any;
    rates: number[],
    setRates?: (rates:number[]) => void;
    handleSort?: any;
    sort: any,
    reviewsMedia?: any,
    callback?: any,
}

function Feedback(props:IFeedbackData) {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleClickReviewAdd = (productId?:string) => {
        dispatch(clearProductFeedback())
      navigate(`/product/${productId}/reviews/form`);
    }

    /*const handleSort = ({sort, sortType}:IFeedbackSort) => {
        params.set('sort', sort)
        params.set('sortType', sortType)
        window.history.replaceState(null, '', location.pathname + "?" + params.toString());
        //history.push(window.location.pathname + "?" + params.toString());
    }*/

    const [cookies] = useCookies(['access_token']);
    const isAuthenticated = !!(cookies && cookies.access_token);

    const [reviewConfirmDialogOpen, setReviewConfirmDialogOpen] = useState<boolean>(false);

    function reviewConfirmDialogCloseHandler() {
        setReviewConfirmDialogOpen(false);
    }

    return (
        <div className={cx('wrapper')}>
            {props.points && props.points >= 0 ?
                <div className={cx('reviewContainer')}>
                    <span className={cx('reviewTitle')}>Отзывы</span>
                    <Button variant="contained" color="primary" onClick={isAuthenticated ? () => handleClickReviewAdd(props.productId) : () => setReviewConfirmDialogOpen(true)}>Оставить отзыв</Button>
                </div>
            :
                null
            }

            <LargeFeedbackViewer productId={props.productId} />

            <section className={cx('container')}>
                <div className={cx('feedback')}>
                    {props.pageCount !== 0 ?
                    <div className={cx('sort')}>
                        <span className={cx('item')}>Сортировать:</span>
                        <span className={cx('item', props.sort === 'created' ? 'active': 'inActive')} onClick={() => props.handleSort({sort: 'created'})}>по дате</span>
                        <span className={cx('item', props.sort === 'rate' ? 'active': 'inActive')} onClick={() => props.handleSort({sort: 'rate'})}>по оценке</span>
                        <span className={cx('item', props.sort === 'like_count' ? 'active': 'inActive')} onClick={() => props.handleSort({sort: 'like_count'})}>по полезности</span>
                    </div>:null}
                    <div className={cx('sectionContainer')}>
                        {props.reviewsData.data.map((data:IProductReviews) => <ReviewCard productId={props.productId} key={data.id} {...data} /> )}
                    </div>

                    {props.pageCount !== 0 ?
                        <QwPagination color="primary" count={props.pageCount} onChange={props.pagination} page={parseInt(props.page)} />
                        :
                        <div className={cx('feedbackEmpty')}>
                            <h3>Отзывов пока нет</h3>
                            <div className={cx('bigText')}>Напишите первым отзыв о магазине и его товарах</div>
                            <Button variant="contained" color="primary" onClick={isAuthenticated ? () => handleClickReviewAdd(props.productId) : () => setReviewConfirmDialogOpen(true)}>Оставить отзыв</Button>
                        </div>
                    }
                </div>
                {props.pageCount !== 0 ?
                <div className={cx('statistics')}>

                    <div className={cx('rightSide')}>
                        <Button variant="contained" color="primary" onClick={isAuthenticated ? () => handleClickReviewAdd(props.productId) : () => setReviewConfirmDialogOpen(true)}>Оставить отзыв</Button>
                        <Typography className={cx('rateTitle')}>
                            <span className={cx('big')}>95% </span>
                            покупателей купили бы товар снова
                        </Typography>
                    </div>

                    <ReviewFilter
                        productId={props.productId}
                        rates={props.rates}
                        setRates={props.setRates}
                    />
                    <RateProgress productId={props.productId} />
                </div>:null
                }
            </section>

            <ReviewCreateConfirmDialog
              //commentaryId={props.id}
              open={reviewConfirmDialogOpen}
              onClose={reviewConfirmDialogCloseHandler}
            />
        </div>
    );
}

export default Feedback;
