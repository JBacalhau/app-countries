import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";

// Fonte
const mainFontFamily = Nunito_Sans({
  weight: ["300", "400", "600", "800"], // Adicione todos os pesos usados
  subsets: ["latin"], // Certifique-se de que o subset está correto
  display: "swap", // Opção recomendada para evitar problemas de carregamento
});

// Função para gerar metadados
export function generateMetadata(): Metadata {
  return {
    title: "REST Countries API",
    description: "API REST Countries com alternador de tema de cores",
    metadataBase: new URL("https://app-countries-copia-2.vercel.app/"), // Use o domínio correto aqui
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
        <ThemeProvider> {/* Envolva a árvore de componentes com ThemeProvider */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
