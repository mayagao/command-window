import { PrimitiveType } from "@/app/types/primitives";
import {
  FileIcon,
  FileDirectoryIcon,
  CodeSquareIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  ProjectIcon,
  AppsIcon,
  NoteIcon,
  CodeIcon,
  BookIcon,
  PencilIcon,
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
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  isDisabled?: boolean;
  className?: string;
}

const primitiveIconMap: Record<PrimitiveType, ReactNode> = {
  file: <FileIcon size={16} />,
  folder: <FileDirectoryIcon size={16} />,
  pr: <GitPullRequestIcon size={16} />,
  issue: <IssueOpenedIcon size={16} />,
  project: <ProjectIcon size={16} />,
  space: <AppsIcon size={16} />,
  codebase: <CodeSquareIcon size={16} />,
};

const commandIconMap = {
  summary: <NoteIcon size={16} />,
  code: <CodeIcon size={16} />,
  knowledge: <BookIcon size={16} />,
  generate: <PencilIcon size={16} />,
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
      onKeyDown,
      isDisabled,
      className = "",
    },
    ref
  ) => {
    const getIcon = () => {
      if (command) {
        return commandIconMap[command.category];
      }
      if (isCodebase) {
        return <CodeSquareIcon size={16} />;
      }
      return type ? primitiveIconMap[type] : null;
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
        tabIndex={isDisabled ? -1 : 0}
        className={`flex items-center px-2 h-[36px] ${
          isDisabled ? "cursor-default" : "cursor-pointer"
        } outline-none rounded-md relative ${
          isSelected
            ? "bg-blue-50 before:absolute before:left-[-6px] before:top-0 before:bottom-0 before:w-[3px] before:rounded-md before:bg-blue-500"
            : "hover:bg-gray-50"
        } focus:ring-1 focus:ring-blue-500 focus:ring-inset ${className}`}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={isDisabled ? undefined : onKeyDown || handleKeyDown}
        onFocus={isDisabled ? undefined : handleFocus}
      >
        <div className={`mr-3 text-gray-500`}>{getIcon()}</div>
        <div style={{ width: "calc(100% - 80px)" }} className="flex-1">
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
