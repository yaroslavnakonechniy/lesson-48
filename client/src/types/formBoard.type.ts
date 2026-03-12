import type { IBoard } from '../interfaces/board';

export type CreateBoardProps = {
    board?: IBoard;
    mode: "create" | "edit";
};
