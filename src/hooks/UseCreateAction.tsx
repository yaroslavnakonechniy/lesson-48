import { useMatches, useParams, type UIMatch } from "react-router-dom";
import { CreateType } from "../interfaces/createAction";

export const useCreateAction = () => {
    const { projectId } = useParams();
    const matches = useMatches() as UIMatch<unknown, { createType?: CreateType }>[];

    const currentMatch = [...matches].reverse().find((m) => m.handle?.createType);
    const type = currentMatch?.handle?.createType;

    const isTask = type === CreateType.TASK;
    const isBoard = type === CreateType.BOARD;

    return {
        type,
        isTask,
        isBoard,
        projectId,
        createPath: isTask && projectId 
            ? `/project/${projectId}/tasks/create` 
            : '/project/create'
    };
};
