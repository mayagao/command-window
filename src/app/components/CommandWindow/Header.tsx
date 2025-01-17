"use client";

import { ChevronLeftIcon, XIcon, RepoIcon } from "@primer/octicons-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 text-gray-500">
          <RepoIcon />
          <span className="fs-small">copilot-api</span>
        </button>
      </div>
      <button className="text-gray-500 hover:text-gray-700">
        <XIcon size={16} />
      </button>
    </div>
  );
};

export default Header;
