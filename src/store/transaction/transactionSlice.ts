import { createSlice } from '@reduxjs/toolkit';
import {
  deleteTransaction,
  fetchAllTransactions,
  fetchTransactionById, submitTransaction,
  updateTransaction
} from './transactionThunks.ts';
import { RootState } from '../../app/store.ts';

interface FinanceTrackerState {
  allTransactions: ITransaction[];
  editableTransaction: ITransaction | null;
  loading: boolean;
}

const initialState: FinanceTrackerState = {
  allTransactions: [],
  editableTransaction: null,
  loading: false,
};

export const selectAllTransactions =
  (state: RootState) => state.transactions.allTransactions
export const selectEditableTransaction =
  (state: RootState) => state.transactions.editableTransaction;
export const selectLoadingTransaction=
  (state: RootState) => state.transactions.loading;

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allTransactions = payload;
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(submitTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTransaction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitTransaction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.editableTransaction = payload;
      })
      .addCase(fetchTransactionById.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.loading = false;
      });

  }
});

export const transactionReducer = transactionSlice.reducer;