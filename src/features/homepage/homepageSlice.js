import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { loginAPI, singupAPI, scanAPI } from '../../utils/dbInterface';

export const login = createAsyncThunk(
    "homepage/login",
    async ({username, password}, thunkAPI) =>{
        try{
            const {ok, message, data} = await loginAPI({username, password})
            if(ok)
                return {message, data};
            else
                return thunkAPI.rejectWithValue({message});

        }catch(err){
            console.log(err);
            return thunkAPI.rejectWithValue({message: "Error with the connection"});
        }
    }
)

export const singup = createAsyncThunk(
    "homepage/singup",
    async ({username, password, firstName, lastName}, thunkAPI) =>{
        try{
            const {ok, message, data} = await singupAPI({username, password, firstName, lastName})
            if(ok)
                return {message, data};
            else
                return thunkAPI.rejectWithValue({message});

        }catch(err){
            console.log(err);
            return thunkAPI.rejectWithValue({message: "Error with the connection"});
        }
    }
)

export const scan = createAsyncThunk(
    "homepage/scan",
    async ({target}, thunkAPI) =>{
        try{
            const {id, token} = thunkAPI.getState().homepage;
            const {ok, message, data} = await scanAPI({userId: id, target, token})
            if(ok)
                return {message, data};
            else
                return thunkAPI.rejectWithValue({message});

        }catch(err){
            console.log(err);
            return thunkAPI.rejectWithValue({message: "Error with the connection"});
        }
    }
)

export const homepageSlice = createSlice({
    name: 'homepage',
    initialState:{
        id: undefined,
        token: undefined,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.id = undefined;
            state.token= undefined;
            message.success("User logged out succesfully");
        },
    },
    extraReducers: {
        [login.pending]: (state, action) =>{
            state.loading = true;
        },
        [login.fulfilled]: (state, action) =>{
            state.loading = false;
            state.id = action.payload.data.id;
            state.token = action.payload.data.token;
            message.success(action.payload.message);
        },
        [login.rejected]: (state, action) =>{
            state.loading = false;
            message.error(action.payload.message);
        },
        [singup.pending]: (state, action) =>{
            state.loading = true;
        },
        [singup.fulfilled]: (state, action) =>{
            state.loading = false;
            message.success(action.payload.message);
        },
        [singup.rejected]: (state, action) =>{
            state.loading = false;
            message.error(action.payload.message);
        },
        [scan.pending]: (state, action) =>{
            state.loading = true;
        },
        [scan.fulfilled]: (state, action) =>{
            state.loading = false;
            message.success(action.payload.message);
        },
        [scan.rejected]: (state, action) =>{
            state.loading = false;
            message.error(action.payload.message);
        },
  },
});

export const { logout } = homepageSlice.actions;

export const selectLoading = (state) => state.homepage.loading;
export const selectIsLogged = (state) => state.homepage.id == undefined;


export default homepageSlice.reducer;