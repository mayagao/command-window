"use client";

import { useEffect, useRef } from "react";
import PrimitivePill from "../Primitives/PrimitivePill";
import Keys from "../Keys";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onPillClick: () => void;
  onCancel?: () => void;
  isSelectingContext?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  onPillClick,
  onCancel,
  isSelectingContext = false,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when view mode changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [isSelectingContext]);

  return (
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isSelectingContext
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
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onPillClick}
          >
            <PrimitivePill
              type="pr"
              number={14535}
              title="ADR for an Upload Service"
            />
            <Keys>⌘K</Keys>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
