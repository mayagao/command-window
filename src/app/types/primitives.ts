export type PrimitiveType =
  | "file"
  | "folder"
  | "pr"
  | "issue"
  | "project"
  | "space"
  | "codebase";

export type PrimitiveItem = {
  type: PrimitiveType;
  title: string;
  number?: number;
  isAction?: boolean;
  isCodebase?: boolean;
};
