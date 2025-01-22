interface ListContainerProps {
  children: React.ReactNode;
}

export function ListContainer({ children }: ListContainerProps) {
  return (
    <div className="overflow-y-auto px-3 py-2 max-h-[244px]">
      <div role="listbox" aria-label="Options list">
        {children}
      </div>
    </div>
  );
}
