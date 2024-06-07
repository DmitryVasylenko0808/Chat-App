import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USERS_API_URL } from "../../contants/api";
import { SearchUsersDto } from "./dto/SearchUserDto";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USERS_API_URL,
        prepareHeaders: (headers) => {
            headers.set("authorization", `${sessionStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        searchUsers: builder.query<SearchUsersDto, string>({
            query: (value) => `/search?value=${value}`
        })
    })
});

export const { useLazySearchUsersQuery } = usersApi;