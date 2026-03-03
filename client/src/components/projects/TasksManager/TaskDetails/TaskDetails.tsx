import { useParams } from "react-router-dom"
import { Descriptions, Divider, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const {Item} = Descriptions;
//Картка з даними про 1 задачу проекта, для перегляду одної задачі. Ця карта планується виводитися через поп-ап
//також ця картка планується використовуватися для редагування 1 задачі, прикліку на edit.

export const TaskDetails = () => {
    const {taskId} = useParams<{taskId: string}>();
    const {projectId} = useParams<{projectId: string}>();

    //Витягуємо по id через api, дані про 1 задачу

    return(
        <>
            <Divider />
                <Descriptions title="Task Info" style={{ padding: "40px" }}>
                    <Item label="NameTask">Create Header</Item>
                    <Item label="TaskID">{taskId}</Item>
                    <Item label="AuthorId">2</Item>
                    <Item label="DescriptionTask">This project from Hillel company. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem unde repellendus, voluptates natus accusamus illum, dicta, aliquam quibusdam consectetur laboriosam non dignissimos illo? Nesciunt blanditiis cum libero iure assumenda eligendi?
                        Dolor earum officiis perferendis totam nostrum aut quia fugiat eveniet quae accusamus nihil voluptatem vitae inventore, quidem iste quibusdam enim? Molestias, libero? Possimus vitae quia in dolor hic maiores veniam?
                        At excepturi laborum esse. consequatur magnam.
                    </Item>
                </Descriptions>
                    <Space style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<EditOutlined />} size="small">
                    <Link to={`/project/${projectId}/tasks/${taskId}/edit`}>Edit Task</Link>
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small">
                    <Link to={`/project/${taskId}/delete`}>Delete Task</Link>
                    </Button>
                    <Button icon={<ArrowLeftOutlined />} size="small">
                    <Link to={`/project/`}>Back</Link>
                    </Button>
                    <Button type="dashed" size="small">
                    <Link to={`/project/${taskId}/tasks`}>Open Tasks</Link>
                    </Button>
                </Space>
            <Divider />
        </>
    )
}