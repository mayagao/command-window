export type PrimitiveType =
  | "file"
  | "issue"
  | "pr"
  | "space"
  | "project"
  | "folder"
  | "codebase"
  | "repository";

export interface Command {
  category: "summary" | "code" | "knowledge" | "generate";
  title: string;
  prompt: string;
  relatedContext: PrimitiveType;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  number?: number;
}

export interface Primitive {
  type: PrimitiveType;
  title: string;
  number?: number;
}
