import { apiSlice } from './apiSlice';
import { Cart } from './guestCart';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => 'cart',
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<void, { productId: number; quantity: number }>({
      query: (payload) => ({
        url: 'cart/items',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation<void, { productId: number }>({
      query: (payload) => ({
        url: 'cart/items/' + payload.productId,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: 'cart/items',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});
