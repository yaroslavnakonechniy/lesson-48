import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {  useDeleteBoardMutation } from "../feachers/boards/api/boards.api"

export const useDeleteBoard = () => {
    const navigate = useNavigate();
    const [deleteBoard] = useDeleteBoardMutation();

    const performDelete = async (boardId: string) => {
        try {
            await deleteBoard(boardId).unwrap();
            navigate("/boards");
            message.success("Project deleted successfully");
        } catch (error) {
            message.error("Failed to delete project");
        }
    };

    return { performDelete };
};
