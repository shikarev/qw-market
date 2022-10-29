import React from 'react'
import styles from './styles.module.scss'
import { IPayCard } from '../../../types/Profile'
import logo from '../../svgComponents/Logo'
import { Home, Cash } from '../../svgComponents/Icons/outlined'
import { Typography } from '@mui/material';

const testValues = {
    userName: 'Konstantina Konstantinovna',
    userPhoto: 'https://picsum.photos/id/656/100',
    email: 'ivanivanov@qwangy.com',
    phone: '+9 (999) 999 99 99',
    payCards: [
        {cardName: 'Mastercard (2345)', cardExpires: '01/22', cardHolder: 'IVAN IVANOV'},
        {cardName: 'VISA (6789)', cardExpires: '02/22', cardHolder: 'Tatyana Sidorova'},
    ],
    addresses: [
        {address: 'Россия, Москва, ул. Иванова 1 кв.1', details: 'Подъезд 3, этаж 4' }
    ]
}

const PayCard = ({cardName, cardExpires, cardHolder}:IPayCard) => {
    return (
        <div className={styles.card}>
            <img src="https://picsum.photos/id/341/300" alt='bank_logo'/>
            <div>
                <Typography className={styles.cardname}>{cardName}</Typography>
                <Typography className={styles.details}>{`Истекает: ${cardExpires}`}</Typography>
                <Typography className={styles.details}>{cardHolder}</Typography>
            </div>
        </div>
    )
}

function UserCard() {
    return (
<div className={styles.wrapper}>
                {/* Profile */}
                <div className={`${styles.bordered} ${styles.user}`}>
                    <div className={styles.cardheader}>
                        <img className={styles.photo} src={testValues.userPhoto} alt={testValues.userName} />
                        <Typography className={styles.edit}>Изменить</Typography>
                    </div>

                    <h3>{testValues.userName}</h3>
                    <Typography className={styles.details}>{testValues.email}</Typography>
                    <Typography className={styles.details}>{testValues.phone}</Typography>

                </div>

                {/* Adresses */}
                <div className={styles.bordered}>
                    <div className={styles.cardheader}>
                        <Typography className={styles.title}>Адреса</Typography>
                        <Typography className={styles.edit}>Изменить</Typography>
                    </div>
                    <div className={styles.addresses}>
                        <div className={styles.addressbox}>
                            {/*<img src={Home} style={{ flex: '0 0 auto', marginRight: '0.5em' }} alt='address'/>*/}
                            <Home/>
                            <div>
                                <Typography className={styles.address}>{testValues.addresses[0].address}</Typography>
                                <Typography className={styles.details}>{testValues.addresses[0].details}</Typography>
                            </div>
                        </div>
                        <div className={styles.addressbox}>
                            <Home/>
                            {/*<img src={Home} style={{ flex: '0 0 auto', marginRight: '0.5em' }} alt='address' />*/}
                            <div>
                                <Typography className={styles.address}>{testValues.addresses[0].address}</Typography>
                                <Typography className={styles.details}>{testValues.addresses[0].details}</Typography>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className={styles.bordered}>
                    <div className={styles.cardheader}>
                        <Typography className={styles.title}>Карты</Typography>
                        <Typography className={styles.edit}>Изменить</Typography>
                    </div>
                    <div className={styles.cards}>
                        <PayCard {...testValues.payCards[0]}/>
                        <PayCard {...testValues.payCards[1]} />                        
                    </div>
                </div>

                {/* Others */}
                <div className={styles.discount}>
                    <div style={{ marginBottom: '0.5rem' }} className={styles.bordered}>
                        <Typography className={styles.title} style={{marginBottom: '12px'}}>Баллы</Typography>
                        <div className={styles.discountnum}>
                            <img src={logo} alt='qwangy'/>
                            <Typography>2 987</Typography>
                        </div>
                    </div>
                    <div className={styles.bordered}>
                        <Typography className={styles.title} style={{marginBottom: '12px'}}>Скидка</Typography>
                        <div className={styles.discountnum}>
                            <Cash/>
                            <Typography>10 %</Typography>
                        </div>
                        <Typography className={styles.details}>Сумма выкупа: 99 783 ₽</Typography>
                    </div>
                </div>
            </div>
    );
}

export default UserCard