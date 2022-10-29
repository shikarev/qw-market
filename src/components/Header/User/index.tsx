import React, { useEffect } from 'react';
import { ColoredAvatar } from '@qwangy/styles';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { getIsAuth } from '../../../store/auth';
import { useMeQuery } from '../../../api/me';
import style from "../styles.module.scss"
import ActivityButtons from './ActivityButtons';
import wishImage from '../../../assets/wishImage.png';
import { toTrueWordForm } from '../../../utils/toTrueWordForm';
import Search from '../Search';
import { useNavigate } from 'react-router-dom';
import { useLazyGetUserActivityQuery } from '../../../api/user';
import { useCookies } from 'react-cookie';

const User = () => {

  const isAuth = useAppSelector(getIsAuth);

  const [trigger, {data: userActivityData}] = useLazyGetUserActivityQuery();

  const [cookies] = useCookies(['access_token']);

  const { data: me } = useMeQuery(null, { skip: !isAuth })

  const navigate = useNavigate();

  function handleWish() {
    navigate(`/wishlist`);
  }

  useEffect(() => {
    const isAuthenticated = !!(cookies && cookies.access_token);
    if(isAuthenticated){
      trigger();
    }
  }, [cookies])

  return (
    <Box className={style.header_container}>
      <Box className={style.header_content}>
        <Box className={style.header_content_user}>
          <Box className={style.profile}>
            <Box className={style.avatar}>
              <ColoredAvatar size={100} name={me?.name} picture={me?.picturePath} sx={{ fontSize: '4.2rem' }} />
            </Box>
            <Box className={style.profile_content}>
              <Box className={style.profile_welcome}>Добро пожаловать,</Box>
              <Box className={style.profile_name}>{me?.name ?? 'Гость'}</Box>
            </Box>
          </Box>
          <ActivityButtons userActivity={userActivityData} />
          {/*<UserActions userActions={window.innerWidth <= 699 ? userActions.slice(0, 3) : userActions} />*/}
        </Box>
        <Box className={style.header_content_right} onClick={handleWish}>
          <Box className={style.wishContainer}>
            <Box className={style.wishImages}>
              <img src={wishImage} className={style.wishPic} alt="" />
            </Box>
            <Box
              className={style.wish}>{toTrueWordForm(userActivityData && userActivityData.wishes || 0, [ 'товар', 'товара', 'товаров' ])} в
              списке желаний
            </Box>
          </Box>
          {/*<div className={cx('day')}>{new Date().toLocaleString("ru-RU", { day : '2-digit'})}</div>
                        <div className={cx('month')}>{new Date().toLocaleString("ru-RU", { month: "long" })}</div>*/}
        </Box>
      </Box>
      <Search />
    </Box>
  )
}

export default User;
