"use client";

import { ChevronLeftIcon, XIcon, SearchIcon } from "@primer/octicons-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <button className="p-1">
          <ChevronLeftIcon size={16} />
        </button>
        <div className="flex items-center gap-2">
          <SearchIcon size={16} className="text-gray-600" />
          <span>copilot-api</span>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-700">
        <XIcon size={16} />
      </button>
    </div>
  );
};

export default Header;
