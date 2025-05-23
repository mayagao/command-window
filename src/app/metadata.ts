import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Window Prototype - Maya",
  description: "A brief description of your page.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Command Window Prototype - Maya",
    description: "A brief description of your page.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "An image description",
      },
    ],
    url: "https://example.com/your-page-url",
    type: "website",
  },
};
