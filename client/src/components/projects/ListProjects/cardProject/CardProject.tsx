import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import { Col } from "antd";
import type { CardProjectProps } from "../../../../types/project.types";
import Paragraph from "antd/es/typography/Paragraph";

//Тут картка окремого проекту, в якій буде опинасий проект 

export const CardProject = ({project}: CardProjectProps) => {
    return(
        <>
            <Col xs={24} sm={12} md={8}>
                <Card title={project.name} extra={<Link to={`/project/${project.id}`}>More</Link>} variant="borderless">

                    <Paragraph>{project.description}</Paragraph>
                    <Link to={`/project/${project.id}/tasks`}>OpenTask</Link>

                </Card>
            </Col>
        </>
    )
}