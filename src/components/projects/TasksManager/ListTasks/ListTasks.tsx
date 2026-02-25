import { Row } from "antd"
import { Col } from "antd";
import { Column } from "./Column/Column";
import type { ITask } from "../../../../types/task.type";
//Список задач для окремого проекту.

/*
Tasks:
    id
    title
    description
    workflow
    boardId
    authorId 
*/

const cards: ITask[] = [
    { id:1, title: "Create headerdsgggdsgdsgdsgdsgdsg", description:"Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.", workflow: "backlog", boardId: 1, authorId: 1 },
    { id:2, title: "Create main",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "backlog", boardId: 1, authorId: 2 },
    { id:3, title: "Create footer sadfdsfgdsgfdsg",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "done", boardId: 1, authorId: 3 },
    { id:4, title: "Create menu",description:"Lorem ipsum dolorLorem ipsum dolor sit amet consectetur. sit amet consectetur.", workflow: "inProgress", boardId: 1, authorId: 4 },
    { id:5, title: "Create buttons for menu",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "inProgress", boardId: 5, authorId: 5 },
    { id:6, title: "Create cardProject",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "done", boardId: 6, authorId: 6 },
    { id:7, title: "Create main",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "done", boardId: 1, authorId: 2 },
    { id:8, title: "Create footer",description:"LoremLorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit  ipsum dolor sit amet consectetur.", workflow: "review", boardId: 1, authorId: 3 },
    { id:9, title: "Create menu",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "done", boardId: 1, authorId: 4 },
    { id:10, title: "Create buttons for menu",description:"Lorem ipsum Lorem ipsum dolor sit amet consectetur.dolor sit amet consectetur.", workflow: "inProgress", boardId: 5, authorId: 5 },
    { id:11, title: "Create cardProject",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "inProgress", boardId: 6, authorId: 6 },
    { id:11, title: "Create cardProject",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "inProgress", boardId: 6, authorId: 6 },
    { id:11, title: "Create cardProject",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "inProgress", boardId: 6, authorId: 6 },
    { id:11, title: "Create cardProject",description:"Lorem ipsum dolor sit amet consectetur.", workflow: "inProgress", boardId: 6, authorId: 6 },
]

export const ListTasks = () => {

    const backlog = cards.filter(t => t.workflow === "backlog");
    const inProgress = cards.filter(t => t.workflow === "inProgress");
    const done = cards.filter(t => t.workflow === "done");

    return(
        <>
            <div style={{ padding: 40 }}>
                <Row gutter={16} align="top">

                    <Col span={8}>
                        <Column title="Backlog" color="#f0f0f0" tasks={backlog} />
                    </Col>

                    <Col span={8}>
                        <Column title="In Progress" color="#e6f4ff" tasks={inProgress} />
                    </Col>

                    <Col span={8}>
                        <Column title="Done" color="#f6ffed" tasks={done} />
                    </Col>

                </Row>
            </div>
        </>
    )
}