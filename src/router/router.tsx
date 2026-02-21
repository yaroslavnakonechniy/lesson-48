import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPage } from "../layouts/layout/Layout";
import { Projects } from "../components/projects/Projects";
import { TasksManager } from "../components/projects/TasksManager/TasksManager";
import { ProjectDetailes } from "../components/projects/ProjectDetails/ProjectDetails";
import { TaskDetails } from "../components/projects/TasksManager/TaskDetails/TaskDetails";
import { FormProject } from "../components/projects/Form/Form";
import { FormTask } from "../components/projects/TasksManager/Form/Form";

export const router = createBrowserRouter([
    {
        //Middleware for login

        Component: LayoutPage,
        children:[
            {
                path: '/',
                Component: Projects,
                children: [
                    {
                        path: 'project/:projectId', //за цим url має вилитіти попап з описом проекта, 
                                                    // зараз він просто відображається через Outlet
                        Component: ProjectDetailes
                    },

                    {
                        path: 'project/:projectId/edit',
                        Component: FormProject
                    }
                ]

            },
            {
                path: 'project/:projectId/tasks',
                Component: TasksManager,
                children: [
                    {
                        path: ":taskId",//за цим url має вилитіти попап з описом проекта, 
                                        // зараз він просто відображається через Outlet
                        Component: TaskDetails
                    },
                                        {
                        path: ":taskId/edit",//за цим url має вилитіти попап з описом проекта, 
                                        // зараз він просто відображається через Outlet
                        Component: FormTask //
                    }
                ]
            },

        ]

    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
])