import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "../layouts/layout/Layout";
import { Projects } from "../components/projects/Projects";
import { TasksManager } from "../components/projects/TasksManager/TasksManager";
import { ProjectDetailes } from "../components/projects/ProjectDetails/ProjectDetails";
import { TaskDetails } from "../components/projects/TasksManager/TaskDetails/TaskDetails";
import { FormPopUp } from "../components/projects/Form/FormPopUp";
import { FormProject } from "../components/projects/Form/Form";
import { FormTask } from "../components/projects/TasksManager/Form/Form";
import { ProtectedRoute } from "../feachers/auth/components/ProtectedRoute";
import { LoginPage } from "../feachers/auth/pages/LoginPages";
import { CreateType } from "../interfaces/createAction";

export const router = createBrowserRouter([
    {   
        path: "/",
        Component: LayoutPage,
        children: [
            {
                element: <ProtectedRoute />,   // МІДДЛВАР
                handle: {createType: CreateType.BOARD},
            },
            {
                path: "boards",
                Component: Projects,
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
                                Component: ProjectDetailes,
                            },
                            {
                                path: 'edit',
                                handle: {createType: CreateType.BOARD},
                                Component: FormProject
                            },
                            {
                                path: 'tasks',
                                handle: {createType: CreateType.TASK},
                                Component: TasksManager,
                                children: [
                                    {
                                        path: "create",             
                                        Component: FormPopUp
                                    },
                                    {
                                        path: ":taskId",//за цим url має вилитіти попап з описом проекта, 
                                                        // зараз він просто відображається через Outlet                                           
                                        children: [
                                            {
                                                index: true,
                                                Component: TaskDetails,
                                            },
                                            {
                                                path: "edit",//за цим url має вилитіти попап з описом проекта, 
                                                                // зараз він просто відображається через Outlet     
                                                Component: FormTask //
                                            }
                                        ]
                                    },
                                ]
                            },
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


/**
 * 
 * {
        Component: LayoutPage,
        children:[
            {
                path: '/',
                handle: {createType: CreateType.BOARD},
                Component: Projects,
                children: [
                    {
                        element: <ProtectedRoute />,   // МІДДЛВАР
                        handle: {createType: CreateType.BOARD},
                        children: [
                            {
                                path: "boards",
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
                                                Component: ProjectDetailes,
                                            },
                                            {
                                                path: 'edit',
                                                handle: {createType: CreateType.BOARD},
                                                Component: FormProject
                                            },
                                            {
                                                path: 'tasks',
                                                handle: {createType: CreateType.TASK},
                                                Component: TasksManager,
                                                children: [
                                                    {
                                                        path: "create",             
                                                        Component: FormPopUp
                                                    },
                                                    {
                                                        path: ":taskId",//за цим url має вилитіти попап з описом проекта, 
                                                                        // зараз він просто відображається через Outlet                                           
                                                        children: [
                                                            {
                                                                index: true,
                                                                Component: TaskDetails,
                                                            },
                                                            {
                                                                path: "edit",//за цим url має вилитіти попап з описом проекта, 
                                                                                // зараз він просто відображається через Outlet     
                                                                Component: FormTask //
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                ]
            },
            
        ]
    },
 */