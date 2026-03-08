import { Outlet, useParams } from "react-router-dom"
import { Descriptions, Divider, Space, Button, Spin, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useGetTaskByIdQuery } from "../../api/tasks.api";

const {Item} = Descriptions;

export const TaskDetails = () => {
    const {taskId} = useParams<{taskId: string}>();
    
    const { data, isLoading, isError } = useGetTaskByIdQuery(taskId!);
    //const { performDelete } = useDeleteBoard();

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    if (isError) {
        return <Alert type="error" message="Failed to load boards" />;
    }

/*     const handleDelete = () => {
        if (taskId) performDelete(boardId);
    }; */

    return(
        <>
            <Divider />
                <Outlet/>
                <Descriptions title="Task Info" style={{ padding: "40px" }}>
                    <Item label="TaskTitle">{data?.title}</Item>
                    <Item label="TaskWorkflow">{data?.workflow.label}</Item>
                    <Item label="TaskDescription">{data?.description}</Item>
                </Descriptions>
                    <Space style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<EditOutlined />} size="small">
                    <Link to={`/tasks/${taskId}/edit`}>Edit Task</Link>
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small">
                    <Link to={`/tasks/${taskId}/delete`}>Delete Task</Link>
                    </Button>
                    <Button icon={<ArrowLeftOutlined />} size="small">
                    <Link to={`/boards/`}>Back</Link>
                    </Button>
                </Space>
            <Divider />
        </>
    )
}
