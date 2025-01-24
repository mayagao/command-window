import { PrimitiveType, PrimitiveItem } from "@/app/types/primitives";
import { GITHUB_OWNER, GITHUB_REPO } from "./constants";

export const primitiveData2: Record<PrimitiveType, PrimitiveItem[]> = {
  file: [
    { type: "file", title: "package.json" },
    { type: "file", title: "tsconfig.json" },
    { type: "file", title: "README.md" },
    { type: "file", title: ".air.toml" },
    { type: "file", title: ".env.example" },
    { type: "file", title: ".env.feature_flags_development" },
    { type: "file", title: ".gitignore" },
    { type: "file", title: ".monolith-twirp.yml" },
  ],
  folder: [
    { type: "folder", title: "src" },
    { type: "folder", title: "public" },
    { type: "folder", title: "components" },
    { type: "folder", title: ".devcontainer" },
    { type: "folder", title: ".github" },
    { type: "folder", title: ".vscode" },
    { type: "folder", title: "cmd" },
    { type: "folder", title: "config" },
    { type: "folder", title: "dev" },
    { type: "folder", title: "docs" },
    { type: "folder", title: "magefiles" },
    { type: "folder", title: "pkg" },
    { type: "folder", title: "proto" },
    { type: "folder", title: "script" },
  ],
  pr: [
    { type: "pr", title: "Add new search functionality", number: 14535 },
    { type: "pr", title: "Fix build pipeline", number: 14530 },
    { type: "pr", title: "Update dependencies", number: 14525 },
    { type: "pr", title: "Add Xcode chat integration", number: 8313 },
    { type: "pr", title: "Add diagrams for CCR flows", number: 8312 },
    {
      type: "pr",
      title: "Remove old experiments that are fully disabled",
      number: 8311,
    },
    {
      type: "pr",
      title:
        "remove counts_against_chat_slo logic and consolidate error handling from chat",
      number: 8310,
    },
    { type: "pr", title: "log and limit job log content size", number: 8309 },
    {
      type: "pr",
      title: "[SPIKE] O1 comment generation experiment",
      number: 8308,
    },
    {
      type: "pr",
      title:
        "Copilot api issues 7642 model upgrade automation - API calls in parallel",
      number: 8306,
    },
  ],
  issue: [
    { type: "issue", title: "Search not working on mobile", number: 892 },
    { type: "issue", title: "Dark mode colors need adjustment", number: 891 },
    { type: "issue", title: "Performance improvements needed", number: 890 },
    {
      type: "issue",
      title: "Mitigation for capacity issues with Claude requests",
      number: 8296,
    },
    {
      type: "issue",
      title:
        "GET /agents and agents chat endpoints can not be used for client integration testing using HMAC tokens",
      number: 8291,
    },
    {
      type: "issue",
      title: "Chat parses repo creation date incorrectly in certain regions",
      number: 8289,
    },
    {
      type: "issue",
      title:
        "SPIKE: Copilot API for Customers - Automated integration onboarding",
      number: 8275,
    },
    {
      type: "issue",
      title: "Caching in AWS for performance of Claude model",
      number: 8273,
    },
    {
      type: "issue",
      title: "Chat response stream pauses before tool calls",
      number: 8260,
    },
    {
      type: "issue",
      title:
        "Port 2206 is not exposed when starting CAPI in a dotcom codespace",
      number: 8240,
    },
  ],
  project: [
    { type: "project", title: "Q2 Roadmap" },
    { type: "project", title: "Mobile App" },
    { type: "project", title: "Documentation" },
    { type: "project", title: "Copilot API" },
    { type: "project", title: "Code Intelligence" },
    { type: "project", title: "Proxima Data Fanout" },
  ],
  space: [
    { type: "space", title: "Engineering" },
    { type: "space", title: "Design" },
    { type: "space", title: "Product" },
  ],
  codebase: [{ type: "codebase", title: "Codebase" }],
  repository: [
    {
      type: "repository",
      title: `${GITHUB_OWNER}/${GITHUB_REPO}`,
    },
  ],
};
