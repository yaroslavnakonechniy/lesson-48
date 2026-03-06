import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../api/boards.api";
import { FormBoard } from "../components/form/Form";

export const EditBoardPage = () => {
    const { boardId } = useParams();

    const { data, isLoading } = useGetBoardByIdQuery(boardId!);

    if (isLoading) return "Loading...";

    return <FormBoard board={data} mode="edit" />;
};