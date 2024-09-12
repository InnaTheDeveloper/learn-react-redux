import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import {dogApiSlice} from '../features/dogsApi/dogs-api-slice'
import { goodsApiSlice } from "../features/goodsApi/goods-api-slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer, // thanks to that we can use state.counter field
        [dogApiSlice.reducerPath]: dogApiSlice.reducer,
        [goodsApiSlice.reducerPath]: goodsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(dogApiSlice.middleware).concat(goodsApiSlice.middleware);
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState> // if we add more slices to our store, it updates automatically