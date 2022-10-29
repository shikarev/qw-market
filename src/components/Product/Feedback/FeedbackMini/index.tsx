import { Button, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { clearProductFeedback } from '../../../../store/productFeedback';
import { IProductReviews } from '../../../../types/Reviews';
import { toTrueWordForm } from '../../../../utils/toTrueWordForm';
import RateProgress from '../../RateProgress';
import ReviewCard from '../../ReviewCard';
import ReviewCreateConfirmDialog from '../../ReviewCard/ReviewCreateConfirmDialog';
import ReviewFilter from '../../ReviewFilter';
import styles from '../feedback.module.scss';
import LargeFeedbackViewer from '../LargeFeedbackViewer';

const cx = classNames.bind(styles);


interface IFeedbackMiniData {
    reviewsData: any;
    productId: string;
    total?: number;
    rates: number[],
    setRates?: (rates:number[]) => void;
}

const FeedbackMini = (props:IFeedbackMiniData) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickReviewAdd = (productId?:string) => {
        dispatch(clearProductFeedback())
      navigate(`/product/${productId}/reviews/form`);
    }

    const handleClickReviews = (productId:any) => {
      navigate(`/product/${productId}/reviews`);
    }

    const [cookies] = useCookies(['access_token']);
    const isAuthenticated = !!(cookies && cookies.access_token);

    const [reviewConfirmDialogOpen, setReviewConfirmDialogOpen] = useState<boolean>(false);

    function reviewConfirmDialogCloseHandler() {
        setReviewConfirmDialogOpen(false);
    }

    return (
        <div className={cx('wrapper')}>
            {props.total && props.total >= 0 ?
                <div className={cx('reviewContainer')}>
                    <Typography className={cx('reviewTitle')}>Отзывы</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{padding: '1.2rem 1.6rem', fontSize: '1.6rem'}}
                      onClick={isAuthenticated ? () => handleClickReviewAdd(props.productId) : () => setReviewConfirmDialogOpen(true)}
                    >
                        Оставить отзыв
                    </Button>
                </div>
            :
                <div className={cx('reviewContainer')}>
                    <Typography className={cx('reviewTitle')}>Отзывы</Typography>
                </div>
            }

            <LargeFeedbackViewer productId={props.productId} />

            <section className={cx('container')}>
                <div className={cx('feedback')}>
                    <div className={cx('sectionContainer')}>
                        {props.reviewsData.data.map((data:IProductReviews) => <ReviewCard productId={props.productId} key={data.id} {...data} /> ).slice(0,5)}
                    </div>

                    {props.total && props.total !== 0 ?
                        <div className={cx('toReviewsBtn')}>
                            <Button variant="outlined" color="primary" onClick={() => handleClickReviews(props.productId)} sx={{border: '2px solid #eb4f5a', width: '100%', '&:hover':{backgroundColor: '#eb4f5a', color: 'white'}}}>
                                Открыть {toTrueWordForm(props.total || 0, ['отзыв', 'отзыва', 'отзывов'])}
                            </Button>
                        </div>
                        :
                        <div className={cx('feedbackEmpty')}>
                            <h3>Отзывов пока нет</h3>
                            <div className={cx('bigText')}>Напишите первым отзыв о магазине и его товарах</div>
                            <Button variant="contained" color="primary" onClick={isAuthenticated ? () => handleClickReviewAdd(props.productId) : () => setReviewConfirmDialogOpen(true)}>Оставить отзыв</Button>
                        </div>}
                </div>

                {props.total && props.total >= 0 ?
                <div className={cx('statistics')}>
                    <Typography className={cx('rateTitleMini')}>
                        <span className={cx('big')}>95% </span>
                        покупателей купили бы товар снова
                    </Typography>

                    <ReviewFilter
                        productId={props.productId}
                        rates={props.rates}
                        setRates={props.setRates}
                    />
                    <RateProgress productId={props.productId} />
                </div>
                :null}
            </section>

            <ReviewCreateConfirmDialog
              open={reviewConfirmDialogOpen}
              onClose={reviewConfirmDialogCloseHandler}
            />
        </div>
    )


}

export default FeedbackMini
