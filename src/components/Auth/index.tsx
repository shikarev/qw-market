import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { userAPI } from '../../api/user';
import { getTokens, setAuthChecking, setTokens } from '../../store/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Auth = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(getTokens);
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const pastDate = new Date(0);
  useEffect(() => {

    if (!tokens.access || !tokens.refresh) {
      if (cookies.access_token && cookies.refresh_token) {
        dispatch(setTokens({ access: cookies.access_token, refresh: cookies.refresh_token }))
      } else {
        dispatch(setAuthChecking(false))
      }
    } else {
      dispatch(userAPI.endpoints.getUserActivity.initiate()).unwrap()
        .catch(() => {
            // need to check refresh token
            // temporary clear expired tokens... ->
            // removeCookie('access_token') - not working with outdated session
            // removeCookie('refresh_token') - not working with outdated session
            setCookie('access_token', '', {expires: pastDate})
            setCookie('refresh_token', '', {expires: pastDate})
            dispatch(setTokens({ access: undefined, refresh: undefined }))
        })
        .finally(() => {
          dispatch(setAuthChecking(false))
        })
    }

  }, [ tokens ])

  return <></>;
}

export default Auth;
