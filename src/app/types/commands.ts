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
  id?: string;
  category: "summary" | "code" | "knowledge" | "generate";
  title: string;
  prompt: string;
  relatedContext: PrimitiveType;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  number?: number;
  data?: Record<string, unknown>;
}

export interface Primitive {
  type: PrimitiveType;
  title: string;
  number?: number;
}

export interface CommandResponse {
  type: string;
  title: string;
  content?: string;
  url?: string;
  error?: string;
}

export interface CommandHandler {
  execute: () => Promise<CommandResponse>;
}

export interface CommandContext {
  commandId: string;
  payload?: Record<string, unknown>;
}
