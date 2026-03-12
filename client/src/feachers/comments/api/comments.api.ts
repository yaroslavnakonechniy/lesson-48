import { baseApi } from '../../../app/api/baseApi'
import type { ApiResponse } from '../../../interfaces/apiResponse';
import type { IComment } from '../../../interfaces/comment';

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsTaskById: builder.query<IComment[], string>({
            query: (taskId) => `/tasks/${taskId}/comments`,
            transformResponse: (response: ApiResponse<IComment[]>): IComment[] => response.data,
            providesTags: (result, error, taskId) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Comments' as const, id })),
                    { type: 'Comments', id: `LIST-${taskId}` },
                    ]
                : [{ type: 'Comments', id: `LIST-${taskId}` }],
        }), 
        //
        createComment: builder.mutation<IComment, { message: string; taskId: string }>({
            query: (body) => ({
                url: '/comments',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { taskId }) => [{ type: 'Comments', id: `LIST-${taskId}` }],
        }),

        updateComment: builder.mutation<IComment, { id: string; message: string } >({
            query: ( { id, message } ) => ({
                url: `/comments/${id}`,
                method: 'PUT',
                body: { message },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Comments', id },
            ],
        }),

        deleteComment: builder.mutation<void, string>({
            query: (commentId) => ({
                url: `/comments/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const {
    useGetCommentsTaskByIdQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentsApi;
