import { CommandHandler } from "./types";
import { SummarizeChangesHandler } from "./handlers/summarizeChangesHandler";

class CommandRegistry {
  private handlers: Map<string, () => CommandHandler> = new Map();

  constructor() {
    this.registerHandler(
      "summarize-changes",
      () => new SummarizeChangesHandler()
    );
    // Add more handlers as needed
  }

  registerHandler(commandId: string, handlerFactory: () => CommandHandler) {
    this.handlers.set(commandId, handlerFactory);
  }

  getHandler(commandId: string): CommandHandler | undefined {
    const handlerFactory = this.handlers.get(commandId);
    return handlerFactory?.();
  }
}

export const commandRegistry = new CommandRegistry();
