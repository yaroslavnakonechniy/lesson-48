import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBoardsQuery } from "../api/boards.api";
import { Row, Spin, Alert } from "antd";
import { CardBoard } from "../components/cardBoard/CardBoard"
import type { IBoard } from "../../../interfaces/board";

export const ListBoard = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetBoardsQuery();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate("/boards/create"); 
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error, navigate]);

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    return (
        <div style={{ padding: "40px" }}>
            <Row gutter={[24, 24]}>
                {data?.map((board: IBoard) => (
                    <CardBoard key={board.id} board={board} />
                ))}
            </Row>
        </div>
    );
}
