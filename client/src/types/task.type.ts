export interface ITask {
    id: string,
    title: string,
    description: string,
    workflow: Workflow,
    boardId: string,
    authorId: string
}

export type Workflow = {
    code: "todo" | "progress" | "done",
    label: string
}

export type CardTaskProps = {
    card: ITask
}
