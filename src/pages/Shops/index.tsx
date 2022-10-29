import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VendorPage from '../Vendor';
import { NoMatch } from '../NoMatch';
import FeedbackAdd from '../../components/Vendor/VendorFeedbacks/FeedbackAdd';
import VendorSuccessMessage from '../../components/Vendor/VendorFeedbacks/FeedbackAdd/VendorSuccessMessage';

const Shops = () => {

  return (
    <Routes>
      <Route path="/" element={<VendorPage />}>
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="vendor-review" element={<FeedbackAdd />} />
      <Route path="vendor-review/success" element={<VendorSuccessMessage />}/>
    </Routes>
  );
};

export default Shops;
