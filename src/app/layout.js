import { IBM_Plex_Serif, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import ClientThreeBackground from "@/components/ClientThreeBackground";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import "./globals.css";

const displayFont = IBM_Plex_Serif({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://cakirb.github.io'),
  title: "Batuhan Çakır | Senior Bioinformatician",
  description: "Senior Bioinformatician at Wellcome Sanger Institute specializing in single-cell RNA-seq analysis.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Batuhan Çakır | Senior Bioinformatician",
    description: "Senior Bioinformatician at Wellcome Sanger Institute specializing in single-cell RNA-seq analysis.",
    url: 'https://cakirb.github.io',
    siteName: 'Batuhan Çakır Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Batuhan Çakır Portfolio'
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Batuhan Çakır | Senior Bioinformatician",
    description: "Senior Bioinformatician at Wellcome Sanger Institute specializing in single-cell RNA-seq analysis.",
    creator: '@cakirb_',
    images: ['/og-image.jpg'],
  },
  alternates: {
    types: {
      'text/markdown': '/llms.txt',
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#111518',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Batuhan Çakır',
    url: 'https://cakirb.github.io',
    jobTitle: 'Senior Bioinformatician',
    worksFor: {
      '@type': 'Organization',
      name: 'Wellcome Sanger Institute'
    },
    sameAs: [
      'https://x.com/cakirb_',
      'https://linkedin.com/in/batuhancakir',
      'https://github.com/cakirb',
      'https://scholar.google.com/citations?user=iGaYmB4AAAAJ&hl=en',
      'https://orcid.org/0000-0003-4513-606X',
      'https://bsky.app/profile/cakirb.bsky.social'
    ]
  };

  return (
    <html lang="en" style={{ overflowX: 'hidden' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${jetbrainsMono.variable}`} style={{ overflowX: 'hidden', margin: 0, padding: 0 }}>
        <ClientThreeBackground />
        <Navbar />
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  );
}
