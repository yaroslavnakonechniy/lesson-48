import { Link } from "react-router-dom"
import { Card, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import Paragraph from "antd/es/typography/Paragraph";
import type { CardTaskProps } from "../../../../types/task.type";
import { useDeleteTask } from "../../../../hooks/useDeleteTask"

export const CardTask = ({card}:CardTaskProps) => {
    const { performDelete, isDeleting } = useDeleteTask();

    const handleDelete = () => {
        if (card.id) performDelete(card.id);
    };

    return(
        <>
            <Card 
                title={card.title} 
                variant="borderless"
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding:"5px",
                }}
                actions={[
                    <Link key="view" to={`/tasks/${card.id}`}>
                    <EyeOutlined />
                    </Link>,
                    <Link key="edit" to={`/tasks/${card.id}/edit`}>
                    <EditOutlined />
                    </Link>,
                    <Popconfirm
                        key="delete"
                        title="Delete task?"
                        description="Are you sure?"
                        onConfirm={handleDelete}
                        okButtonProps={{ loading: isDeleting }}
                        disabled={isDeleting}
                        okText="Yes"
                        cancelText="No"
                    >
                    <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>,
                ]} 
            >
                <Paragraph>{card.description}</Paragraph>
            </Card>
        </>
    )
}

