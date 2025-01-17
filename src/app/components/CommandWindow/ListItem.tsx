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
import { ReactNode, forwardRef } from "react";
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

export const ListItem = forwardRef<
  HTMLDivElement,
  ListItemProps & {
    index: number;
    onFocus?: (index: number) => void;
  }
>(
  (
    {
      type,
      command,
      title,
      number,
      description,
      isSelected,
      onClick,
      showSuffixIcon,
      isCodebase,
      index,
      onFocus,
    },
    ref
  ) => {
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }
    };

    const handleFocus = () => {
      onFocus?.(index);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        tabIndex={0}
        className={`flex items-center px-2 h-[36px] cursor-pointer outline-none rounded-md ${
          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
        } focus:ring-2 focus:ring-blue-500`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      >
        <div className={`mr-3 text-gray-500`}>{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="text-[14px] truncate max-w-[500px]">{title}</span>
            {number && (
              <span className="ml-1 fs-small text-gray-500">#{number}</span>
            )}
          </div>
          {description && (
            <div className="fs-small text-gray-500 ">{description}</div>
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
);

ListItem.displayName = "ListItem";
