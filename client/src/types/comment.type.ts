import type { IComment } from "../interfaces/comment";

export type CreateCommentProps = {
    comment?: IComment;
    mode: "create" | "edit";
};
