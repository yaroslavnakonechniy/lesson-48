import { Row, Col, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import { Column } from "./Column/Column";
import { useGetTaskBoardByIdQuery } from "../../../../feachers/boards/api/boards.api";
//Список задач для окремого Борда.

export const ListTasks = () => {
    const {boardId} = useParams<{boardId: string}>();
    const { data, isLoading, error } = useGetTaskBoardByIdQuery(boardId!);

    console.log("Task:Тип данных:", typeof data, "Это массив?", Array.isArray(data), "Значение:", data);//
    
    //useMemo
    const backlog = data?.filter(t => t.workflow.code === "todo");
    const inProgress = data?.filter(t => t.workflow.code === "progress");
    const done = data?.filter(t => t.workflow.code === "done");
    //useMemo

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
                        <Column title="Backlog" color="#f0f0f0" tasks={backlog ?? []} />
                    </Col>

                    <Col span={8}>
                        <Column title="In Progress" color="#e6f4ff" tasks={inProgress ?? []} />
                    </Col>

                    <Col span={8}>
                        <Column title="Done" color="#f6ffed" tasks={done ?? []} />
                    </Col>
                </Row>
            </div>
        </>
    )
}
