"use client";

import {
  FileIcon,
  FileDirectoryIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  ProjectIcon,
  AppsIcon,
  CodeSquareIcon,
} from "@primer/octicons-react";
import { ReactNode } from "react";
import { PrimitiveType } from "@/app/types/primitives";

const primitiveIconMap: Record<PrimitiveType, ReactNode> = {
  file: <FileIcon size={14} />,
  folder: <FileDirectoryIcon size={14} />,
  pr: <GitPullRequestIcon size={14} />,
  issue: <IssueOpenedIcon size={14} />,
  project: <ProjectIcon size={14} />,
  space: <AppsIcon size={14} />,
  codebase: <CodeSquareIcon size={14} />,
};

const primitiveColorMap: Record<PrimitiveType, string> = {
  file: "text-gray-500",
  folder: "text-gray-500",
  pr: "text-green-600",
  issue: "text-purple-500",
  project: "text-blue-600",
  space: "text-gray-500",
  codebase: "text-gray-500",
};

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
  const icon = primitiveIconMap[type as PrimitiveType] || (
    <IssueOpenedIcon size={14} />
  );

  if (variant === "header") {
    return (
      <div className="flex items-center gap-2 pl-1">
        <div className="flex items-center gap-1 text-gray-500">
          <span
            className={`${
              primitiveColorMap[type as PrimitiveType] || "text-gray-500"
            }`}
          >
            {icon}
          </span>
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
      <span
        className={`${
          primitiveColorMap[type as PrimitiveType] || "text-gray-500"
        } mr-1`}
      >
        {icon}
      </span>
      {number && <span className="text-gray-500">#{number}</span>}
      {title && <span className="truncate max-w-[80px]">{title}</span>}
    </div>
  );
}
