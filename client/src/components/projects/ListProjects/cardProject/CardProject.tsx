import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import { Col } from "antd";
import type { Board } from "../../../../feachers/boards/api/boards.api";
import Paragraph from "antd/es/typography/Paragraph";

//Тут картка окремого проекту, в якій буде опинасий проект 
interface CardProjectProps {
    board: Board;
}

export const CardProject = ({board}: CardProjectProps) => {
    return(
        <>
            <Col xs={24} sm={12} md={8}>
                <Card title={board.name} extra={<Link to={`/boards/${board.id}`}>More</Link>} variant="borderless">

                    <Paragraph>{board.description}</Paragraph>
                    <Link to={`/boards/${board.id}/tasks`}>OpenTask</Link>

                </Card>
            </Col>
        </>
    )
}