import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch the orders
export const FetchuserOrder = createAsyncThunk("order/FetchuserOrder", async(_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        // Handle error gracefully
        return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
});

// Fetch order by Id
export const FetchOrderDetails = createAsyncThunk("order/FetchOrderDetails", async(orderId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        // Handle error gracefully
        return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrder: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch user orders
        .addCase(FetchuserOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(FetchuserOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(FetchuserOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Fetch order details
        .addCase(FetchOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(FetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        })
        .addCase(FetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default orderSlice.reducer;
