import { Descriptions, Divider, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Spin, Alert } from "antd";
import { useParams, Link } from "react-router-dom";
import { useGetBoardByIdQuery } from '../../../feachers/boards/api/boards.api';

const {Item} = Descriptions;

export const ProjectDetailes = () => {
    const { boardId } = useParams<{ boardId: string }>();
    const { data, isLoading, error } = useGetBoardByIdQuery(boardId!);

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    if (error) {
        return <Alert type="error" message="Failed to load boards" />;
    }

    return(
        <>
            <Divider />
                <Descriptions title="Project Info" style={{ padding: "40px" }}>
                    <Item label="NameProject">{data?.name} </Item>
                    <Item label="ProjectId">{data?.id}</Item>
                    <Item label="AuthorId">{data?.authorId}</Item>
                    <Item label="DescriptionProject">{data?.description}</Item>
                </Descriptions>
                    <Space style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<EditOutlined />} size="small">
                    <Link to={`/boards/${boardId}/edit`}>Edit Project</Link>
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small">
                    <Link to={`/boards/${boardId}/delete`}>Delete Project</Link>
                    </Button>
                    <Button icon={<ArrowLeftOutlined />} size="small">
                    <Link to={`/boards/`}>Back</Link>
                    </Button>
                    <Button type="dashed" size="small">
                    <Link to={`/boards/${boardId}/tasks`}>Open Tasks</Link>
                    </Button>
                </Space>
            <Divider />

        </>
    )
}
