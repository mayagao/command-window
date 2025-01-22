"use client";

import { GearIcon } from "@primer/octicons-react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <span className="text-gray-600">Press Enter to ask Copilot</span>
      <span className="text-gray-600">
        <GearIcon size={16} />
      </span>
    </div>
  );
};

export default Footer;
