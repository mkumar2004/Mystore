import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Retrive user info and token from local storage if available
const userFromstorage = localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) : null;

//check for an existing guest id in the localstorage or generate a new one
const initalGuestId = 
        localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
        localStorage.setItem("guestId",initalGuestId)
        
//initail state
const initialState = {
    user : userFromstorage,
    guestId : initalGuestId,
    loading : false,
    error : null,
};

//Async  Thunk for login
export const loginUser = createAsyncThunk("auth/loginUser",async(userData ,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData);
         localStorage.setItem("userInfo" ,JSON.stringify(response.data.user));
         localStorage.setItem("userToken",response.data.token);

         return response.data.user; // return the user object from response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//Async  Thunk for Register
export const RegisterUser = createAsyncThunk("auth/RegisterUser",async(userData ,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData);
         localStorage.setItem("userInfo" ,JSON.stringify(response.data.user));
         localStorage.setItem("userToken",response.data.token);

         return response.data.user; // return the user object from response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//slice
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.loading = false;
            state.error = null;
            state.guestId = `guest_${new Date().getTime()}`;//Rest guest idon logout
            localStorage.removeItem("userInfo"); //romove user from local storage
            localStorage.removeItem("userToken"); //romove token from local storage
            localStorage.setItem("guestId",state.guestId); // set new guest id in local storage
        },
        generateNewGuestId:(state)=>{
            state.guestId = `guest_${new Date().getTime()}`;  //create new guest id
            localStorage.setItem("guestId",state.guestId); //store guest  id  in local storage
        }
    },
    extraReducers :( builder)=>{
            builder
            .addCase(loginUser.pending ,(state)=>{
                state.loading= true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled ,(state,action)=>{
                state.loading= false;
                state.user =action.payload ;
            })
            .addCase(loginUser.rejected ,(state,action)=>{
                state.loading= false;
                state.error = action.payload.message;
            })
            .addCase(RegisterUser.pending ,(state)=>{
                state.loading= true;
                state.error = null;
            })
            .addCase(RegisterUser.fulfilled ,(state,action)=>{
                state.loading= false;
                state.user =action.payload ;
            })
            .addCase(RegisterUser.rejected ,(state,action)=>{
                state.loading= false;
                state.error = action.payload.message;
            })
            
    }
});

export const {logout, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer; // add to redux store