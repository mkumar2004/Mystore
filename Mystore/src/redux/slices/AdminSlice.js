import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all users
export const FetchUser = createAsyncThunk("admin/FetchUser",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Admin/users`,
        
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        },
    );
    return response.data;
});

//Add the create user action
export const AddUser = createAsyncThunk("admin/AddUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/Admin/users`,
            userData, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


//Upadate user info
export const UpdateUserInfo = createAsyncThunk("admin/UpdateUserInfo",async({id,name,email,role})=>{
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/Admin/users/${id}`,
        {name,email,role},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            },
        },
    );
   return response.data;
    
});

//Detele user
export const DeteleUser = createAsyncThunk("admin/DeteleUser",async({id})=>{
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/Admin/users/${id}`,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            },
        }
    );
    return id;
});

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //handle fetchhing the users
        .addCase(FetchUser.pending ,(state)=>{
            state.loading =true
        })
        .addCase(FetchUser.fulfilled ,(state,action)=>{
            state.loading =false;
            state.users = action.payload
        })
        .addCase(FetchUser.rejected ,(state,action)=>{
            state.loading =true;
            state.error = action.error.message
        })
        //Handle Updatecase
        .addCase(UpdateUserInfo.fulfilled,(state,action)=>{
            const updateUser = action.payload;
            const userIndex =state.users.findIndex((user)=>user._id === updateUser._id);
            if(userIndex !=-1){
                state.users[userIndex] = updateUser;
            } 
        })
        //handle Delte case
        .addCase(DeteleUser.fulfilled,(state,action)=>{
           state.users = state.users.filter((user)=> user._id !== action.payload);
        })
        //handle Add new user
        .addCase(AddUser.pending,(state)=>{
            state.loading =true;
            state.error = null;
        })
        .addCase(AddUser.fulfilled,(state,action)=>{
            state.loading =false;
            state.users.push(action.payload);//add new user
        })
        .addCase(AddUser.rejected,(state,action)=>{
            state.loading =false;
            state.error = action.payload.message;
        })
    },
});

export default adminSlice.reducer;
