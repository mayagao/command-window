"use client";

import {
  FileCodeIcon,
  FileDirectoryIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  ProjectIcon,
  AppsIcon,
  CodeIcon,
} from "@primer/octicons-react";
import { ReactNode } from "react";

export type PrimitiveType =
  | "codebase"
  | "file"
  | "folder"
  | "pr"
  | "issue"
  | "project"
  | "space";

interface PrimitivePillProps {
  type: PrimitiveType;
  title: ReactNode;
  number?: number;
  isAction?: boolean;
}

const getIcon = (type: PrimitiveType) => {
  switch (type) {
    case "codebase":
      return <CodeIcon className="text-gray-600" size={16} />;
    case "file":
      return <FileCodeIcon className="text-gray-600" size={16} />;
    case "folder":
      return <FileDirectoryIcon className="text-gray-600" size={16} />;
    case "pr":
      return <GitPullRequestIcon className="text-green-600" size={16} />;
    case "issue":
      return <IssueOpenedIcon className="text-purple-600" size={16} />;
    case "project":
      return <ProjectIcon className="text-gray-600" size={16} />;
    case "space":
      return <AppsIcon className="text-gray-600" size={16} />;
  }
};

const PrimitivePill = ({
  type,
  title,
  number,
  isAction,
}: PrimitivePillProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        {getIcon(type)}
        {number && <span>{number}</span>}
      </span>
      <span className={isAction ? "text-blue-600" : ""}>{title}</span>
    </div>
  );
};

export default PrimitivePill;
