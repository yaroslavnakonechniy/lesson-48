import { Outlet, Link } from "react-router-dom"
import { ListTasks } from "./ListTasks"

export const Tasks = () => {
    return(
        <>
            <Outlet/>
            <Link to='/boards'>Came Back</Link>
            <ListTasks /> 
        </>
    )
}
