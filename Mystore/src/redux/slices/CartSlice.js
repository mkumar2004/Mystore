import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LoadcartLocalstorage = () => {
  const storeCart = localStorage.getItem("cart");
  return storeCart
    ? JSON.parse(storeCart)
    : { products: [], totalPrice: 0 }; //  Ensure totalPrice is always initialized
};

const saveCartStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        params: { userId, guestId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Add to cart
export const addtoCart = createAsyncThunk(
  "cart/addtoCart",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId, quantity, size, color, guestId, userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

// Update cart item
export const Upadatecartitem = createAsyncThunk(
  "cart/Updatecartitem",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId, quantity, size, color, guestId, userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update item");
    }
  }
);

// Remove item
export const Removeitem = createAsyncThunk(
  "cart/Removeitem",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        data: { productId, quantity, size, color, guestId, userId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// Merge guest cart into user cart
export const MerageCart = createAsyncThunk(
  "cart/MerageCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, 
        { guestId, user }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to merge cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: LoadcartLocalstorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      .addCase(addtoCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        saveCartStorage(action.payload);
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(Upadatecartitem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        saveCartStorage(action.payload);
      })
      .addCase(Upadatecartitem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(Removeitem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        saveCartStorage(action.payload);
      })
      .addCase(Removeitem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(MerageCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        saveCartStorage(action.payload);
      })
      .addCase(MerageCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
