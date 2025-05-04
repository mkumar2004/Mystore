import {configureStore,} from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import productReducer from './slices/ProductSlice'
import cartReducer from './slices/CartSlice';
import checkoutReducer from './slices/CheckoutSlice';
import OrderReducer from './slices/OrderSlice';
import adminReducer from './slices/AdminSlice';
import adminProductReducer from './slices/AdminProductSlice';
import adminOrderReducer from './slices/AdminOrdersSlice';
const store = configureStore({
    reducer:{
        auth : authReducer,
        products : productReducer,
        cart : cartReducer,
        checkout :checkoutReducer,
        orders :OrderReducer,
        admin:adminReducer,
        adminProducts:adminProductReducer,
        adminOrders:adminOrderReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;