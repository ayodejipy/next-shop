import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"
import type { User } from "@/types/user"
import type { IProduct } from "@/types/product";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/",
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    tagTypes: ['IProduct'],
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
            query: () => 'product/',
            providesTags: ['IProduct']
        }),
    }),
});

export const { useGetUserByIdQuery, useAddUserMutation, useGetProductsQuery, util: { getRunningQueriesThunk }  } = apiSlice

// export endpoints to be used in ssr
export const { getProducts } = apiSlice.endpoints