// PARTE UNO
// ejemplo sin asincronia(Pending,Fetching...etc) no tomar como ejemplo real,siempre habrá Promises en JavaScript

/* import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "anna",
    email: "anna@gmail.com",
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state) => {
      state.name = ""
      state.email = ""
    },
  },
});

export const { update, remove } = userSlice.actions;
export default userSlice.reducer; */

// PARTE DOS
// Ejemplo asincrono real controlando yo las Promises
/* import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: 'user',
  initialState:{
    userInfo:{
      name:"anna",
      email:"anna@gmail.com"
    },
    pending:null,
    error:false
  },
  reducers:{
    updateStart:(state) => {
      state.pending = true;
    },
    updateSuccess: (state,action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;

    }
   }
})
export const { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer;

 */


// PARTE TRES USANDO CREATE_ASYNC_THUNK
//muy parecida a la dos,pero maneja redux los errores.Ya no van los reducers en xxxSlice.reducers sino en la propiedad xxxSlice.extrareducers.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

//ya va a manejar redux los errores pasandolos a method.pending method.fulfilled ó method.rejected
export const updateUserThunk = createAsyncThunk("users/update", async (user) => {
  const res = await axios.post("http://localhost:8800/api/users/1/update",user);
  console.log(res.data,"thunk")
  return res.data;
})

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    userInfo: {
      name:'anna',
      email: 'anna@gmail.com'
    },
    pending:null,
    error:false
  },
  reducers:{},
  extraReducers:{
    [updateUserThunk.pending]:(state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUserThunk.fulfilled]:(state,action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [updateUserThunk.rejected]:(state) => {
      state.pending = null;
      state.error = true;

    }
  },
})

export default userSlice.reducer;