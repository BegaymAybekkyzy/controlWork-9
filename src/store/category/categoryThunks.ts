import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

export const fetchAllCategories = createAsyncThunk<ICategory[], void>(
  'category/fetchAllCategories',
  async () => {
    const response = await axiosAPI<ICategoryAPI>('finances/categories.json');
    const keysArray = Object.keys(response.data);
    const categories: ICategory[] = keysArray.map((key) => {
      return {
        ...response.data[key],
        id: key,
      };
    });
    return categories;
  });

export const deleteCategory = createAsyncThunk<void, string>(
  "category/deleteCategory",
  async (id) => {
    await axiosAPI.delete(`finances/categories/${id}.json`);
  },
);

export const submitCategory = createAsyncThunk<void, ICategoryForm>(
  "category/submitCategory",
  async (category) => {
    await axiosAPI.post("finances/categories.json", category);
  },
);

export const fetchCategoryById = createAsyncThunk<ICategory, string>(
  "category/fetchCategoryById",
  async (id) => {
    const response = await axiosAPI<ICategoryForm>(`finances/categories/${id}.json`);
    return {
      ...response.data,
      id,
    };
  },
);

export const updateCategory = createAsyncThunk<void, ICategory>(
  "category/updateCategory",
  async (transaction) => {
    const { id, ...updateTransaction } = transaction;
    await axiosAPI.put(`finances/categories/${id}.json`, updateTransaction);
  },
);