"use client";

import {
  ChevronLeftIcon,
  XIcon,
  RepoIcon,
  DeviceMobileIcon,
} from "@primer/octicons-react";
import { Primitive } from "@/app/types/commands";
import PrimitivePill from "../Primitives/PrimitivePill";
import { ViewMode } from "./types";

interface HeaderProps {
  viewMode: ViewMode;
  onBack?: () => void;
  currentPrimitive?: Primitive;
}

export default function Header({
  viewMode,
  onBack,
  currentPrimitive,
}: HeaderProps) {
  if (viewMode === "loading" || viewMode === "command-result") {
    return (
      <div className="flex items-center gap-2 p-3 border-b border-gray-200">
        <button onClick={onBack} className="p-1 rounded hover:bg-gray-100">
          <ChevronLeftIcon size={16} />
        </button>
        <PrimitivePill
          type={currentPrimitive?.type || "pr"}
          title={currentPrimitive?.title || ""}
          number={currentPrimitive?.number}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 border-b border-gray-200 fs-small text-gray-500">
      <RepoIcon size={16} />
      <span className="font-medium">copilot-api</span>
    </div>
  );
}
