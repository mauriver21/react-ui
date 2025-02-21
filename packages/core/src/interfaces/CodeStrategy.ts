export type CodeStrategy =
  | { type: 'content'; code: string }
  | { type: 'path'; codePath: string };
