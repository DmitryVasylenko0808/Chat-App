import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CHATS_API_URL } from "../../contants/api";
import { GetChatByMembersDto } from "./dto/GetChatByMembersDto";

export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: CHATS_API_URL,
        prepareHeaders: (headers) => {
            headers.set("authorization", `${sessionStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        getChatByMembers: builder.query<GetChatByMembersDto, string>({
            query: (receiverId) => `?receiver_id=${receiverId}`
        })
    })
});

export const { useGetChatByMembersQuery } = chatsApi;