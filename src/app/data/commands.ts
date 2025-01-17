import { Command } from "../types/commands";

export const defaultCommands: Command[] = [
  // PR Related Commands
  {
    type: "summary",
    category: "summary",
    title: "Summarize key changes",
    prompt: "Summarize the key changes in this pull request",
    relatedContext: "pr",
  },
  {
    type: "summary",
    category: "summary",
    title: "Summarize recent PRs related to this change",
    prompt:
      "Find and summarize recent pull requests related to the changes in this PR",
    relatedContext: "pr",
  },
  {
    type: "code",
    category: "code",
    title: "Fix build errors",
    prompt: "Analyze the build errors and suggest fixes",
    relatedContext: "pr",
  },
  {
    type: "code",
    category: "code",
    title: "Fix merge conflicts",
    prompt: "Help resolve merge conflicts in this PR",
    relatedContext: "pr",
  },

  // Codebase Related Commands
  {
    type: "knowledge",
    category: "knowledge",
    title: "How does this codebase work?",
    prompt: "Explain the architecture and main components of this codebase",
    relatedContext: "codebase",
  },
  {
    type: "knowledge",
    category: "knowledge",
    title: "How to contribute?",
    prompt: "Explain the contribution guidelines and process for this codebase",
    relatedContext: "codebase",
  },
  {
    type: "code",
    category: "code",
    title: "How to run this locally?",
    prompt:
      "Provide instructions for setting up and running this project locally",
    relatedContext: "codebase",
  },
  {
    type: "code",
    category: "code",
    title: "How to deploy?",
    prompt: "Explain the deployment process for this project",
    relatedContext: "codebase",
  },
  {
    type: "summary",
    category: "summary",
    title: "Generate a read.me",
    prompt: "Generate a comprehensive README.md for this project",
    relatedContext: "codebase",
  },

  // Issue Related Commands
  {
    type: "summary",
    category: "summary",
    title: "Summarize related issues",
    prompt: "Find and summarize issues related to this one",
    relatedContext: "issue",
  },
  {
    type: "code",
    category: "code",
    title: "Suggest implementation",
    prompt: "Suggest a technical implementation approach for this issue",
    relatedContext: "issue",
  },
  {
    type: "knowledge",
    category: "knowledge",
    title: "Find similar resolved issues",
    prompt:
      "Find similar issues that were already resolved and explain their solutions",
    relatedContext: "issue",
  },

  // Project Related Commands
  {
    type: "summary",
    category: "summary",
    title: "Generate project status report",
    prompt:
      "Create a status report for this project including progress, blockers, and next steps",
    relatedContext: "project",
  },
  {
    type: "knowledge",
    category: "knowledge",
    title: "Analyze project dependencies",
    prompt:
      "Analyze and explain the dependencies and their impact on this project",
    relatedContext: "project",
  },
  {
    type: "summary",
    category: "summary",
    title: "Summarize project timeline",
    prompt: "Create a timeline summary of this project's major milestones",
    relatedContext: "project",
  },

  // Space Related Commands
  {
    type: "summary",
    category: "summary",
    title: "Summarize space activity",
    prompt: "Summarize recent activity and changes in this space",
    relatedContext: "space",
  },
  {
    type: "knowledge",
    category: "knowledge",
    title: "Generate space overview",
    prompt:
      "Create an overview of this space's purpose, contents, and organization",
    relatedContext: "space",
  },

  // File Related Commands
  {
    type: "code",
    category: "code",
    title: "Explain this file",
    prompt: "Explain the purpose and functionality of this file",
    relatedContext: "file",
  },
  {
    type: "code",
    category: "code",
    title: "Suggest improvements",
    prompt: "Analyze this file and suggest code improvements",
    relatedContext: "file",
  },
  {
    type: "summary",
    category: "summary",
    title: "Summarize file changes",
    prompt: "Summarize the change history of this file",
    relatedContext: "file",
  },

  // Folder Related Commands
  {
    type: "knowledge",
    category: "knowledge",
    title: "Explain folder structure",
    prompt: "Explain the organization and purpose of this folder's contents",
    relatedContext: "folder",
  },
  {
    type: "code",
    category: "code",
    title: "Find code patterns",
    prompt: "Analyze and identify common patterns in this folder's code",
    relatedContext: "folder",
  },
  {
    type: "summary",
    category: "summary",
    title: "Generate folder documentation",
    prompt: "Generate documentation for this folder's structure and contents",
    relatedContext: "folder",
  },
];
