import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { diffPatch, command } = await request.json();

    if (command !== "summarize-changes") {
      return new Response("Command not supported", { status: 400 });
    }

    const prompt = `Summarize the changes introduced in the following patch into under 80 words. Dynamically generate bolded section headers based on the type of changes (e.g., Integration of [Feature/Models/Changes], Documentation updates, Testing, etc.). Include concise descriptions for each section along with relevant links to the core logic, documentation, and tests.

Patch content:
${diffPatch}`;

    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    // Type assertion since we know the AI will return text content
    const textContent = content as { type: "text"; text: string };

    return new Response(JSON.stringify({ response: textContent.text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI API error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
