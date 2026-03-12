export const CreateType = {
  TASK: 'task',
  BOARD: 'board',
} as const;

export type CreateType = typeof CreateType[keyof typeof CreateType];
