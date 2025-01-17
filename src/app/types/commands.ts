export type CommandType = "summary" | "code" | "knowledge";

export interface Command {
  type: CommandType;

  category: "summary" | "code" | "knowledge";
  additionalText?: string;
  icon?: string;
  title: string;
  onSelect?: () => void;
}
