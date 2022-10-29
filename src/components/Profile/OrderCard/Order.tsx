import React from 'react'
import styles from './Order.module.scss'
import Product from './Product'
import Button from '@mui/material/Button'
import classNames from 'classnames'
import { ReactComponent as Time } from '../../../assets/Icons/time.svg?svgr'
import { ReactComponent as Check } from '../../../assets/Icons/check.svg?svgr'
import { ReactComponent as Logo } from '../../../assets/Icons/logo.svg?svgr'
import { numberWithSpaces } from '../../../utils/numberWithSpaces'
import moment from 'moment'
import { IOrder, IShortProduct, orderStatus } from '.'
import { Typography } from '@mui/material';

interface IOrderFunc {
    data: IOrder
}

function Order({data}:IOrderFunc) {
    const finalPrice = (costs: IShortProduct[]) => {
        let prices = costs.map(product => product.cost)
        return prices.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        })
    }

    function repeatOrder() {
        alert('repeat order!')
    }

    function discardOrder() {
        alert('discard order!')
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <span>{`Заказ №${data.num}`}</span>
                <div className={styles.status}>
                    {data.status === orderStatus.finished ? 
                    <Check className={styles.icon} />
                    :
                    <Time className={styles.icon} />
                    }
                    <span className={`${data.status === orderStatus.finished ? styles.finished : styles.description}`}>{data.status}</span>
                </div>

            </header>
            <hr />
            <div className={styles.container}>
                <div className={styles.products}>
                    {data.products.map((item:IShortProduct) => <Product key={item.id} {...item}/>)}
                </div>
                <div className={styles.details}>
                    <Typography className={classNames(styles.bold)}>Дата оформления:</Typography>
                    <Typography className={classNames(styles.label)}>{moment(data.date.created).format('DD MMMM YYYY')}</Typography>
                    <Typography className={classNames(styles.line, styles.description)}>{data.passportNeeded ? 'При получении вам понадобится паспорт' : ' '}</Typography>
                    <Typography className={classNames(styles.bold, styles.line)}>Способ оплаты</Typography>
                    <Typography className={styles.description}>{data.paymentMethod}</Typography>
                    <Typography className={styles.label}>{`${numberWithSpaces(finalPrice(data.products))} ₽`}</Typography>
                    <Typography className={classNames(styles.bold, styles.line)}>Способ получения</Typography>
                    <Typography className={styles.description}>Адрес доставки:</Typography>
                    <Typography className={styles.label}>{data.delivery.address}</Typography>
                    <Typography className={styles.description}>Время доставки:</Typography>
                    <Typography className={styles.label}><span>{moment(data.date.deliveryStart).format('DD MMMM ')}</span>с {moment(data.date.deliveryStart).format('HH:mm')} до {moment(data.date.deliveryEnd).format('HH:mm')}</Typography>
                    <Typography className={styles.description}>Получатель:</Typography>
                    <div>
                        <Typography>{data.recipient.fullName}</Typography>
                        <Typography>{`+${data.recipient.phone}`}</Typography>
                        <Typography className={styles.label}>{data.recipient.email}</Typography>
                    </div>
                    <Typography className={styles.description}>Стоимость доставки:</Typography>
                    <Typography className={styles.label}>{data.delivery.cost === 0 ? 'бесплатно' : data.delivery.cost }</Typography>
                    <Typography className={classNames(styles.bold, styles.line)}>Кэшбек</Typography>
                    <Typography className={styles.description}>начислено:</Typography>
                    <Typography className={classNames(styles.label, styles.bonuses)}><Logo className={styles.icon} style={{ marginRight: '.5rem' }} />{data.bonuses ? numberWithSpaces(data.bonuses) : '0'}</Typography>
                    <div className={styles.line}>
                        <Button onClick={() => repeatOrder()} variant="contained" color="primary">Повторить заказ</Button>
                        <Button onClick={() => discardOrder()} style={{marginLeft: '1rem'}} variant="outlined" size="small" >Вернуть товар</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;