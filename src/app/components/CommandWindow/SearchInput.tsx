"use client";

import { useEffect, useRef, useState } from "react";
import PrimitivePill from "../Primitives/PrimitivePill";
import Keys from "../Keys";
import { Primitive } from "@/app/types/commands";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onPillClick: () => void;
  onCancel: () => void;
  isSelectingContext: boolean;
  currentPrimitive: Primitive;
  showPill?: boolean;
  isPillFocused?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  onPillClick,
  onCancel,
  isSelectingContext,
  currentPrimitive,
  showPill = true,
  isPillFocused: externalPillFocused,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [internalPillFocused, setInternalPillFocused] = useState(false);

  const isPillFocused = externalPillFocused ?? internalPillFocused;

  useEffect(() => {
    if (isSelectingContext || (!isPillFocused && showPill)) {
      inputRef.current?.focus();
    }
  }, [isSelectingContext, isPillFocused, showPill]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      pillRef.current?.focus();
    }
  };

  const handlePillFocus = () => {
    setInternalPillFocused(true);
    inputRef.current?.blur();
  };

  const handlePillBlur = () => {
    setInternalPillFocused(false);
  };

  const handlePillKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onPillClick();
    } else if (e.key === "Backspace" || e.key === "Delete") {
      onPillClick();
    }
  };

  return (
    <div className="relative flex items-center gap-2 px-3 py-2 border-b border-gray-200">
      {showPill && (
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
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder={
          !showPill
            ? "Select a new context"
            : isPillFocused
            ? "Press delete to remove context"
            : isSelectingContext
            ? "Select a different context"
            : "Search for PR actions"
        }
        className="w-full px-2 py-1 bg-transparent outline-none"
      />
      {isSelectingContext ? (
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 px-2 text-sm"
          >
            Cancel
          </button>
          <Keys>esc</Keys>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Keys>⌘K</Keys>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
