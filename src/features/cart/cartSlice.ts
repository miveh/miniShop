import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/features/cart/models/Cart";

interface State {
  items: CartItem[];
}

const initialState: State = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item: CartItem = action.payload;
      state.items.push(item);
    },
    remove(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increase(state, action) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.qty += 1;
    },
    decrease(state, action) {
      const it = state.items.find((i) => i.id === action.payload);
      if (it) it.qty = Math.max(1, it.qty - 1);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { add, remove, increase, decrease, clear } = cartSlice.actions;
export default cartSlice;
