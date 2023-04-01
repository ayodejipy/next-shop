import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { User } from "@/types/user";
import type { IProduct, ICartObject } from "@/types/product";

// type CartData = {ownerId: string } & ICartProduct

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api/",
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: ["IProduct"],
    endpoints: (builder) => ({
        // takes response and payload type
        getUserById: builder.query<User, string | number>({
            query: (id) => `auth/user/${id}`,
        }),
        addUser: builder.mutation<void, User>({
            query: (user) => ({
                url: "auth",
                method: "POST",
                body: user,
            }),
        }),
        getProducts: builder.query<IProduct[], void>({
            query: () => "product/",
            providesTags: ["IProduct"],
        }),
        getProduct: builder.query<IProduct, string | number>({
            query: (id) => `product/${id}`,
            providesTags: ["IProduct"],
        }),
        syncCartToUser: builder.mutation<void, ICartObject>({
            query: (cart) => ({
                url: "product/syncCartToUser",
                method: "POST",
                body: cart,
            }),
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useAddUserMutation,
    useSyncCartToUserMutation,
    useGetProductsQuery,
    useGetProductQuery,
    util: { getRunningQueriesThunk },
} = apiSlice;

// export endpoints to be used in ssr
export const { getProducts, getProduct } = apiSlice.endpoints;
