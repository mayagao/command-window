interface KeyProps {
  children: React.ReactNode;
}

export default function Key({ children }: KeyProps) {
  return (
    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded">
      {children}
    </kbd>
  );
}
