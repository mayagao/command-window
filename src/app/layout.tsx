"use client";

import "./globals.css";
import { CommandUI } from "./components/CommandWindow";
import { APIContent } from "./components/APIContent";

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CommandUI />
        <APIContent />
      </body>
    </html>
  );
}
