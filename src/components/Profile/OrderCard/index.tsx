import styles from './styles.module.scss'
import React from 'react'
import Order from './Order'

export enum orderStatus {
    finished = 'Доставлен',
    waiting = 'Ожидает доставки'
}

export enum paymentMethods {
    googlePay = 'Google Pay',
    applePay = 'Apple Pay',
    cash = 'Наличными'
}

export interface IShortProduct {
    id: number,
    name: string,
    cost: number,
    oldCost?: number,
    mediaUrl?: string,
}

export interface IOrder {
    num: number,
    products: IShortProduct[],
    status: orderStatus,
    date: {
        created: string,
        deliveryStart: string,
        deliveryEnd: string,
    },
    passportNeeded: boolean,
    paymentMethod: paymentMethods,
    delivery: {
        address: string,
        cost: number
    },
    recipient: {
        fullName: string,
        phone: string,
        email: string
    },
    bonuses?: number
}

function OrdersCard() {
    // FETCH ORDERS THAN MAP TO <Order>

    const testValues: IOrder[] = [
            {   num: 1234456789,
                products: [
                    {id: 0, name: 'Смартфон Apple iPhone 12', cost: 98999.0, oldCost: 102400.0, mediaUrl: 'https://picsum.photos/id/657/100'},
                    {id: 1, name: 'Умные часы Apple Watch', cost: 38999.0, oldCost: undefined,  mediaUrl: 'https://picsum.photos/id/658/100'},
                ],
                status: orderStatus.waiting,
                date: {
                    created: '2021-07-03T12:24:26Z',
                    deliveryStart: '2021-07-10T11:00:00Z',
                    deliveryEnd: '2021-07-10T12:30:06Z',
                },
                passportNeeded: true,
                paymentMethod: paymentMethods.applePay,
                delivery: {
                    address: 'Россия, Москва, улица Профсоюзная, д.1, кв.1, 1 подъезд, 1 этаж, домофон 11 ключ 1111',
                    cost: 0
                },
                recipient: {
                    fullName: 'Валиуллина Динара',
                    phone: '777777777',
                    email: 'valiulina.dinara@yandex.ru'
                },
                bonuses: 1000
            },
            {   num: 34343431,
                products: [
                    {id: 0, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 1, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 2, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 3, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 4, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 5, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 6, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 7, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                    {id: 8, name: 'Test', cost: 10, oldCost: 100,  mediaUrl: 'https://picsum.photos/id/659/100'},
                ],
                status: orderStatus.finished,
                date: {
                    created: '2021-06-15T12:24:26Z',
                    deliveryStart: '2021-06-17T18:24:26Z',
                    deliveryEnd:'2021-06-17T20:24:26Z',
                },
                passportNeeded: false,
                paymentMethod: paymentMethods.applePay,
                delivery: {
                    address: 'Test',
                    cost: 0
                },
                recipient: {
                    fullName: 'Test',
                    phone: '99999999',
                    email: 'Test'
                },
                bonuses: 0
             },
    ]


    return (
        <div className={styles.wrapper}>
            {/*Map fetched Orders! */}
            <Order data={testValues[0]}/>
            <Order data={testValues[1]}/>
        </div>
    );
}

export default OrdersCard;