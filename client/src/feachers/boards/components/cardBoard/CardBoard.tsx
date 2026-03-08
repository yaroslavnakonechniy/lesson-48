import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Col, Popconfirm } from "antd";
import type { Board } from "../../api/boards.api";
import Paragraph from "antd/es/typography/Paragraph";
import { useDeleteBoard } from "../../../../hooks/UseDeleteBoard"

//Тут картка окремого проекту, в якій буде опинасий проект 
interface CardProjectProps {
    board: Board;
}

export const CardBoard = ({board}: CardProjectProps) => {
        const { performDelete } = useDeleteBoard();

        const handleDelete = () => {
            if (board.id) performDelete(board.id);
        };
        
    return(
        <>
            <Col xs={24} sm={12} md={8}>
                <Card 
                    title={board.name} 
                    variant="borderless" 
                    actions={[
                        <Link to={`/boards/${board.id}`}>
                            <EyeOutlined key="view" />
                        </Link>
                        ,
                        <Link to={`/boards/${board.id}/edit`}>
                            <EditOutlined key="edit" />
                        </Link>
                        ,
                        <Popconfirm
                            title="Delete project?"
                            description="Are you sure you want to delete this project?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined key="delete" style={{ color: 'red' }} />
                        </Popconfirm>
                        ,
                    ]}
                >
                    <Paragraph>{board.description}</Paragraph>
                    <Link to={`/boards/${board.id}/tasks`}>OpenTasks</Link>

                </Card>
            </Col>
        </>
    )
}
