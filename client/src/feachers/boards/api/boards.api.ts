import { baseApi } from '../../../app/api/baseApi';
import type { ITask } from '../../../interfaces/task';
import type { ApiResponse } from '../../../interfaces/apiResponse';
import type { IBoard } from '../../../interfaces/board';

export const boardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoards: builder.query<IBoard[], void>({
            query: () => '/boards',
            transformResponse: (response: ApiResponse<IBoard[]>): IBoard[] => response.data,
            providesTags: ['Boards'],
        }),

        getBoardById: builder.query<IBoard, string>({
            query: (boardId) => `/boards/${boardId}`,
            transformResponse: (response: ApiResponse<IBoard>) => response.data,
            providesTags: ['Boards'],
        }),

        getTasksBoardById: builder.query<ITask[], string>({
            query: (boardId) => `/boards/${boardId}/tasks`,
            transformResponse: (response: ApiResponse<ITask[]>): ITask[] => response.data,
            providesTags: (result, error, boardId) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
                    { type: 'Tasks', id: `LIST-${boardId}` },
                    ]
                : [{ type: 'Tasks', id: `LIST-${boardId}` }],
        }),

        createBoard: builder.mutation<IBoard, { name: string; description?: string }>({
            query: (body) => ({
                url: '/boards',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Boards'],
        }),

        updateBoard: builder.mutation<IBoard, { id: string; name: string; description?: string; }>({
            query: ({ id, ...body }) => ({
                url: `/boards/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Boards'],
        }),

        deleteBoard: builder.mutation<void, string>({
            query: (boardId) => ({
                url: `/boards/${boardId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Boards'],
        }),
    }),
});

export const {
    useGetBoardsQuery,
    useGetBoardByIdQuery,
    useGetTasksBoardByIdQuery,
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation,
} = boardsApi;
