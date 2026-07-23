import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: {
    default: "SONIC CARS — Location de Voiture à Oujda et Tanger | Maroc",
    template: "%s | SONIC CARS",
  },
  description:
    "Louez votre voiture à Oujda ou Tanger avec SONIC CARS. Flotte moderne, prix compétitifs, service premium. Réservez en ligne dès maintenant !",
  keywords: [
    "location voiture Oujda",
    "location voiture Tanger",
    "location voiture Maroc",
    "SONIC CARS",
    "rent a car Maroc",
    "location automobile Maroc",
  ],
  authors: [{ name: "SONIC CARS" }],
  creator: "SONIC CARS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "/",
    siteName: "SONIC CARS",
    title: "SONIC CARS — Location de Voiture à Oujda et Tanger",
    description:
      "Louez votre voiture à Oujda ou Tanger avec SONIC CARS. Flotte moderne, prix compétitifs, service premium.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SONIC CARS — Location de Voiture au Maroc",
    description: "Réservez votre voiture en ligne. Service premium à Oujda et Tanger.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
