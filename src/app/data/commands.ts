import { Command } from "@/app/types/commands";

export const defaultCommands: Command[] = [
  {
    type: "summary",
    category: "summary",
    title: "Summarize key changes",
    additionalText: "Get an overview of the main changes in this PR",
  },
  {
    type: "summary",
    category: "summary",
    title: "Summarize recent PRs related to this change",
    additionalText: "Find related pull requests",
  },
  {
    type: "summary",
    category: "summary",
    title: "Summarize all previous code reviews",
    additionalText: "Get a summary of previous code review feedback",
  },
  {
    type: "code",
    category: "code",
    title: "Fix build errors",
    additionalText: "Analyze and fix current build issues",
  },
  {
    type: "code",
    category: "code",
    title: "Fix merge conflicts",
    additionalText: "Help resolve merge conflicts",
  },
];
