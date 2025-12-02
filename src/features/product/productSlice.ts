import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/features/product/models/Product";
import { SortOption } from "../cart/cart.const";

interface State {
  items: Product[];
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  filter: {
    category?: string;
    sort?: SortOption;
    page: number;
    perPage: number;
  };
}

const initialState: State = {
  items: [],
  categories: [],
  status: "idle",
  filter: { page: 1, perPage: 8, category: "All", sort: SortOption.Default },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.filter.category = action.payload || undefined;
      state.filter.page = 1;
    },
    setSort(state, action) {
      state.filter.sort = action.payload || undefined;
    },
    setPage(state, action) {
      state.filter.page = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload as Product[];
    },
    setCategories(state, action) {
      state.categories = action.payload as string[];
    },
  },
});

export const { setCategory, setSort, setPage, setItems, setCategories } =
  productSlice.actions;
export default productSlice;
