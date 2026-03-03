import Title from "antd/es/typography/Title"
import type { ColumnProps } from "../../../../../types/column.types"
import { CardTask } from "../CardTask/CardTask"


export const Column = ({title, color, tasks}:ColumnProps) => {
    return(
        <>
            <div style={{
                background: color,
                padding: 16,
                borderRadius: 8,
                height: 800,
                overflow: "auto",
                
                }}>

                <Title level={4}>{title}</Title>

                {tasks.map(task => (
                    <CardTask key={task.id} card={task} />
                ))}
            </div>
        </>
    )
}


