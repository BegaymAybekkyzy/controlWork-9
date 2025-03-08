import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

export const fetchAllTransactions = createAsyncThunk<ITransaction[], void>(
  'transaction/fetchAllTransactions',
  async () => {
    const response = await axiosAPI<ITransactionAPI>('finances/transaction.json');
    const keysArray = Object.keys(response.data);
    const transactions: ITransaction[] = keysArray.map((key) => {
      return {
        ...response.data[key],
        id: key,
      };
    });
    return transactions;
  });

export const deleteTransaction = createAsyncThunk<void, string>(
  "transaction/deleteTransaction",
  async (id) => {
    await axiosAPI.delete(`finances/transaction/${id}.json`);
  },
);

export const submitTransaction = createAsyncThunk<void, ITransactionForm>(
  "transaction/submitTransaction",
  async (transaction) => {
    await axiosAPI.post("finances/transaction.json", transaction);
  },
);

export const fetchTransactionById = createAsyncThunk<ITransaction, string>(
  "transaction/fetchTransactionById",
  async (id) => {
    const response = await axiosAPI<ITransactionForm>(`finances/transaction/${id}.json`);
    return {
      ...response.data,
      id,
    };
  },
);

export const updateTransaction = createAsyncThunk<void, ITransaction>(
  "transaction/updateTransaction",
  async (transaction) => {
    const { id, ...updateTransaction } = transaction;
    await axiosAPI.put(`finances/transaction/${id}.json`, updateTransaction);
  },
);