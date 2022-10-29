import { Badge, Typography } from '@mui/material';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useGetCartDetailsQuery } from '../../api/cart';
import { useLazyGetUserActivityQuery } from '../../api/user';

// Types
import { UserAction } from '../../types';

//Utils
import { generateKey } from '../../utils/utils';

import styles from './styles.module.scss';

const cx = classNames.bind(styles)

const UserActions = (props:{userActions: UserAction[]}) => {

    const navigate = useNavigate();
    const [trigger, {data: userActivityData}] = useLazyGetUserActivityQuery();
    const [userActions, setUserActions] = useState<UserAction[]>(() => {
        return props.userActions.map(action => ({...action}));
    });
    const {data: cartItems} = useGetCartDetailsQuery();
    const [cookies] = useCookies(['access_token']);

    useEffect(() => {
        const isAuthenticated = !!(cookies && cookies.access_token);
        if(isAuthenticated){
            trigger();
        }
    }, [cookies])


    useEffect(() => {
        if(cartItems) {
            const cartProductCount = cartItems.reduce((p: number, c) => p + c.quantity, 0);
            setUserActions(prevState => {
                return prevState.map(action => {
                    return action.id == 'cart' ? {...action, count: cartProductCount} : {...action};
                });
            });
        }
    }, [cartItems]);

    useEffect( () => {
        if(userActivityData){
            setUserActions([...userActions.map(item => ({...item, count: userActivityData[item.id]}) )]);
        }
    }, [userActivityData])

    const handleClick = (url: string) => {
        return url && navigate(url)
    }

    return (
        <section className={cx('actions')}>
            {
                userActions.map((action:UserAction) => (
                    <div className={cx('action')}
                         key={generateKey(action.title)}
                         onClick={() => handleClick(action.url)}
                    >
                        <div className={cx('badge')}>
                            <Badge sx={{'span': {fontSize: '1rem'}}} badgeContent={action.count} color="primary">
                                <img src={action.count ? action.activeIcon : action.icon} alt=""/>
                            </Badge>
                        </div>
                        <Typography variant={"inherit"} className={cx('action_title')}>{action.title}</Typography>
                    </div>
                ))
            }
        </section>
    )
};

export default UserActions;
