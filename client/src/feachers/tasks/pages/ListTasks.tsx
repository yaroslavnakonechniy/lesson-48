import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Row, Col, Spin, Alert } from "antd";
import { Column } from "../components/column/Column";
import { useGetTasksBoardByIdQuery } from "../../boards/api/boards.api";
//Список задач для окремого Борда.

export const ListTasks = () => {
    const {boardId} = useParams<{boardId: string}>();
    const { data, isLoading, error } = useGetTasksBoardByIdQuery(boardId!);

    console.log("Task:Тип данных:", typeof data, "Это массив?", Array.isArray(data), "Значение:", data);//
    
    const columns = useMemo(() => {
        return {
            todo: data?.filter(t => t.workflow?.code === "todo") ?? [],
            progress: data?.filter(t => t.workflow?.code === "progress") ?? [],
            done: data?.filter(t => t.workflow?.code === "done") ?? [],
        }
    }, [data])

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    if (error) {
        return <Alert type="error" message="Failed to load tasks of board" />;
    }

    return(
        <>
            <div style={{ padding: 40 }}>
                <Row gutter={16} align="top">

                    <Col span={8}>
                        <Column title="Todo" color="#f0f0f0" tasks={columns.todo ?? []} />
                    </Col>

                    <Col span={8}>
                        <Column title="In Progress" color="#e6f4ff" tasks={columns.progress ?? []} />
                    </Col>

                    <Col span={8}>
                        <Column title="Done" color="#f6ffed" tasks={columns.done ?? []} />
                    </Col>
                </Row>
            </div>
        </>
    )
}
