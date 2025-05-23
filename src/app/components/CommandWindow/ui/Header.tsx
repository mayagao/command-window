"use client";

import {
  ChevronLeftIcon,
  XIcon,
  RepoIcon,
  PinIcon,
} from "@primer/octicons-react";
import { Primitive } from "@/app/types/commands";
import PrimitivePill from "../ui/PrimitivePill";
import { ViewMode } from "@/app/types/types";
import { GITHUB_OWNER, GITHUB_REPO } from "../../../data/constants";

interface HeaderProps {
  viewMode: ViewMode;
  onBack: () => void;
  onClose: () => void;
  onPinToggle: () => void;
  isPinned: boolean;
  currentPrimitive?: Primitive;
  selectedRepository?: string;
  setViewMode: (mode: ViewMode) => void;
}

export default function Header({
  viewMode,
  onBack,
  onClose,
  onPinToggle,
  isPinned,
  currentPrimitive,
  selectedRepository,
  setViewMode,
}: HeaderProps) {
  const getTitle = () => {
    if (viewMode === "repository-select") {
      return "Select Repository";
    }
    return selectedRepository || `${GITHUB_OWNER} / ${GITHUB_REPO}`;
  };

  const handlePinClick = () => {
    onPinToggle();
  };

  if (viewMode === "loading" || viewMode === "command-result") {
    return (
      <div className="flex items-center justify-between px-3 h-[40px] border-b border-gray-200 ">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="h-[24px] w-[24px] flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ChevronLeftIcon size={16} />
          </button>
          <PrimitivePill
            type={currentPrimitive?.type || "pr"}
            title={currentPrimitive?.title || ""}
            number={currentPrimitive?.number}
            variant="header"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePinClick}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isPinned ? "Expand window" : "Minimize to bar"}
          >
            <PinIcon size={16} />
          </button>
          <button
            onClick={onClose}
            className="h-[24px] w-[24px] flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <XIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-3 h-[40px] border-b border-gray-200 text-gray-500 fs-small">
      <button
        onClick={() => setViewMode("repository-select")}
        className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
      >
        <RepoIcon className="mr-1" size={14} />
        <span>{getTitle()}</span>
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePinClick}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isPinned ? "Expand window" : "Minimize to bar"}
        >
          <PinIcon size={16} />
        </button>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
