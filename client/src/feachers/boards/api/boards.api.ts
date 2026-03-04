import { baseApi } from '../../../app/api/baseApi';

export interface Board {
  id: string;
  name: string;
  description?: string;
  authorId: string;
}

interface BoardsResponse {
  data: any[];
  error: any;
}

export const boardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => '/boards',
      transformResponse: (response: BoardsResponse): Board[] => response.data,
      providesTags: ['Boards'],
    }),

    getBoardById: builder.query<Board, string>({
      query: (boardId) => `/boards/${boardId}`,
      transformResponse: (response: { data: Board }) => response.data,
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
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
