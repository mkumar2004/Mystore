import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async: Fetch all orders
export const FetchOrder = createAsyncThunk(
  "Adminorder/FetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data; // assuming this is an array of orders
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Fetch failed" });
    }
  }
);

// Async: Update order status
export const UpdateOrder = createAsyncThunk(
  "Adminorder/UpdateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data; // should be updated order object
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Update failed" });
    }
  }
);

// Async: Delete order
export const DeleteOrder = createAsyncThunk(
  "Adminorder/DeleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return id; // return the deleted order ID
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Delete failed" });
    }
  }
);

// Slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalsales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(FetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalsales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
      .addCase(FetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      // Update Order
      .addCase(UpdateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      // Delete Order
      .addCase(DeleteOrder.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== deletedId);
        state.totalOrders = state.orders.length;
        state.totalsales = state.orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
  },
});

export default adminOrderSlice.reducer;
