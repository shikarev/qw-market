import React from 'react'
import OrdersCard from '../../components/Profile/OrderCard'
import UserCard from '../../components/Profile/UserCard'
import styles from './profile.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

const Profile = () => {

    return (
        <div className={cx('wrapper')}>
            <h1>Мои данные</h1>
            <UserCard />
            {/* Мои заказы */}
            <h1>Мои заказы</h1>
            <OrdersCard />
        </div>
    )
}

export default Profile;