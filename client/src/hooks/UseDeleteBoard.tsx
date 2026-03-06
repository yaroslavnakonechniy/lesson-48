import { useNavigate } from "react-router-dom";
import {  useDeleteBoardMutation } from "../feachers/boards/api/boards.api"

export const useDeleteBoard = () => {
    const navigate = useNavigate();
    const [deleteBoard] = useDeleteBoardMutation();

    const performDelete = async (boardId: string) => {
        try {
            await deleteBoard(boardId).unwrap();
            navigate("/boards");
        } catch (error) {
            console.error("Delete failed:", error);
        // Тут можна додати toast-сповіщення про помилку
        }
    };

    return { performDelete };
};
