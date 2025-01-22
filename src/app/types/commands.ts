export type CommandType = "summary" | "code" | "knowledge";
export type PrimitiveType =
  | "codebase"
  | "pr"
  | "issue"
  | "project"
  | "space"
  | "file"
  | "folder";

export interface Command {
  type: CommandType;
  category: "summary" | "code" | "knowledge";
  title: string;
  prompt: string;
  relatedContext: PrimitiveType;
  additionalText?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  number?: number;
}

export interface Primitive {
  type: PrimitiveType;
  title: string;
  number?: number;
}
