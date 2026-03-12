import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "../layouts/layout/Layout";
import { Boards } from "../feachers/boards/pages/Boards";
import { Tasks } from "../feachers/tasks/pages/Tasks";
import { BoardDetailes } from "../feachers/boards/components/boardDetails/BoardDetails";
import { TaskDetails } from "../feachers/tasks/components/taskDetails/TaskDetails";
import { FormPopUp } from "../feachers/boards/components/form/CreateBoard";
import { ProtectedRoute } from "../feachers/auth/components/ProtectedRoute";
import { LoginPage } from "../feachers/auth/pages/LoginPages";
import { CreateType } from "../types/createAction.type";
import { EditBoardPage } from "../feachers/boards/pages/EditBoardPage";
import { EditTaskPage } from "../feachers/tasks/pages/EditTaskPage";
import { Comments } from "../feachers/comments/pages/Comments";
import { CreateComment } from "../feachers/comments/components/form/CreateComment";
import { EditCommentPage } from "../feachers/comments/pages/EditCommentPage";

export const router = createBrowserRouter([
    {   
        path: "/",
        Component: LayoutPage,
        children: [
            {
                element: <ProtectedRoute />,   // МІДДЛВАР
                children: [
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
                                        Component: Tasks,
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
                            }, 
                            {
                                path: "comments",
                                Component: Comments,
                                children: [
                                    {
                                        path: "create",
                                        Component: CreateComment
                                    },
                                    {
                                        path: "edit",
                                        Component: EditCommentPage
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
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
