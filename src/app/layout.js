import { Space_Grotesk, DM_Sans, JetBrains_Mono, Istok_Web } from "next/font/google";
import Navbar from "@/components/Navbar";
import ClientAsciiBackground from "@/components/ClientAsciiBackground";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const istokWeb = Istok_Web({
  weight: ['400', '700'],
  variable: "--font-istok-web",
  subsets: ["latin"],
});

export const metadata = {
  title: "Batuhan Cakir | Senior Bioinformatician",
  description: "Senior Bioinformatician at Wellcome Sanger Institute specializing in single-cell RNA-seq analysis.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ overflowX: 'hidden' }}>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${istokWeb.variable}`} style={{ overflowX: 'hidden', margin: 0, padding: 0 }}>
        <ClientAsciiBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
