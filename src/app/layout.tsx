import type { Metadata } from "next";
import "./globals.css";
import { CommandUI } from "./components/CommandWindow";

export const metadata: Metadata = {
  title: "Command Window Prototype - Maya",
  description: "A brief description of your page.",
  icons: {
    icon: [
      { url: "static/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "static/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Command Window Prototype - Maya",
    description: "A brief description of your page.",
    images: [
      {
        url: "static/image.png",
        width: 1200,
        height: 630,
        alt: "An image description",
      },
    ],
    url: "https://example.com/your-page-url",
    type: "website",
  },
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CommandUI />
      </body>
    </html>
  );
}
