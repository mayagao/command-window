import { PinIcon } from "@primer/octicons-react";

interface ListContainerProps {
  isPinned: boolean;
  onPinToggle: () => void;
  children: React.ReactNode;
}

export function ListContainer({
  isPinned,
  onPinToggle,
  children,
  ...props
}: ListContainerProps) {
  return (
    <div>
      <div className="overflow-y-auto px-3 py-2 max-h-[244px]">
        <div role="listbox" aria-label="Options list">
          {children}
        </div>
      </div>
    </div>
  );
}
