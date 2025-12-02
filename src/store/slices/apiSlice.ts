import { Product } from "@/features/product/products.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Products", "Product", "Categories"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: "Product" as const, id: p.id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_, _err, id) => [{ type: "Product", id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
} = apiSlice;
