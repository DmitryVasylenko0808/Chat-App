import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_API_URL } from "../../contants/api";
import { SignInDto } from "./dto/SingInDto";
import { SignUpDto } from "./dto/SignUpDto";
import { GetMeDto } from "./dto/GetMeDto";

type SignInParams = {
    login: string;
    password: string;
};

type SignUpParams = {
    login: string;
    password: string;
    firstName: string;
    secondName: string;
    avatarFile?: File;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_API_URL,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        signIn: builder.mutation<SignInDto, SignInParams>({
            query: body => ({
                url: "/sign-in",
                method: "POST",
                body
            })
        }),
        signUp: builder.mutation<SignUpDto, SignUpParams>({
            query: body => {
                const formData = new FormData();

                Object.entries(body).forEach(([key, value]) => formData.append(key, value));

                return {
                    url: "/sign-up",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            }
        }),
        getMe: builder.query<GetMeDto, void>({
            query: () => "/me" 
        })
    })
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useLazyGetMeQuery
} = authApi;