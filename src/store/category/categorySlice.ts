import { createSlice } from '@reduxjs/toolkit';
import {
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
  submitCategory,
  updateCategory
} from './categoryThunks.ts';
import { RootState } from '../../app/store.ts';

interface categoryState {
  categories: ICategory[];
  editableCategory: ICategory | null;
  loading: boolean;
}

const initialState: categoryState = {
  categories: [],
  editableCategory: null,
  loading: false,
};

export const selectCategories =
  (state: RootState) => state.category.categories;
export const selectEditableCategory =
  (state: RootState) => state.category.editableCategory;
export const selectLoadingCategory =
  (state: RootState) => state.category.loading;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      })

      .addCase(submitCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitCategory.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.editableCategory = payload;
      })
      .addCase(fetchCategoryById.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const categoryReducer = categorySlice.reducer;