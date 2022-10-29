import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VendorFeedbacks.module.scss';
import { Box, Button } from '@mui/material';
import QwPagination from '../../QwPagination';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { handleUrlParam } from '../../../utils/utils';
import { useGetVendorReviewsByVendorIdQuery } from '../../../api/productReviews';
import { clearProductFeedback } from '../../../store/productFeedback';
import { useAppDispatch } from '../../../store/hooks';
import VendorReviewCard from './VendorReviewCard';

const cx = classNames.bind(styles);

const VendorFeedbacks = () => {

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const page = params.get("page") || '1';

  const [pagination, setPagination] = useState(page)

  function setPage (newPage: number){
    handleUrlParam('page', newPage.toString());
    setPagination(newPage.toString());
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPagination(value.toString());
  };

  useEffect(() => {
    setPagination(pagination);
  }, [pagination]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {id} = useParams()

  const handleClickFeedbackAdd = () => {
    dispatch(clearProductFeedback())
    navigate(`/stores/${id}/vendor-review`);
  }

  const {data: vendorReviews, isLoading} = useGetVendorReviewsByVendorIdQuery({
    vendorId: id,
    page: 1
  }, {skip: !id});

  return (
    <Box className={cx('wrapper')} sx={{p: 3}}>

      <section className={cx('container')}>
        {!isLoading &&
        <div className={cx('questions')}>
          <div className={cx('create-question')}>

            {vendorReviews && vendorReviews.pageCount !== 0 ?
              <div className={cx('questionsContainer')}>
                <span className={cx('questionsTitle')}>Отзывы</span>
                <Button variant="contained" color="primary" onClick={() => handleClickFeedbackAdd()}>Оставить отзыв</Button>
              </div>
              :
              <div className={cx('questionsEmpty')}>
                <h3>Отзывов пока нет</h3>
                <div className={cx('bigText')}>Задайте его первым</div>
                <Button variant="contained" color="primary" onClick={() => handleClickFeedbackAdd()}>Оставить отзыв</Button>
              </div>
            }
          </div>
          <div className={cx('sectionContainer')}>
            {vendorReviews && vendorReviews.data.map((data: any, index: number) =>
              <VendorReviewCard {...data} key={index}/>
            )}
          </div>

          {(vendorReviews && vendorReviews.pageCount !== 0 && vendorReviews.pageCount && vendorReviews.pageCount > 1) &&
            <div>
              <QwPagination color="primary" count={vendorReviews?.pageCount} onChange={handleChange} page={parseInt(pagination)} />
            </div>
          }

        </div>
        }
      </section>
    </Box>
  );
};

export default VendorFeedbacks;
