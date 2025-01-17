import { PrimitiveType } from "../Primitives/PrimitivePill";
import {
  FileIcon,
  FileDirectoryIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  ProjectIcon,
  AppsIcon,
  NoteIcon,
  CodeIcon,
  BookIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";
import { ReactNode } from "react";
import { Command } from "@/app/types/commands";

interface ListItemProps {
  // For primitive items
  type?: PrimitiveType;
  // For commands
  command?: Command;
  title: ReactNode;
  number?: number;
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
  showSuffixIcon?: boolean;
  isCodebase?: boolean;
}

const primitiveIconMap: Record<PrimitiveType, ReactNode> = {
  file: <FileIcon size={16} />,
  folder: <FileDirectoryIcon size={16} />,
  pr: <GitPullRequestIcon size={16} />,
  issue: <IssueOpenedIcon size={16} />,
  project: <ProjectIcon size={16} />,
  space: <AppsIcon size={16} />,
};

const commandIconMap = {
  summary: <NoteIcon size={16} />,
  code: <CodeIcon size={16} />,
  knowledge: <BookIcon size={16} />,
};

const primitiveColorMap: Record<PrimitiveType, string> = {
  file: "text-gray-400",
  folder: "text-gray-400",
  pr: "text-green-500",
  issue: "text-purple-500",
  project: "text-blue-500",
  space: "text-gray-400",
};

const commandColorMap = {
  summary: "text-blue-500",
  code: "text-purple-500",
  knowledge: "text-orange-500",
};

export function ListItem({
  type,
  command,
  title,
  number,
  description,
  isSelected,
  onClick,
  showSuffixIcon,
  isCodebase,
}: ListItemProps) {
  const getIcon = () => {
    if (command) {
      return commandIconMap[command.category];
    }
    if (isCodebase) {
      return <CodeIcon size={16} />;
    }
    return type ? primitiveIconMap[type] : null;
  };

  const getIconColor = () => {
    if (command) {
      return commandColorMap[command.category];
    }
    return type ? primitiveColorMap[type] : "";
  };

  return (
    <div
      className={`flex items-center px-3 py-2 cursor-pointer ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className={`mr-3 ${getIconColor()}`}>{getIcon()}</div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
          {number && (
            <span className="ml-2 text-sm text-gray-500">#{number}</span>
          )}
        </div>
        {description && (
          <div className="text-sm text-gray-500">
            {description}
            {command && (
              <span className="ml-1 text-gray-400">
                — Press{" "}
                <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100 border border-gray-200 rounded">
                  Enter
                </kbd>{" "}
                to ask Copilot
              </span>
            )}
          </div>
        )}
      </div>
      {showSuffixIcon && (
        <div className="text-gray-400">
          <ChevronRightIcon size={16} />
        </div>
      )}
    </div>
  );
}
