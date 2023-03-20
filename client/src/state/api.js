import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Cart"],
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ username, password }) => ({
        url: "/user/login",
        method: "POST",
        body: { username, password },
        providesTags: ["User"],
      }),
    }),
    getProducts: build.query({
      query: ({ page, pageSize }) => ({
        url: "/products",
        providesTags: ["Products"],
        method: "GET",
        params: { page, pageSize },
      }),
    }),
    getCartItems: build.query({
      query: (id) => `cart/${id}`,
      providesTags: ["Cart"],
    }),
    updateItemQuantity: build.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: `cart/${userId}`,
        method: "PATCH",
        body: { productId, quantity },
        providesTags: ["Cart"],
      }),
      invalidatesTags: ["Cart"],
    }),
    addItemToCart: build.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: `cart/${userId}`,
        method: "POST",
        body: { productId, quantity },
        providesTags: ["Cart"],
      }),
      invalidatesTags: ["Cart"],
    }),
    removeItemToCart: build.mutation({
      query: ({ userId, productId }) => ({
        url: `cart/${userId}/${productId}`,
        method: "DELETE",
        providesTags: ["Cart"],
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetCartItemsQuery,
  useAddItemToCartMutation,
  useRemoveItemToCartMutation,
  useUpdateItemQuantityMutation
} = api;