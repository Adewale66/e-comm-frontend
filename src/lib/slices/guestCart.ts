import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductInfo {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  products: ProductInfo[];
}

const initialState: Cart = {
  products:
    typeof window !== 'undefined' && global?.localStorage.getItem('guestCart')
      ? JSON.parse(global?.localStorage.getItem('guestCart') as string)
      : [],
};

const guestCartSlice = createSlice({
  name: 'guestCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductInfo>) => {
      state.products.push(action.payload);
      global.localStorage.setItem('guestCart', JSON.stringify(state.products));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products.filter((_, i) => i !== action.payload);
      global.localStorage.setItem('guestCart', JSON.stringify(state.products));
    },
  },
});

export const { addToCart, removeFromCart } = guestCartSlice.actions;
export default guestCartSlice.reducer;
