import { commandRegistry } from "./commandRegistry";
import { Command } from "@/app/types/commands";

export class CommandService {
  static async executeCommand(command: Command) {
    const handler = commandRegistry.getHandler(command.id);

    if (handler) {
      try {
        return await handler.execute();
      } catch (error) {
        console.error(error);
        return {
          type: "error",
          title: "Error",
          content: "Command execution failed",
        };
      }
    } else {
      console.warn(`No handler registered for command: ${command.id}`);
      return null;
    }
  }
}
