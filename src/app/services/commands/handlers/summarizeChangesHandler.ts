import { CommandHandler, CommandResponse } from "@/app/types/commands";

export class SummarizeChangesHandler implements CommandHandler {
  async execute(): Promise<CommandResponse> {
    try {
      // Fetch diff logic
      const diffResponse = await fetch("/api/diff");
      const { diffPatch } = await diffResponse.json();

      // Use our existing AI API route instead of direct Anthropic call
      const aiResponse = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diffPatch,
          command: "summarize-changes",
        }),
      });

      const { response } = await aiResponse.json();

      return {
        type: "ai-response",
        title: "Change Summary",
        content: response,
      };
    } catch (error) {
      return {
        type: "error",
        title: "Error",
        content: "Failed to generate summary",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
