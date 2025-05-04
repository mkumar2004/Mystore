import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN =`Bearer ${localStorage.getItem("userToken")}`
//Asyn thunk fetch the products
export const FetchProducts = createAsyncThunk("adminProducts/FetchProducts",async()=>{
    const response = await axios.get(`${API_URL}/api/admin/products`,
        {
            headers:{
                Authorization: USER_TOKEN,
            },
        },
    );
    return response.data;
});

//Async Create Product
export const CreateProducts = createAsyncThunk("adminProducts/CreateProducts",async(productdata)=>{
    const response = await axios.post(`${API_URL}/api/admin/products`,
        productdata,
        {
            headers:{
                Authorization: USER_TOKEN,
            },
        },
    );
   return response.data;
});

//Async Update Product
export const UpadateProducts = createAsyncThunk("adminProducts/UpadateProducts",async(id,productdata)=>{
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`,
        productdata,
        {
            headers:{
                Authorization: USER_TOKEN,
            },
        },
    );
   return response.data;
});

//Async Thunk deteproducts
export const DeleteProducts = createAsyncThunk("adminProducts/DeleteProducts",async(id)=>{
     await axios.delete(`${API_URL}/api/products/${id}`,
        {
            headers:{
                Authorization: USER_TOKEN,
            },
        },
    );
   return id;
});

const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchProducts.pending,(state)=>{
            state.loading =true
        })
        .addCase(FetchProducts.fulfilled,(state,action)=>{
            state.loading =false;
            state.products = action.payload;
        })
        .addCase(FetchProducts.rejected,(state,action)=>{
            state.loading =false;
            state.error =action.error.message
        })
        //handle create products
        .addCase(CreateProducts.fulfilled,(state,action)=>{
        
            state.products.push(action.payload);
        })
        //handle Update products
        .addCase(UpadateProducts.fulfilled,(state,action)=>{
           const index = state.products.findIndex((product)=> product._id === action.payload._id);
           if(index !==-1){
            state.products[index]=action.payload;
           }
        })
        //handle delete products
        .addCase(DeleteProducts.fulfilled,(state,action)=>{
             state.products =state.products.filter((prd)=>prd._id !== action.payload)
        })
    },

});

export default adminProductSlice.reducer;