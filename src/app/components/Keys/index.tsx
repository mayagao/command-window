"use client";

interface KeysProps {
  children: React.ReactNode;
}

const Keys = ({ children }: KeysProps) => {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-medium">
      {children}
    </span>
  );
};

export default Keys;
