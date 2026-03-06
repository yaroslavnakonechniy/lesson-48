import { Descriptions, Divider, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Spin, Alert, Popconfirm } from "antd";
import { useParams, Link } from "react-router-dom";
import { useGetBoardByIdQuery } from '../../api/boards.api';
import { useDeleteBoard } from "../../../../hooks/UseDeleteBoard"


const {Item} = Descriptions;

export const BoardDetailes = () => {
    const { boardId } = useParams<{ boardId: string }>();
    const { data, isLoading, error } = useGetBoardByIdQuery(boardId!);
    const { performDelete } = useDeleteBoard();

    if (isLoading) {
        return <Spin size="large" style={{ marginTop: 100 }} />;
    }

    if (error) {
        return <Alert type="error" message="Failed to load boards" />;
    }

    const handleDelete = () => {
        if (boardId) performDelete(boardId);
    };

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
                    <Popconfirm
                        title="Delete project?"
                        description="Are you sure you want to delete this project?"
                        onConfirm={handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small">
                            Delete Project
                        </Button>
                    </Popconfirm>
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
