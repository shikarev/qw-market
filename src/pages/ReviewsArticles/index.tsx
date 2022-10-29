import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Review from '../../components/ReviewsArticles/Review';
import ReviewsArticlesPage from '../../components/ReviewsArticles/ReviewsArticlesPage';

const ReviewsArticles = () => {
  return (
    <Routes>
      <Route index element={ <ReviewsArticlesPage /> } />
      <Route path={':id'} element={ <Review /> } />
    </Routes>
  );
};

export default ReviewsArticles;
