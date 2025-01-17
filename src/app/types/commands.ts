export type CommandType = "summary" | "code" | "knowledge";

export interface Command {
  type: CommandType;
  category: "summary" | "code" | "knowledge";
  title: string;
  prompt: string;
  relatedContext:
    | "codebase"
    | "pr"
    | "issue"
    | "project"
    | "space"
    | "file"
    | "folder";
  additionalText?: string;
}

export interface Primitive {
  type: PrimitiveType;
  title: string;
  number?: number;
}
