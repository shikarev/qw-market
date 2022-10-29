import classNames from 'classnames/bind';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGetCartDetailsQuery } from '../../api/cart';
import { QCircularProgress } from '../../components/common/Progress';
import OrderComplete from '../../components/Order/Complete';
import OrderCreate from '../../components/Order/Create';
import OrderVerify from '../../components/Order/Verify';
import { useAppSelector } from '../../store/hooks';
import { getOrderStatus } from '../../store/order';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export enum Status {
    'create',
    'verify',
    'complete'
}

interface IOrderState {
    [status: number]: JSX.Element
}

function OrderPage() {
    const orderStatus = useAppSelector(getOrderStatus);
    const {data: cartData} = useGetCartDetailsQuery();
    const orderState: IOrderState = {
        [Status.create]: <OrderCreate/>,
        [Status.verify]: <OrderVerify/>,
        [Status.complete]: <OrderComplete/>
    }

    return (
        <div className={cx('root')}>
            {!cartData
                ?
                <div className={cx('loading')}>
                    <QCircularProgress/>
                </div>
                :
                (cartData && cartData.length === 0) ?
                    orderStatus !== 2 ?
                    <Navigate to='/orders'/>
                    :
                    orderState[orderStatus]
                    :
                    orderState[orderStatus]
            }
        </div>
    );
}

export default OrderPage;
