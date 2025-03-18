import React from "react";
import {
  CodeIcon,
  FileIcon,
  FileDirectoryIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  ProjectIcon,
  AppsIcon,
  BookIcon,
  PencilIcon,
  NoteIcon,
} from "@primer/octicons-react";
import { Category } from "../types/types";

export const categories: readonly Category[] = [
  {
    type: "codebase",
    title: "Codebase",
    icon: <CodeIcon size={16} />,
    isCodebase: true,
  },
  {
    type: "file",
    title: "Files",
    icon: <FileIcon size={16} />,
  },
  {
    type: "folder",
    title: "Folders",
    icon: <FileDirectoryIcon size={16} />,
  },
  {
    type: "pr",
    title: "Pull requests",
    icon: <GitPullRequestIcon size={16} />,
  },
  {
    type: "issue",
    title: "Issues",
    icon: <IssueOpenedIcon size={16} />,
  },
  {
    type: "project",
    title: "Projects",
    icon: <ProjectIcon size={16} />,
  },
  {
    type: "space",
    title: "Spaces",
    icon: <AppsIcon size={16} />,
  },
];

export const categoryIcons = {
  summary: NoteIcon,
  code: CodeIcon,
  knowledge: BookIcon,
  generate: PencilIcon,
} as const;

export type CategoryType = keyof typeof categoryIcons;
