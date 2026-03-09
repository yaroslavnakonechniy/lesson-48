import { Outlet, Link } from "react-router-dom"
import { ListTasks } from "./ListTasks"

export const TasksManager = () => {
    return(
        <>
            <Outlet/>
            <Link to='/boards'>Came Back</Link>
            <ListTasks /> 
        </>
    )
}
