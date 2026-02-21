
import { Outlet } from "react-router-dom"
import { ListProjects } from "./ListProjects/ListProjects"
// список з карток проектів, який матиме кнопку open/чи відкриватися по кліку на картку, для перегляду через попап весь описаний проект.

export const Projects = () => {
    return(
        <>
            <h1>Projects</h1>
            <div>
                <Outlet/>
                <ListProjects />
                
            </div>
        </>
    )
}