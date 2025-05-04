import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk to fetch products by collection and optional filters
export const FetchProductByFilters = createAsyncThunk(
  "products/FetchProductByFilters",
  async (
    {
      collection,
      size,
      gender,
      color,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    }) => {
    try {
      const query = new URLSearchParams();

      // Add filters to query
      if (collection) query.append("collection", collection);
      if (size) query.append("size",size);
      if (gender) query.append("gender", gender);
      if (color) query.append("color",color);
      if (minPrice) query.append("minPrice",minPrice);
      if (maxPrice) query.append("maxPrice",maxPrice);
      if (sortBy) query.append("sortBy",sortBy);
      if (search) query.append("search",search);
      if (category) query.append("category",category);
      if (material) query.append("material", material);
      if (brand) query.append("brand",brand);
      if (limit) query.append("limit",limit);

      // Fetch data from backend
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
      );

      return response.data; // Return the response data if successful
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data || error.message); // Return error if request fails
    }
  }
);



// AsyncThunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

// AsyncThunk to update a product
export const updateProducts = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productdata }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data; // Return updated product if successful
    } catch (error) {
      console.error("Error updating product:", error);
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

// AsyncThunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching similar products:", error);
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, // Store the details of a single product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      gender: "",
      color: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      material: "",
      brand: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        gender: "",
        color: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
        limit: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching products with filters
      .addCase(FetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(FetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle fetching single product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle updating product
      .addCase(updateProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (prd) => prd._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});



export const { setFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
