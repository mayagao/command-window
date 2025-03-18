import { CommandHandler } from "@/app/types/commands";
import { SummarizeChangesHandler } from "./handlers/summarizeChangesHandler";

class CommandRegistry {
  private handlers: Map<string, CommandHandler>;

  constructor() {
    this.handlers = new Map();
    this.registerHandlers();
  }

  private registerHandlers() {
    this.handlers.set("summarize-changes", new SummarizeChangesHandler());
  }

  getHandler(commandId: string): CommandHandler | undefined {
    return this.handlers.get(commandId);
  }
}

export const commandRegistry = new CommandRegistry();
