import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDeleteTaskMutation } from "../feachers/tasks/api/tasks.api"

export const useDeleteTask = () => {
    const navigate = useNavigate();
    const [deleteTask, { isLoading }] = useDeleteTaskMutation();

    const performDelete = async (taskId: string, boardId?: string) => {
        try {
            await deleteTask(taskId).unwrap();

            message.success("Task deleted successfully");
            navigate(`/boards/${boardId}/tasks`);
            
        } catch (error) {
            message.error("Failed to delete task");
        }
    };

    return { performDelete, isDeleting: isLoading };
};
