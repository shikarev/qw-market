import { CartProductStatus, ICartItem, ProductPriceListItem, UpdateCartProductArgs } from '../types/Cart';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  fetchDeleteAllProducts,
  fetchDeleteProducts,
  fetchUpdateStatuses,
  fetchUpdateProduct,
  fetchAddProduct,
  fetchCart,
} from '../store/сart';
import { remoteCartApi } from './remoteCart';
import { useCookies } from 'react-cookie';

function useGetCartDetailsQuery(): { data: ICartItem[] | undefined; isLoading: boolean; error: any } {

  const cartItems = useAppSelector(store => store.cart.items);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>();
  const [ cookies ] = useCookies([ 'access_token' ]);
  const dispatch = useAppDispatch();

  useEffect(() => {

    setIsLoading(true);
    const isAuthenticated = !!(cookies && cookies.access_token);
    const resp = dispatch(fetchCart(isAuthenticated)).unwrap();

    resp.then(() => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

  }, [ cookies, dispatch ]);

  return { data: cartItems, isLoading, error };
}

function useAddProductMutation(): [
  (productId: string, priceId?: string) => Promise<ICartItem | void>,
  { isLoading: boolean; error: any }
] {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>();
  const [ cookies ] = useCookies([ 'access_token' ]);
  const dispatch = useAppDispatch();

  const useAddProduct = useCallback(async (productId: string, priceId?: string) => {

    const isAuthenticated = !!(cookies && cookies.access_token);
    setIsLoading(true);
    const resp = dispatch(fetchAddProduct({ isAuthenticated, productId, priceId })).unwrap();

    resp.then((res) => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

    return resp;
  }, [ cookies ]);

  return [ useAddProduct, { isLoading, error } ];
}

function useUpdateMutation(): [
  (args: UpdateCartProductArgs) => Promise<ICartItem>,
  { isLoading: boolean; error: any }
] {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>();
  const [ cookies ] = useCookies([ 'access_token' ]);
  const dispatch = useAppDispatch();

  const update = useCallback(async (args: UpdateCartProductArgs) => {

    setIsLoading(true);
    const isAuthenticated = !!(cookies && cookies.access_token);
    const resp = dispatch(fetchUpdateProduct({ ...args, isAuthenticated })).unwrap();

    resp.then(() => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

    return resp;

  }, [ cookies ]);

  return [ update, { isLoading, error } ];
}

function useMultipleDeleteMutation(): [
  (ids: string[]) => void,
  { isLoading: boolean; error: any }
] {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ cookies ] = useCookies([ 'access_token' ]);
  const [ error, setError ] = useState<any>();
  const dispatch = useAppDispatch();

  const multipleDelete = useCallback(async (ids: string[]) => {

    const isAuthenticated = !!(cookies && cookies.access_token);
    setIsLoading(true);
    dispatch(fetchDeleteProducts({ isAuthenticated, ids })).then(() => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

  }, [ cookies, dispatch ]);

  return [ multipleDelete, { isLoading, error } ];
}

function useUpdateStatusesMutation(): [
  (data: Array<{ id: string; status: CartProductStatus }>) => void,
  { isLoading: boolean; error: any }
] {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>();
  const [ cookies ] = useCookies([ 'access_token' ]);
  const dispatch = useAppDispatch();

  const updateStatuses = useCallback(async (data: Array<{ id: string; status: CartProductStatus }>) => {

    setIsLoading(true);
    const isAuthenticated = !!(cookies && cookies.access_token);

    const statuses = data.reduce((p, it) => ({ ...p, [ it.id ]: it.status }), {});
    const resp = dispatch(fetchUpdateStatuses({ isAuthenticated, statuses })).unwrap();

    resp.then(() => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

  }, [ cookies, dispatch ]);

  return [ updateStatuses, { isLoading, error } ];
}

function useDeleteAllProductsMutation(): [
  () => void,
  { isLoading: boolean; error: any }
] {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<any>();
  const [ cookies ] = useCookies([ 'access_token' ]);
  const dispatch = useAppDispatch();

  const deleteAllProducts = useCallback(async () => {

    setIsLoading(true);
    const isAuthenticated = !!(cookies && cookies.access_token);
    const resp = dispatch(fetchDeleteAllProducts(isAuthenticated)).unwrap();

    resp.then(() => {

    }).catch(err => {
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });

  }, [ cookies ]);

  return [ deleteAllProducts, { isLoading, error } ];
}

function useGetProductPriceQuery(): [
  (priceId: string) => Promise<ProductPriceListItem | undefined>,
  { isLoading: boolean }
] {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const getProductPrices = useCallback(async (priceId: string) => {
    setIsLoading(true);
    const { data: prices } = await dispatch(remoteCartApi.endpoints.getProductPrices.initiate([ priceId ]));
    setIsLoading(false);
    return prices && prices.find(p => p.id === priceId) as ProductPriceListItem;
  }, [ dispatch ]);

  return [ getProductPrices, { isLoading } ];
}

export {
  useGetCartDetailsQuery,
  useAddProductMutation,
  useUpdateMutation,
  useMultipleDeleteMutation,
  useDeleteAllProductsMutation,
  useUpdateStatusesMutation,
  useGetProductPriceQuery
};
