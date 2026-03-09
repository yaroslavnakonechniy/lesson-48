import { useParams } from "react-router-dom";
import { useGetTaskByIdQuery } from "../api/tasks.api"
import { FormTask } from "../components/form/Form";

export const EditTaskPage = () => {
    const { taskId } = useParams();
    const { data, isLoading } = useGetTaskByIdQuery(taskId!);

    if (isLoading) return "Loading...";

    return <FormTask task={data} mode="edit" />;
};
