import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";


const mainFontFamily = Nunito_Sans({
  weight: ["300", "400", "600", "800"], 
  subsets: ["latin"], 
  display: "swap", 
});


export function generateMetadata(): Metadata {
  return {
    title: "REST Countries API",
    description: "API REST Countries com alternador de tema de cores",
    metadataBase: new URL("https://app-countries-tau.vercel.app/"),
    authors: [{ name: "João Bacalhau", url: "https://www.linkedin.com/in/joaobacalhau/" }],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </head>
      <body className={mainFontFamily.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
