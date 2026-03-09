import { Link } from "react-router-dom"
import { Card, Popconfirm, Tooltip  } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Paragraph from "antd/es/typography/Paragraph";
import type { CardTaskProps } from "../../../../types/task.type";
import { useDeleteTask } from "../../../../hooks/UseDeleteTask";
import { useUpdateTaskWorkflowMutation } from "../../api/tasks.api"

export const CardTask = ({card}:CardTaskProps) => {
    const { performDelete, isDeleting } = useDeleteTask();
    const [updateWorkflow, { isLoading: isUpdating }] = useUpdateTaskWorkflowMutation();

    const handleMove = (newStatus: string) => {
        if (card.id && card.boardId) {
            updateWorkflow({ 
                id: card.id, 
                workflow: newStatus, 
                boardId: card.boardId 
            });
        }
    };

    const statuses = ['todo', 'progress', 'done'];
    const currentIndex = statuses.indexOf(card.workflow.code);

    const handleDelete = () => {
        if (card.id) performDelete(card.id);
    };

    return(
        <>
            <Card 
                title={card.title} 
                variant="borderless"
                styles={{
                    header: {
                        backgroundColor: 'orange', // світло-сірий фон
                        borderBottom: '1px solid #f0f0f0',
                        minHeight: '40px',
                        padding: '0 12px',
                    },
                    title: {
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#1890ff', // синій колір для заголовка
                    },
                    body: {
                        padding: '12px',
                    }
                }}
                actions={[
                    currentIndex > 0 ? (
                        <Tooltip title="Back" key="back">
                            <ArrowLeftOutlined 
                                style={{ color: 'black' }}
                                disabled={isUpdating}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isUpdating) handleMove(statuses[currentIndex - 1]);
                                }}
                            />
                        </Tooltip>
                    ) : <div key="spacer-left" />,

                    <Link key="view" to={`/tasks/${card.id}`}>
                        <EyeOutlined style={{ color: 'blue' }} />
                    </Link>,

                    <Link key="edit" to={`/tasks/${card.id}/edit`}>
                        <EditOutlined style={{ color: 'black' }} />
                    </Link>,

                    <Popconfirm
                        key="delete"
                        title="Delete task?"
                        description="Are you sure you want to delete this task?"
                        onConfirm={handleDelete}
                        okButtonProps={{ loading: isDeleting }}
                        disabled={isDeleting}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>,

                    currentIndex < statuses.length - 1 ? (
                        <Tooltip title="Next" key="forward">
                            <ArrowRightOutlined 
                                style={{ color: 'black' }}
                                disabled={isUpdating}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isUpdating) handleMove(statuses[currentIndex + 1]);
                                }}
                            />
                        </Tooltip>
                    ) : <div key="spacer-right" />,
                ]} 
            >
                <Paragraph>{card.description}</Paragraph>
            </Card>
        </>
    )
}
