import { Outlet, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { ListTasks } from "./ListTasks/ListTasks";

//тут отримаю id проекту з  url, для створення api запиту, щоб отримати всі задачі для відповідного проекту,
// отримаю data і виведу задачі в список через ListTasks, куди прокину data через пропси
export const TasksManager = () => {
    const {projectId} = useParams<{projectId: string}>();
    //const id = Number(projectId);

    return(
        <>
            <h2>ID project: {projectId}</h2>
            <Outlet/>
            <Link to='/projects'>Came Back</Link>
            <ListTasks /> 
        </>
    )
}