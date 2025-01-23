import { Command } from "../types/commands";

export const defaultCommands: Command[] = [
  // Summary Commands
  {
    category: "summary",
    title: "Summarize key changes",
    prompt: "Summarize the key changes in this pull request",
    relatedContext: "pr",
  },
  {
    category: "summary",
    title: "Summarize recent PRs related to this change",
    prompt:
      "Find and summarize recent pull requests related to the changes in this PR",
    relatedContext: "pr",
  },
  {
    category: "summary",
    title: "Generate a read.me",
    prompt: "Generate a comprehensive README.md for this project",
    relatedContext: "codebase",
  },
  {
    category: "summary",
    title: "Summarize related issues",
    prompt: "Find and summarize issues related to this one",
    relatedContext: "issue",
  },
  {
    category: "summary",
    title: "Generate project status report",
    prompt:
      "Create a status report for this project including progress, blockers, and next steps",
    relatedContext: "project",
  },
  {
    category: "summary",
    title: "Summarize project timeline",
    prompt: "Create a timeline summary of this project's major milestones",
    relatedContext: "project",
  },
  {
    category: "summary",
    title: "Summarize space activity",
    prompt: "Summarize recent activity and changes in this space",
    relatedContext: "space",
  },
  {
    category: "summary",
    title: "List recent discussions",
    prompt: "List recent discussions in this space",
    relatedContext: "space",
  },
  {
    category: "summary",
    title: "Summarize file changes",
    prompt: "Summarize the change history of this file",
    relatedContext: "file",
  },
  {
    category: "summary",
    title: "List recent edits",
    prompt: "List recent edits made to this file",
    relatedContext: "file",
  },
  {
    category: "summary",
    title: "Generate folder documentation",
    prompt: "Generate documentation for this folder's structure and contents",
    relatedContext: "folder",
  },
  {
    category: "summary",
    title: "List project stakeholders",
    prompt: "List the stakeholders involved in this project",
    relatedContext: "project",
  },
  {
    category: "summary",
    title: "List affected components",
    prompt: "List components affected by this issue",
    relatedContext: "issue",
  },

  // Code Commands
  {
    category: "code",
    title: "Fix build errors",
    prompt: "Analyze the build errors and suggest fixes",
    relatedContext: "pr",
  },
  {
    category: "code",
    title: "Fix merge conflicts",
    prompt: "Help resolve merge conflicts in this PR",
    relatedContext: "pr",
  },
  {
    category: "code",
    title: "How to run this locally?",
    prompt:
      "Provide instructions for setting up and running this project locally",
    relatedContext: "codebase",
  },
  {
    category: "code",
    title: "How to deploy?",
    prompt: "Explain the deployment process for this project",
    relatedContext: "codebase",
  },
  {
    category: "code",
    title: "Suggest implementation",
    prompt: "Suggest a technical implementation approach for this issue",
    relatedContext: "issue",
  },
  {
    category: "code",
    title: "Explain this file",
    prompt: "Explain the purpose and functionality of this file",
    relatedContext: "file",
  },
  {
    category: "code",
    title: "Suggest improvements",
    prompt: "Analyze this file and suggest code improvements",
    relatedContext: "file",
  },
  {
    category: "code",
    title: "Check for security vulnerabilities",
    prompt: "Check this file for potential security vulnerabilities",
    relatedContext: "file",
  },
  {
    category: "code",
    title: "Find code patterns",
    prompt: "Analyze and identify common patterns in this folder's code",
    relatedContext: "folder",
  },
  {
    category: "code",
    title: "Estimate effort",
    prompt: "Estimate the effort required to resolve this issue",
    relatedContext: "issue",
  },
  {
    category: "code",
    title: "Check for outdated dependencies",
    prompt: "Identify any outdated dependencies in this codebase",
    relatedContext: "codebase",
  },

  // Knowledge Commands
  {
    category: "knowledge",
    title: "How does this codebase work?",
    prompt: "Explain the architecture and main components of this codebase",
    relatedContext: "codebase",
  },
  {
    category: "knowledge",
    title: "How to contribute?",
    prompt: "Explain the contribution guidelines and process for this codebase",
    relatedContext: "codebase",
  },
  {
    category: "knowledge",
    title: "Find similar resolved issues",
    prompt:
      "Find similar issues that were already resolved and explain their solutions",
    relatedContext: "issue",
  },
  {
    category: "knowledge",
    title: "Analyze project dependencies",
    prompt:
      "Analyze and explain the dependencies and their impact on this project",
    relatedContext: "project",
  },
  {
    category: "knowledge",
    title: "Generate space overview",
    prompt:
      "Create an overview of this space's purpose, contents, and organization",
    relatedContext: "space",
  },
  {
    category: "knowledge",
    title: "Explain folder structure",
    prompt: "Explain the organization and purpose of this folder's contents",
    relatedContext: "folder",
  },
  {
    category: "knowledge",
    title: "List key modules",
    prompt: "List and describe the key modules in this codebase",
    relatedContext: "codebase",
  },
  {
    category: "knowledge",
    title: "Identify project risks",
    prompt: "Identify potential risks in this project",
    relatedContext: "project",
  },
  {
    category: "knowledge",
    title: "Identify key contributors",
    prompt: "Identify key contributors in this space",
    relatedContext: "space",
  },

  // Generate Commands
  {
    category: "generate",
    title: "Generate PR Description",
    prompt: "Generate a detailed pull request description.",
    relatedContext: "pr",
  },
  {
    category: "generate",
    title: "Generate Issue Comment",
    prompt: "Generate a comment for an issue.",
    relatedContext: "issue",
  },
  {
    category: "generate",
    title: "Generate Release Notes",
    prompt: "Generate release notes for the latest version.",
    relatedContext: "pr",
  },
  {
    category: "generate",
    title: "Generate Bug Report",
    prompt: "Generate a detailed bug report.",
    relatedContext: "issue",
  },
];
