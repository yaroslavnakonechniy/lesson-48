import { Link } from "react-router-dom"
import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import type { CardTaskProps } from "../../../../../types/task.type"

export const CardTask = ({card}:CardTaskProps) => {
    return(
        <>
            <Card 
                title={card.title} 
                extra={<Link to={`/tasks/${card.id}`}>More task</Link>} 
                variant="borderless"
                style={{
                    width: "100%",
                    height: "150px",
                    marginBottom: "10px",
                    padding:"5px",
                    overflow: "hidden"
                    }} 
                >
                <Paragraph>{card.description}</Paragraph>
            </Card>
        </>
    )
}

