import { CommandList } from "./CommandList";
import { CategoryList } from "./CategoryList";
import { Shimmer } from "./Shimmer";
import { ViewMode } from "./types";
import { Command, Primitive } from "@/app/types/commands";
import { PrimitiveItem } from "@/app/data/primitives";
import { TooltipArea } from "./TooltipArea";

interface ContentProps {
  viewMode: ViewMode;
  selectedCommand?: Command | null;
  selectedIndex: number;
  currentPrimitive: Primitive;
  getCurrentItems: () => any[];
  selectedCategory?: string | null;
  onSelect: (command: Command) => void;
  onSelectCategory: (category: string) => void;
  onPrimitiveSelect: (item: PrimitiveItem) => void;
  highlightMatches: (text: string) => React.ReactNode;
  onItemFocus: (index: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
  searchQuery: string;
}

export function Content({
  viewMode,
  selectedCommand,
  selectedIndex,
  currentPrimitive,
  getCurrentItems,
  selectedCategory,
  onSelect,
  onSelectCategory,
  onPrimitiveSelect,
  highlightMatches,
  onItemFocus,
  inputRef,
  isLoading = false,
  searchQuery,
}: ContentProps) {
  const items = getCurrentItems();

  if (isLoading) {
    return (
      <div className="px-4 py-2">
        <Shimmer />
      </div>
    );
  }

  switch (viewMode) {
    case "loading":
      return (
        <div>
          <Shimmer />
          <TooltipArea
            showDefaultMessage={true}
            isCommand={false}
            viewMode={viewMode}
          />
        </div>
      );

    case "command-result":
      const isFollowUpQuestion = selectedCommand?.title.includes("?");

      return (
        <>
          <div className="px-5 py-4">
            <div className="">
              <span className="text-gray-700">{selectedCommand?.title}</span>
            </div>
            <div className="mt-3">
              <div className="">
                <div>
                  <div className="font-medium fs-small text-gray-500 mb-2">
                    Output
                  </div>
                  <ol className="space-y-3">
                    {isFollowUpQuestion ? (
                      // Follow-up question content (LSP specification details)
                      <>
                        <li>
                          <strong>Context Provider Registration:</strong>{" "}
                          Context providers are registered via a new LSP method
                          after the client initializes the Copilot Language
                          Server. The registration involves specifying an ID and
                          a document selector.
                        </li>
                        <li>
                          <strong>Data Exchange:</strong> Context is managed
                          client-side, with caching and refreshing handled by
                          the client. Up-to-date context is included in
                          completion requests under a new top-level field called
                          additionalContext. If context is unavailable due to an
                          error or update, it should be omitted or marked as
                          updating.
                        </li>
                        <li>
                          <strong>Integration Details:</strong> The Copilot
                          Language Server Context Provider API LSP Specification
                          document outlines the integration of the Context
                          Provider API into the Copilot Language Server (CLS)
                          using the Language Server Protocol (LSP). This aims to
                          enhance context accuracy and speed.
                        </li>
                      </>
                    ) : (
                      // Initial command content (summary of changes)
                      <>
                        <li>
                          <strong>Documentation Enhancements:</strong> Added a
                          new ADR for the context provider LSP specification and
                          updated various ADRs and documentation files.
                        </li>
                        <li>
                          <strong>Readme Improvements:</strong> Cleaned up and
                          organized the README.md file, including removing
                          redundant lines, improving the nesting in sections
                          related to "Core Productivity" and "CIP", and updating
                          the content for "Applied Science" and "Models".
                        </li>
                        <li>
                          <strong>Structural Changes:</strong> Added a new
                          column named "o3-mini" for better organization.
                        </li>
                      </>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <TooltipArea
            showDefaultMessage={true}
            isCommand={false}
            viewMode={viewMode}
          />
        </>
      );

    case "categories":
      return (
        <CategoryList
          categories={items as PrimitiveItem[]}
          selectedCategory={selectedCategory || ""}
          onSelectCategory={onSelectCategory}
          selectedIndex={selectedIndex}
          showSuffixIcon={true}
          onItemFocus={onItemFocus}
          highlightMatches={highlightMatches}
          searchQuery={searchQuery}
        />
      );

    case "category-items":
      return (
        <CategoryList
          categories={items as PrimitiveItem[]}
          selectedCategory={selectedCategory || ""}
          onSelectCategory={onSelectCategory}
          selectedIndex={selectedIndex}
          showSuffixIcon={false}
          onItemFocus={onItemFocus}
          highlightMatches={highlightMatches}
          searchQuery={searchQuery}
        />
      );

    default:
      return (
        <CommandList
          commands={items as Command[]}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          highlightMatches={highlightMatches}
          onItemFocus={onItemFocus}
          inputRef={inputRef}
          currentContext={currentPrimitive.type}
        />
      );
  }
}
