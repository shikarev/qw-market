import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IProductData} from "../types/Product";
import {
    CartProductStatus,
    FetchAddProductArgs,
    FetchUpdateProductArgs,
    ICartItem,
    UpdateCartProductArgs
} from "../types/Cart";
import {remoteCartApi} from "../api/remoteCart";
import {productAPI} from "../api/product";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

interface Cart {
    items: ICartItem[] | undefined;
    isLoading: boolean;
    error: any;
}

type LocalCart = Array<ICartItem>;

const getLocalCart = (): LocalCart | null => {
    return JSON.parse(localStorage.getItem('__cart__') || 'null');
};

const updateLocalCart = (data: any) => {
    localStorage.setItem('__cart__', JSON.stringify(data));
}

const clearLocalCart = (): void => {
    localStorage.removeItem('__cart__');
};

const initialState: Cart = {
    items: undefined,
    isLoading: false,
    error: null
};

const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (isAuthenticated: boolean, {dispatch}) => {

        const localCart = getLocalCart();

        if(!isAuthenticated) {
            return (localCart || []);
        }

        if(localCart) {
            await dispatch(
                remoteCartApi.endpoints.migrate.initiate(
                    localCart.map(it => ({
                        price: it.price_id,
                        quantity: it.quantity,
                        status: it.status,
                        points: it.product.points,
                        cost: it.product.cost
                    }))
                )
            );
            clearLocalCart();
        }

        const {data: remoteItems} = await dispatch(remoteCartApi.endpoints.getCartDetails.initiate());
        return remoteItems as ICartItem[];
    }
);

const fetchAddProduct = createAsyncThunk<any, FetchAddProductArgs>(
    'cart/fetchAddProduct',
    async (
        {isAuthenticated, productId, priceId}: FetchAddProductArgs,
        {dispatch, rejectWithValue}
    ) => {
        const {data} = await dispatch(productAPI.endpoints.fetchProductById.initiate(productId));
        const productInfo = data as IProductData;

        if(!priceId) {
            priceId = productInfo.priceId;
        }

        if(isAuthenticated) {

            const resp = await dispatch(remoteCartApi.endpoints.addProduct.initiate({
                status: CartProductStatus.ACTIVE,
                // points: productInfo.points,
                // cost: productInfo.cost,
                price: priceId,
                quantity: 1
            }));

            if('error' in resp) {
                const error = resp.error as FetchBaseQueryError;
                const errorMsg = (error.data as Array<string>).join(', ');
                // rejectWithValue(errorMsg);
                throw new Error(errorMsg);
            } else {
                dispatch(actions.addProduct(resp.data));
                return resp.data as ICartItem;
            }

        } else {

            const cart = getLocalCart() || [];
            const item = cart.find(it => it.product.id === productId);

            if(item) {
                return item;
            }

            const newItem = {
                id: priceId,
                quantity: 1,
                cost: productInfo.cost,
                price_id: priceId,
                vendor_point_id: productInfo.vendor?.id || '',
                vendor_point_name: productInfo.vendor?.name || '',
                product: productInfo as IProductData,
                status: CartProductStatus.ACTIVE,
            };

            cart.push(newItem);
            updateLocalCart(cart);
            dispatch(actions.addProduct(newItem));
            return newItem;
        }
    }
);

const fetchUpdateProduct = createAsyncThunk<any, FetchUpdateProductArgs>(
    'cart/fetchProductUpdate',
    async (
        {isAuthenticated, ...args}: FetchUpdateProductArgs,
        {dispatch, rejectWithValue}
    ) => {
        console.log({args});
        if(isAuthenticated) {
            const resp = await dispatch(remoteCartApi.endpoints.update.initiate(args));
            if('error' in resp) {
                rejectWithValue(resp.error);
            } else {
                dispatch(actions.updateProduct(args));
                return resp.data as ICartItem;
            }
        } else {
            const cart = getLocalCart() || [];
            const item = cart.find(it => it.id === args.id);

            if(item) {
                if(args.quantity) {
                    item.quantity = args.quantity;
                }
                if (args.status) {
                    item.status = args.status;
                }
                updateLocalCart(cart);
                dispatch(actions.updateProduct(args));
                return item;
            }
        }
    }
);

const fetchUpdateStatuses = createAsyncThunk(
    'cart/fetchUpdateStatuses',
    async (
        {isAuthenticated, statuses}: {isAuthenticated: boolean; statuses: {[id: string]: CartProductStatus}},
        {dispatch, rejectWithValue}
    ) => {
        if(isAuthenticated) {
            await dispatch(remoteCartApi.endpoints.updateStatuses.initiate(statuses));
        }  else {
            const cart = (getLocalCart() || []).map(it => {
                if(it.id in statuses) {
                    it = {...it, status: statuses[it.status]};
                }
                return it;
            });
            updateLocalCart(cart);
        }
        dispatch(actions.updateStatuses(statuses));
    }
);

const fetchDeleteProducts = createAsyncThunk(
    'cart/fetchDeleteProducts',
    async (
        {isAuthenticated, ids}: {isAuthenticated: boolean; ids: string[]},
        {dispatch}
    ) => {
        if(isAuthenticated) {
            await dispatch(remoteCartApi.endpoints.multipleDeleteProduct.initiate(ids));
        } else {
            updateLocalCart((getLocalCart() || []).filter(it => !ids.includes(it.id)));
        }
        dispatch(actions.deleteProducts(ids));
    }
);

const fetchDeleteAllProducts = createAsyncThunk(
    'cart/fetchDeleteAllProducts',
    async (isAuthenticated: boolean, {dispatch}) => {
        if(isAuthenticated) {
            await dispatch(remoteCartApi.endpoints.deleteAllProducts.initiate());
        } else {
            updateLocalCart([]);
        }
        dispatch(actions.clear(null));
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.items = [...state.items || [], action.payload];
        },
        updateProduct: (state, action) => {
            const args = action.payload as UpdateCartProductArgs;
            state.items = (state.items || []).map(it => {
                return it.id === args.id ? {...it, ...args} : {...it};
            });
        },
        updateStatuses: (state, action) => {
            const statuses = action.payload as {[id: string]: CartProductStatus};
            state.items = (state.items || []).map(it => {
                if(it.id in statuses) {
                    it = {...it, status: statuses[it.id]};
                }
                return it;
            });
        },
        deleteProducts: (state, action) => {
            const ids = action.payload as string[];
            state.items = (state.items || []).filter(it => !ids.includes(it.id));
        },
        clear: (state, action) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });

        /*builder.addCase(fetchAddProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAddProduct.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(fetchAddProduct.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        });*/
    }
});

const actions = cartSlice.actions;
export default cartSlice;
export {
    fetchCart,
    fetchAddProduct,
    fetchUpdateProduct,
    fetchDeleteProducts,
    fetchDeleteAllProducts,
    fetchUpdateStatuses
};
