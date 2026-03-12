import { Outlet } from "react-router-dom"
import { ListComments } from "./ListComments"


export const Comments = () => {
    return (
        <>
            <hr />
            you on comments page
            <hr />
            <Outlet />
            <ListComments />
        </>
    )
}