export interface ProjectI {
    id: number,
    name: string,
    description: string,
    authorId: number
}

export type CardProjectProps = {
  project: ProjectI
}