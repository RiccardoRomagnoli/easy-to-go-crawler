import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import homepageReducer from '../features/homepage/homepageSlice.js'
import crawlHistoryReducer from '../features/crawlhistory/crawlHistorySlice.js'

const initialState = loadFromSessionStorage()

function saveToSessionStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        sessionStorage.setItem("state", serializedState)
    }catch(e){
        console.log(e)
    }
}

function loadFromSessionStorage(){
    try{
        const serializedState = sessionStorage.getItem("state")
        if(serializedState === null) return undefined
        console.log(serializedState)
        return JSON.parse(serializedState)
    }catch(e){
        console.log(e)
        return undefined
    }
};

export const store = configureStore({
    reducer: {
      homepage: homepageReducer,
      crawlHistory: crawlHistoryReducer,
    },
    preloadedState: initialState,
  });

store.subscribe(() => saveToSessionStorage(store.getState()))