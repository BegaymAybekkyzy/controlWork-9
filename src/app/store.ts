import { configureStore } from '@reduxjs/toolkit';
import { transactionReducer } from '../store/transaction/transactionSlice.ts';
import { categoryReducer } from '../store/category/categorySlice.ts';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    category: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;