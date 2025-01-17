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
      return <CodeIcon className="text-gray-600" size={14} />;
    case "file":
      return <FileCodeIcon className="text-gray-600" size={14} />;
    case "folder":
      return <FileDirectoryIcon className="text-gray-600" size={14} />;
    case "pr":
      return <GitPullRequestIcon className="text-green-600" size={14} />;
    case "issue":
      return <IssueOpenedIcon className="text-purple-600" size={14} />;
    case "project":
      return <ProjectIcon className="text-gray-600" size={14} />;
    case "space":
      return <AppsIcon className="text-gray-600" size={14} />;
  }
};

export function PrimitivePill({
  type,
  title,
  number,
  isAction,
}: PrimitivePillProps) {
  return (
    <div className="flex items-center gap-1 text-sm max-w-[120px] bg-gray-50 rounded-md p-1 px-2">
      <span className="flex items-center gap-1 flex-shrink-0 text-gray-500">
        {getIcon(type)}
        {number && <span className="">{number}</span>}
      </span>
      <span className={`truncate ${isAction ? "text-blue-600" : ""}`}>
        {title}
      </span>
    </div>
  );
}

export default PrimitivePill;
