import { baseApi } from '../../../app/api/baseApi';
import type { ITask } from '../../../types/task.type';
import type { ApiResponse } from '../../../types/apiResponse.type';

export interface Board {
  id: string;
  name: string;
  description?: string;
  authorId: string;
}

export const boardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => '/boards',
      transformResponse: (response: ApiResponse<Board[]>): Board[] => response.data,
      providesTags: ['Boards'],
    }),

    getBoardById: builder.query<Board, string>({
      query: (boardId) => `/boards/${boardId}`,
      transformResponse: (response: ApiResponse<Board>) => response.data,
      providesTags: ['Boards'],
    }),

    getTaskBoardById: builder.query<ITask[], string>({
      query: (boardId) => `/boards/${boardId}/tasks`,
      transformResponse: (response: ApiResponse<ITask[]>): ITask[] => response.data,
      providesTags: ['Boards'],
    }),

    createBoard: builder.mutation<Board, { name: string; description?: string }>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),

    updateBoard: builder.mutation<Board, { id: string; name: string; description?: string; }>({
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
  useGetTaskBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
