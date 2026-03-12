import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Col, Popconfirm } from "antd";
import { FolderOpenOutlined } from '@ant-design/icons';
import Paragraph from "antd/es/typography/Paragraph";
import Card from "antd/es/card/Card";
import { useDeleteBoard } from "../../../../hooks/UseDeleteBoard"
import type { CardBoardProps } from "../../../../types/cards/boardProps"

export const CardBoard = ({board}: CardBoardProps) => {
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
                    styles={{
                        header: {
                            backgroundColor: 'rgb(151 162 173)',
                            borderBottom: '1px solid #f0f0f0',
                            minHeight: '40px',
                            padding: '0 12px',
                        },
                    }} 
                    actions={[
                        <Link to={`/boards/${board.id}`}>
                            <EyeOutlined key="view" style={{ color: 'blue' }}/>
                        </Link>,
                        <Link to={`/boards/${board.id}/edit`}>
                            <EditOutlined key="edit" style={{ color: 'black' }} />
                        </Link>,
                        <Link to={`/boards/${board.id}/tasks`}>
                            <FolderOpenOutlined style={{ color: 'black' }}/>
                        </Link>
                        ,
                        <Popconfirm
                            title="Delete Board?"
                            description="Are you sure you want to delete this Board?"
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
                </Card>
            </Col>
        </>
    )
}
