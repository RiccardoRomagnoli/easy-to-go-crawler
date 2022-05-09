import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getCrawlsAPI, deleteCrawlAPI } from '../../utils/dbInterface';


export const getCrawl = createAsyncThunk(
    "crawlHistory/getCrawl",
    async (payload, thunkAPI) =>{
        try{
            const {id, token} = thunkAPI.getState().homepage;
            const {ok, message, data} = await getCrawlsAPI({id, token})
            if(ok)
                return  {message, data};
            else
                return thunkAPI.rejectWithValue({message});

        }catch(err){
            console.log(err);
            return thunkAPI.rejectWithValue({message: "Error with the connection"});
        }
    }
)

export const deleteCrawl = createAsyncThunk(
    "crawlHistory/deleteCrawl",
    async ({id}, thunkAPI) =>{
        try{
            const {token} = thunkAPI.getState().homepage;
            const {ok, message} = await deleteCrawlAPI({id, token})
            if(ok)
                return {message};
            else
                return thunkAPI.rejectWithValue({message});

        }catch(err){
            console.log(err);
            return thunkAPI.rejectWithValue({message: "Error with the connection"});
        }
    }
)


export const crawlHistorySlice = createSlice({
    name: 'crawlHistory',
    initialState: {
        crawls: undefined,
        loading: false,
    },
    reducers: {
    },
    extraReducers: {
        [getCrawl.pending]: (state, action) =>{
            state.loading = true;
        },
        [getCrawl.fulfilled]: (state, action) =>{
            state.crawls =  action.payload.data
            state.loading = false;
            message.success(action.payload.message);
        },
        [getCrawl.rejected]: (state, action) =>{
            state.loading = false;
            message.error(action.payload.message);
        },
        [deleteCrawl.pending]: (state, action) =>{
            state.loading = true;
        },
        [deleteCrawl.fulfilled]: (state, action) =>{
            state.loading = false;
            message.success(action.payload.message);
        },
        [deleteCrawl.rejected]: (state, action) =>{
            state.loading = false;
            message.error(action.payload.message);
        },
    },
});

export const selectCrawls = (state) => state.crawlHistory.crawls;
export const selectLoading = (state) => state.crawlHistory.loading;

export default crawlHistorySlice.reducer;
