export type CommandType = "summary" | "code" | "knowledge";

export interface Command {
  type: CommandType;
  title: string;
  category: "summary" | "code" | "knowledge";
  additionalText?: string;
}
