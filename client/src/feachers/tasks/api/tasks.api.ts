import { baseApi } from "../../../app/api/baseApi";
import type { ApiResponse } from "../../../types/apiResponse.type";
import type { ITask } from "../../../types/task.type";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTaskById: builder.query<ITask, string>({
            query: (taskId) => `/tasks/${taskId}`,
            transformResponse: (response: ApiResponse<ITask>) => response.data,
            providesTags: (result, error, id) => [{ type: 'Tasks', id }],            
        }),

        createTask: builder.mutation<ITask, {title: string; description: string; workflow: string; boardId: string}>({
            query: (body) => ({
                url: '/tasks',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { boardId }) => [
                { type: 'Tasks', id: `LIST-${boardId}` },
            ],
        }),

        updateTask: builder.mutation<ITask, {id: string; title: string; description: string; boardId: string}>({
            query: ({id, ...body}) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id, boardId }) => [
                { type: 'Tasks', id },
                { type: 'Tasks', id: `LIST-${boardId}` },
            ],
        }),
        
        updateTaskWorkflow: builder.mutation<ITask, { id: string; workflow: string; boardId: string }>({
            query: ({ id, workflow }) => ({
                url: `/tasks/${id}/workflow`,
                method: 'PUT',
                body: {workflow},
            }),
            invalidatesTags: (result, error, { id, boardId }) => [
                { type: 'Tasks', id },
                { type: 'Tasks', id: `LIST-${boardId}` },
            ],
        }),

        deleteTask: builder.mutation<void, string>({
            query: ( id ) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    })
});

export const {
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTaskWorkflowMutation,
    useDeleteTaskMutation,
} = tasksApi;
