import { useGetBoardsQuery } from '../../../feachers/boards/api/boards.api';
import { Row, Spin, Alert } from "antd";
import { CardProject } from "./cardProject/CardProject"
    
export const ListProjects = () => {
    const { data, isLoading, error } = useGetBoardsQuery();

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    if (error) {
        return <Alert type="error" message="Failed to load boards" />;
    }

    console.log("Тип данных:", typeof data, "Это массив?", Array.isArray(data), "Значение:", data);//

    return (
        <div style={{ padding: "40px" }}>
            <Row gutter={[24, 24]}>
                {data?.map((board) => (
                    <CardProject key={board.id} board={board} />
                ))}
            </Row>
        </div>
    );
}
