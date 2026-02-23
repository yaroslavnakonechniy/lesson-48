export interface IProject {
    id: number,
    name: string,
    description: string,
    authorId: number
}

export type CardProjectProps = {
  project: IProject
}