import React, {useEffect, useState} from 'react';
import {useAddProductMutation, useGetCartDetailsQuery} from "../../../api/cart";
import CartProductQuantityControl from "../CartProductQuantityControl";
import {Button, CircularProgress} from "@mui/material";
import {ICartItem} from "../../../types/Cart";
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import clsx from 'clsx';

const cx = classNames.bind(styles);

export interface CartButtonProps {
    [prop: string]: any;

    productId: string;
    priceId?: string;
    children?: any;
    classes?: any;
    bigSize?: boolean,
}

const CartButton = ({children, productId, priceId, classes, bigSize, ...props}: CartButtonProps) => {

    const [addProductRequest, {isLoading}] = useAddProductMutation();
    const [cartItem, setCartItem] = useState<ICartItem | undefined>();
    const {data: cartItems} = useGetCartDetailsQuery();

    useEffect(() => {
        if (cartItems && priceId) {
            let _cartItem = cartItems!.find(it => it.price_id === priceId);
            setCartItem(_cartItem);
        }
    }, [cartItems, priceId]);

    async function clickhandler() {
        await addProductRequest(productId, priceId);
    }

    if (!props.hasOwnProperty('variant')) {
        props.variant = 'contained';
    }

    if (!props.hasOwnProperty('color')) {
        props.color = 'primary';
    }

    let className = null;
    let styles = {};

    if (props.hasOwnProperty('style')) {
        styles = props.style;
        delete props.style;
    }

    if (props.hasOwnProperty('className')) {
        className = props.className;
        delete props.className;
    }

    return (
        <div style={styles} className={clsx(classes?.root, className)}>
            {cartItem
                ? <CartProductQuantityControl className={cx('counter')} cartItem={cartItem} value={cartItem.quantity}
                                              bigSize={bigSize}/>
                : <Button variant={bigSize ? 'contained': 'outlined'} color='primary'
                          sx={{
                              position: 'relative',
                              p: bigSize ? '1rem 3.8rem': '.7rem 3.8rem', //4rem - 6px border
                              borderWidth: '2px',
                              width: bigSize ? '100%' : 'fit-content',
                              borderColor: 'primary.main',
                              fontSize: '1.7rem',
                              lineHeight: '2.8rem',
                              fontWeight: 700,
                              whiteSpace:'nowrap',
                              '&:hover': {
                                  borderWidth: '2px',
                              },
                              '&:disabled':{
                                  backgroundColor: 'secondary.light',
                                  borderColor: 'secondary.light',
                                  borderWidth: '3px',
                              }
                          }} className='app-cart-button' onClick={clickhandler}
                          disabled={isLoading || !priceId}>
                    {children ?? priceId
                        ? `В корзину`
                        : 'Нет в наличии'
                    }
                    {isLoading &&
                        <CircularProgress sx={{position: 'absolute', top: '12px', right: '.8rem'}} size={20}/>}
                </Button>
            }
        </div>
    );
}

export default CartButton;
