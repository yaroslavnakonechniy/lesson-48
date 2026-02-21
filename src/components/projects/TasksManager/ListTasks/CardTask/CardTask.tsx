import { Link, useParams } from "react-router-dom"
import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import type { CardTaskProps } from "../../../../../types/task.type"
//Картка задачі з іменем, яку можна буде відкрити для повного ознайомлення з задачею, через поп ап.
//

export const CardTask = ({card}:CardTaskProps) => {
    const {projectId} = useParams<{projectId: string}>();
    return(
        <>
            <Card 
                title={card.title} 
                extra={<Link to={`/project/${projectId}/tasks/${card.id}`}>More</Link>} 
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

