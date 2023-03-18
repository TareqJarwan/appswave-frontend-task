import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: [
        "User",
        "Products"
    ],
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => "products",
            providesTags: ["Products"]
        }),
        getUser: build.query({
            query: (id) => "user",
            providesTags: ["User"]
        })
    })
});

export const {
    useGetProductsQuery,
    useGetUserQuery
} = api;