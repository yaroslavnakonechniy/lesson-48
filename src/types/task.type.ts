export interface TaskI {
    id: number,
    title: string,
    description: string,
    workflow: Workflow,
    boardId: number,
    authorId: number
}

type Workflow = "backlog" | "inProgress" | "review" | "done";

export type CardTaskProps = {
    card:TaskI
}