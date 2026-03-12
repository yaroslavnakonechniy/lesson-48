Final project. Using API to create a task manager. 

Technologies:

  React
  TypeScript
  Vite
  Ant Design
  Sass

Project Structure:

src/
│
├── app/
│   ├── api/
│   │   └── baseApi
│   └── store
├── feachers/
│   ├── auth/
│   │   ├── api/
│   │   │    └── auth.api
│   │   ├── components/
│   │   │    └── ProtectedRoute
│   │   ├── contex/
│   │   │    └── AuthContex
│   │   └── pages/
│   │   │    └── LoginPages
│   ├── boards/
│   │   ├── api/
│   │   │    └── boards.api
│   │   ├── components/
│   │   │    ├── boardDetails/
│   │   │    │    └── BoardDetails
│   │   │    ├── cardBoard/
│   │   │    │    └── CardBoard
│   │   │    ├── form/
│   │   │    │    ├── CreateBoard
│   │   │    │    └── Form
│   │   └── pages/
│   │   │    ├── Boards
│   │   │    ├── EditBoardPage
│   │   │    └── ListBoard
│   ├── comments/
│   │   ├── api/
│   │   │    └── comments.api
│   │   ├── components/
│   │   │    ├── cardComments/
│   │   │    │    └── CardComments
│   │   │    ├── commentsDetails/
│   │   │    │    └── CommentDetails
│   │   │    ├── form/
│   │   │    │    ├── CreateComments
│   │   │    │    └── Form
│   │   └── pages/
│   │   │    ├── Comments
│   │   │    ├── EditCommentsPage
│   │   │    └── ListComments
│   ├── tasks/
│   │   ├── api/
│   │   │    └── tasks.api
│   │   ├── components/
│   │   │    ├── cardTask/
│   │   │    │    └── CardTask
│   │   │    ├── column/
│   │   │    │    └── Column
│   │   │    ├── form/
│   │   │    │    └── Form
│   │   │    ├── taskDetails/
│   │   │    │    └── TaskDetails
│   │   └── pages/
│   │   │    ├── Tasks
│   │   │    ├── EditTasksPage
│   │   │    └── ListTasks
├── hooks/
│   ├── useCreateAction
│   ├── useDeleteBoard
│   ├── useDeleteComment
│   └── useDeleteTask
├── interfaces/
│   ├── apiResponse
│   ├── auth
│   ├── board
│   ├── comment
|   └── task
├── layouts/
│   ├── footer/
│   │   └── Footer
│   ├── header/
│   │   ├── AppHeader
│   │   └── style.module
│   └── layout/
│   │   └── Layout
├── router/
|   └── router
├── types/
│   ├── cards/
│   │   ├── boardProps
│   │   └── taskProps
│   ├── column.type
│   ├── comment.type
│   ├── createAction.type
│   ├── formBoard.type
│   ├── formTask.type
|   └── worflow.type
└── App.tsx

Install project:

  clone project:
    git@github.com:yaroslavnakonechniy/lesson-48.git

  Install dependencies:

    npm install
    npm install @ant-design/icons
    npm install @reduxjs/toolkit
    npm install antd
    npm install react
    npm install react-dom
    npm install react-redux
    npm install react-router-dom
    npm install sass

  Run dev server:

    npm run dev
    npm run start:server
    npm run start:db