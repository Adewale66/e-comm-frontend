import { apiSlice } from './apiSlice';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export const prouctsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], { category: string }>({
      query: (data) => 'products?category=' + data.category,
    }),

    getProduct: builder.query<Product, { id: string }>({
      query: (data) => 'products/' + data.id,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = prouctsApi;
