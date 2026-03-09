import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "../layouts/layout/Layout";
import { Boards } from "../feachers/boards/pages/Boards";
import { TasksManager } from "../feachers/tasks/pages/TasksManager";
import { BoardDetailes } from "../feachers/boards/components/boardDetails/BoardDetails";
import { TaskDetails } from "../feachers/tasks/components/taskDetails/TaskDetails";
import { FormPopUp } from "../feachers/boards/components/form/CreateBoard";
import { ProtectedRoute } from "../feachers/auth/components/ProtectedRoute";
import { LoginPage } from "../feachers/auth/pages/LoginPages";
import { CreateType } from "../interfaces/createAction";
import { EditBoardPage } from "../feachers/boards/pages/EditBoardPage";
import { EditTaskPage } from "../feachers/tasks/pages/EditTaskPage";

export const router = createBrowserRouter([
    {   
        path: "/",
        Component: LayoutPage,
        children: [
            {
                element: <ProtectedRoute />,   // МІДДЛВАР
            },
            {
                path: "boards",
                Component: Boards,
                handle: {createType: CreateType.BOARD},
                children: [
                    {
                        path: "create",
                        Component: FormPopUp
                    },
                    {
                        path: ':boardId',
                        children: [
                            {
                                index: true,
                                Component: BoardDetailes,
                            },
                            {
                                path: 'edit',
                                Component: EditBoardPage,
                            },
                            {
                                path: 'tasks',
                                handle: {createType: CreateType.TASK},
                                Component: TasksManager,
                                children: [
                                    {
                                        path: 'create',
                                        handle: {createType: CreateType.TASK},
                                        Component: FormPopUp,
                                    }
                                ]
                            },
                            
                        ]
                    },
                ]
            },
            {
                path: "tasks/:taskId",
                handle: {createType: CreateType.TASK},
                Component: TaskDetails,
                children: [
                    {
                        path: "edit",     
                        Component: EditTaskPage, 
                    }
                ]
            },
/*             {
                path: "tasks/create",
                handle: {createType: CreateType.TASK},
                Component: FormPopUp,
            } */
        ]

    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
])
