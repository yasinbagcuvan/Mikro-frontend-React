import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

const basketSlice = createSlice({
  name: "basket",
  initialState: [] as Product[],
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
