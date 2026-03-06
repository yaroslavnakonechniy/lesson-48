import { Outlet } from "react-router-dom"
import { ListBoard } from "./ListBoard"

export const Boards = () => {
    return(
        <>
            <div>
                <Outlet/>
                <ListBoard />
            </div>
        </>
    )
}
