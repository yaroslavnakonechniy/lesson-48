/* import { api } from './apiSlice';

export interface Board {
  id: string; //string
  name: string;
  description?: string;
  authorId: string;
}

export const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      //query: () => '/boards',
      query: () => '/boards',
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
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi; */