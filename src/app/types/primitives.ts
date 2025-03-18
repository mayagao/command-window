export type PrimitiveType =
  | "file"
  | "issue"
  | "pr"
  | "space"
  | "project"
  | "folder"
  | "codebase"
  | "repository";

export interface PrimitiveItem {
  title: string;
  type: PrimitiveType;
  number?: number;
  path?: string;
  url?: string;
}

export type PrimitiveData = Record<PrimitiveType, PrimitiveItem[]>;
