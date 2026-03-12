import { baseApi } from '../../../app/api/baseApi';
import type { User, LoginDto, RegisterDto } from '../../../interfaces/auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<{ data: User }, LoginDto>({
            query: (body) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        signUp: builder.mutation<{ data: User }, RegisterDto>({
            query: (body) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body,
            }),
        }),

        signOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/sign-out',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        getMe: builder.query<{ data: User }, void>({
            query: () => '/auth/me',
            providesTags: ['Auth'],
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useGetMeQuery,
} = authApi;
