"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import PrimitivePill from "../ui/PrimitivePill";
import { Command, Primitive } from "@/app/types/commands";
import { ChevronLeftIcon } from "@primer/octicons-react";
import FollowUpQuestions from "./FollowUpQuestions";
import { ViewMode } from "@/app/types/types";

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
  disabled?: boolean;
  selectedCommand?: Command | null;
  setSelectedCommand: (command: Command | null) => void;
  setViewMode: (mode: ViewMode) => void;
  handleSearch: (query: string) => Promise<void>;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ viewMode, value, onChange, ...props }, ref) => {
    const pillRef = useRef<HTMLDivElement>(null);
    const [internalPillFocused, setInternalPillFocused] = useState(false);
    const [lastBackspace, setLastBackspace] = useState<number | null>(null);
    const [isBackspaceActive, setIsBackspaceActive] = useState(false);
    const [showFollowUp, setShowFollowUp] = useState(false);

    const isPillFocused = props.isPillFocused ?? internalPillFocused;

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value === "") {
        e.preventDefault();
        const now = Date.now();

        // Only handle double backspace in category-items view
        if (props.showBackButton) {
          if (isBackspaceActive) {
            // If back button is already highlighted, trigger back action
            if (props.onBack) {
              props.onBack();
            }
            setLastBackspace(null);
            setIsBackspaceActive(false);
            console.log("setLastBackspace", lastBackspace);
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
        props.onPillClick();
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        if (props.showBackButton && props.onBack) {
          props.onBack();
        } else {
          props.onPillClick();
        }
      }
    };

    // Focus input on mount
    useEffect(() => {
      if (ref && "current" in ref) {
        ref.current?.focus();
      }
    }, [ref]);

    const handleQuestionSelect = (question: string) => {
      // Update command title immediately
      if (props.selectedCommand) {
        props.setSelectedCommand({
          ...props.selectedCommand,
          title: question,
        });
      }

      // Then trigger loading state and search
      props.setViewMode("loading");
      props.handleSearch(question);
      setShowFollowUp(false);
    };

    // Add click handler to hide follow-up when clicking outside
    useEffect(() => {
      const handleClickOutside = () => {
        setShowFollowUp(false);
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const getPlaceholderText = () => {
      if (viewMode === "repository-select") {
        return "Select a repository...";
      }
      if (viewMode === "command-result") {
        return "Ask a follow up or press / for suggestions";
      }
      if (!props.showPill) {
        return "Search code, issues, PRs...";
      }
      return "Ask Copilot to...";
    };

    useEffect(() => {
      // Clear input when entering repository select mode
      if (viewMode === "repository-select") {
        onChange("");
      }
    }, [viewMode, onChange]);

    const shouldShowPill = () => {
      return (
        props.showPill && !props.disabled && viewMode !== "repository-select"
      );
    };

    return (
      <div
        className={`relative flex items-center gap-2 px-3 py-2 border-b border-gray-200 ${
          props.disabled && "bg-gray-50"
        }`}
      >
        {props.showBackButton && !props.disabled && (
          <button
            onClick={props.onBack}
            className={`p-1 rounded-md transition-colors ${
              isBackspaceActive
                ? "ring-2 ring-blue-500 ring-offset-1"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeftIcon size={16} />
          </button>
        )}
        {shouldShowPill() && (
          <div
            ref={pillRef}
            onClick={props.onPillClick}
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
              type={props.currentPrimitive?.type || "file"}
              title={props.currentPrimitive?.title}
              number={props.currentPrimitive?.number}
            />
          </div>
        )}
        <div className="flex-1 flex items-center">
          <input
            ref={ref}
            type="text"
            value={
              props.disabled && props.selectedCommand
                ? props.selectedCommand.title
                : value
            }
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={props.disabled}
            placeholder={getPlaceholderText()}
            className={`w-full px-2 py-1 outline-none text-[14px] rounded ${
              props.disabled ? "text-gray-500 bg-gray-50" : "bg-transparent"
            }`}
          />
          {props.disabled && (
            <button
              onClick={props.onCancel}
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
