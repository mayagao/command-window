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
  type: string;
  title?: string;
  number?: number;
  variant?: "default" | "header";
}

export default function PrimitivePill({
  type,
  title,
  number,
  variant = "default",
}: PrimitivePillProps) {
  const icon =
    type === "pr" ? (
      <GitPullRequestIcon size={14} />
    ) : (
      <IssueOpenedIcon size={14} />
    );
  const label = type === "pr" ? "PR" : "Issue";

  if (variant === "header") {
    return (
      <div className="flex items-center gap-2 ml-2">
        <div className="flex items-center gap-1 text-gray-500">
          <span className="text-[13px]">{label}</span>
          <span className="text-[13px]">{number}</span>
        </div>
        {title && (
          <span className="text-[13px] text-gray-700 truncate max-w-[220px]">
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-[13px]">
      <span className="text-gray-600 mr-2">{icon}</span>
      <span className="text-gray-700">{label}</span>
      {number && <span className="text-gray-700">#{number}</span>}
      {title && (
        <span className="text-gray-600 truncate max-w-[40px]">{title}</span>
      )}
    </div>
  );
}
