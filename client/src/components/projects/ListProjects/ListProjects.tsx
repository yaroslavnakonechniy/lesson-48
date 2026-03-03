import { Row } from "antd";
import { CardProject } from "./cardProject/CardProject"
//Список Проектів
const  projects = [
    {id:1, name:"Project #1", description: "This project from Hillel company", authorId:1},
    {id:2, name:"Project #2", description: "This project about CARS", authorId:1},
    {id:3, name:"Project #3", description: "This project about creating project", authorId:1},
    {id:3, name:"Project #3", description: "This project about creating project", authorId:1},
    {id:3, name:"Project #3", description: "This project about creating project", authorId:1},
    {id:3, name:"Project #3", description: "This project about creating project", authorId:1}
];
//тут ще буде приходити data з api про проекти, data передається в <CardProject /> де і відображатимуться картки проектів

/* Boards:
        GET: /api/v1/boards
        GET: /api/v1/boards/:boardId
        POST: /api/v1/boards
        PUT: /api/v1/boards/:boardId
        DELETE: /api/v1/boards/:boardId
 */
export const ListProjects = () => {
    return(
        <>
            <div style={{ padding: "40px" }}>
                <Row gutter={[24, 24]}>
                    {
                        projects.map((project) => (
                            <CardProject key={project.id} project={project}/>
                        ))
                    }
                </Row>
            </div>

        </>
    )
}