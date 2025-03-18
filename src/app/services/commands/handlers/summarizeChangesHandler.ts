import { CommandHandler, CommandResponse } from "../types";
import { Anthropic } from "@anthropic-ai/sdk";

export class SummarizeChangesHandler implements CommandHandler {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async execute(): Promise<CommandResponse> {
    try {
      // Fetch diff logic
      const diffResponse = await fetch("/api/diff");
      const { diffPatch } = await diffResponse.json();

      const message = await this.anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Summarize the changes introduced in the following patch into under 80 words...${diffPatch}`,
          },
        ],
      });

      return {
        type: "ai-response",
        title: "Change Summary",
        content: message.content[0].text,
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
