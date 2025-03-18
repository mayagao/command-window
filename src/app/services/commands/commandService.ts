import { commandRegistry } from "./commandRegistry";
import { Command } from "@/app/types/commands";

export class CommandService {
  static async executeCommand(command: Command) {
    if (!command.id) {
      console.warn("Command has no id");
      return null;
    }

    const handler = commandRegistry.getHandler(command.id);

    if (handler) {
      try {
        return await handler.execute();
      } catch {
        console.error("Failed to execute command");
        return null;
      }
    } else {
      console.warn(`No handler registered for command: ${command.id}`);
      return null;
    }
  }
}
