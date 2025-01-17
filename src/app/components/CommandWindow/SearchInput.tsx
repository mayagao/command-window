"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import PrimitivePill from "../Primitives/PrimitivePill";
import Keys from "../Keys";
import { Primitive } from "@/app/types/commands";
import { ChevronLeftIcon } from "@primer/octicons-react";
import FollowUpQuestions from "./FollowUpQuestions";
import { ViewMode } from "./types";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onPillClick: () => void;
  onCancel: () => void;
  onBack?: () => void;
  isSelectingContext: boolean;
  currentPrimitive: Primitive;
  showPill?: boolean;
  isPillFocused?: boolean;
  showBackButton?: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  disabled?: boolean;
  selectedCommand?: Command | null;
  handleSearch: (query: string) => Promise<void>;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onPillClick,
      onCancel,
      onBack,
      isSelectingContext,
      currentPrimitive,
      showPill = true,
      isPillFocused: externalPillFocused,
      showBackButton = false,
      viewMode,
      setViewMode,
      disabled = false,
      selectedCommand,
      handleSearch,
    },
    ref
  ) => {
    const pillRef = useRef<HTMLDivElement>(null);
    const [internalPillFocused, setInternalPillFocused] = useState(false);
    const [lastBackspace, setLastBackspace] = useState<number | null>(null);
    const [isBackspaceActive, setIsBackspaceActive] = useState(false);
    const [showFollowUp, setShowFollowUp] = useState(false);

    const isPillFocused = externalPillFocused ?? internalPillFocused;

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value === "") {
        e.preventDefault();
        const now = Date.now();

        // Only handle double backspace in category-items view
        if (showBackButton) {
          if (isBackspaceActive) {
            // If back button is already highlighted, trigger back action
            if (onBack) {
              onBack();
            }
            setLastBackspace(null);
            setIsBackspaceActive(false);
          } else {
            // First backspace - highlight back button
            setLastBackspace(now);
            setIsBackspaceActive(true);
          }
        } else {
          // In other views, just focus the pill
          pillRef.current?.focus();
        }
      }

      // Only show follow-up in command-result view
      if (e.key === "/" && viewMode === "command-result") {
        e.preventDefault();
        setShowFollowUp(true);
      }
    };

    // Reset backspace states when input changes
    useEffect(() => {
      setLastBackspace(null);
      setIsBackspaceActive(false);
    }, [value]);

    const handlePillFocus = () => {
      setInternalPillFocused(true);
    };

    const handlePillBlur = () => {
      setInternalPillFocused(false);
    };

    const handlePillKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        onPillClick();
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        if (showBackButton && onBack) {
          onBack();
        } else {
          onPillClick();
        }
      }
    };

    // Focus input on mount
    useEffect(() => {
      if (ref && "current" in ref) {
        ref.current?.focus();
      }
    }, []); // Empty dependency array means this runs once on mount

    const handleQuestionSelect = (question: string) => {
      onChange(question);
      setShowFollowUp(false);
      // Trigger loading state and update
      if (selectedCommand) {
        setViewMode("loading");
        handleSearch(question);
      }
    };

    // Add click handler to hide follow-up when clicking outside
    useEffect(() => {
      const handleClickOutside = () => {
        setShowFollowUp(false);
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
      <div
        className={`relative flex items-center gap-2 px-3 py-2 border-b border-gray-200 ${
          disabled && "bg-gray-50"
        }`}
      >
        {showBackButton && !disabled && (
          <button
            onClick={onBack}
            className={`p-1 rounded-md transition-colors ${
              isBackspaceActive
                ? "ring-2 ring-blue-500 ring-offset-1"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeftIcon size={16} />
          </button>
        )}
        {showPill && !disabled && (
          <div
            ref={pillRef}
            onClick={onPillClick}
            className={`cursor-pointer rounded transition-all ${
              isPillFocused ? "ring-2 ring-blue-500 ring-offset-1" : ""
            }`}
            role="button"
            tabIndex={0}
            onFocus={handlePillFocus}
            onBlur={handlePillBlur}
            onKeyDown={handlePillKeyDown}
          >
            <PrimitivePill
              type={currentPrimitive.type}
              title={currentPrimitive.title}
              number={currentPrimitive.number}
            />
          </div>
        )}
        <div className="flex-1 flex items-center">
          <input
            ref={ref}
            type="text"
            value={disabled && selectedCommand ? selectedCommand.title : value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={disabled}
            placeholder={
              viewMode === "command-result"
                ? "Ask a follow up or press / for suggestions"
                : !showPill
                ? "Search code, issues, PRs..."
                : "Ask Copilot to..."
            }
            className={`w-full px-2 py-1 outline-none text-[14px] rounded ${
              disabled ? "text-gray-500 bg-gray-50" : "bg-transparent"
            }`}
          />
          {disabled && (
            <button
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-700 px-2"
            >
              Pause
            </button>
          )}
        </div>
        {viewMode === "command-result" && (
          <FollowUpQuestions
            isVisible={showFollowUp}
            onSelectQuestion={handleQuestionSelect}
          />
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
