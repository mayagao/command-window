"use client";

import { useState, useEffect } from "react";
import { ListItem } from "../list/ListItem";

interface FollowUpQuestionsProps {
  onSelectQuestion: (question: string) => void;
  isVisible: boolean;
}

const FOLLOW_UP_QUESTIONS = [
  "Need more details on the documentation updates?",
  "Want to see changes in the README.md file?",
  "Questions about the new ADR or LSP spec?",
];

export default function FollowUpQuestions({
  onSelectQuestion,
  isVisible,
}: FollowUpQuestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (isVisible) {
      // Select first question when popover opens
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < FOLLOW_UP_QUESTIONS.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            onSelectQuestion(FOLLOW_UP_QUESTIONS[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setSelectedIndex(-1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, selectedIndex, onSelectQuestion]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg -mt-2 ml-3.5 w-[480px] px-3 py-2 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {FOLLOW_UP_QUESTIONS.map((question, index) => (
        <ListItem
          key={index}
          index={index}
          title={question}
          isSelected={index === selectedIndex}
          onClick={() => onSelectQuestion(question)}
          onFocus={(idx) => setSelectedIndex(idx)}
        />
      ))}
    </div>
  );
}
