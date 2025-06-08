import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo, Noto_Sans_Arabic, Amiri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "600"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arabizi - Arabic Keyboard Online | كيبورد عربي | Clavier Arabe",
  description: "Professional Arabic keyboard with AI transliteration. Convert English/Franco-Arabic to Arabic instantly. كيبورد عربي ذكي للكتابة بالعربية. Clavier arabe intelligent avec translittération automatique.",
  keywords: [
    // English keywords
    "arabic keyboard", "arabic typing", "arabic transliteration", "english to arabic", 
    "franco arabic", "yamli", "arabic converter", "online arabic keyboard",
    "arabic text editor", "arabic writing tool", "arabic input method",
    "arabic script", "arabic language", "middle east keyboard",
    
    // Arabic keywords  
    "كيبورد عربي", "لوحة مفاتيح عربية", "كتابة عربية", "تحويل انجليزي عربي",
    "فرانكو عربي", "يملي", "محول عربي", "كيبورد عربي اون لاين",
    "محرر نصوص عربي", "أداة كتابة عربية", "طريقة إدخال عربية",
    "خط عربي", "لغة عربية", "لوحة مفاتيح شرق أوسط",
    
    // French keywords
    "clavier arabe", "saisie arabe", "translittération arabe", "anglais vers arabe",
    "franco arabe", "convertisseur arabe", "clavier arabe en ligne",
    "éditeur de texte arabe", "outil d'écriture arabe", "méthode de saisie arabe",
    "script arabe", "langue arabe", "clavier moyen-orient"
  ],
  authors: [{ name: "Arabizi Team" }],
  creator: "Arabizi",
  publisher: "Arabizi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'fr_FR'],
    url: 'https://arabizi.com',
    siteName: 'Arabizi - Arabic Keyboard Online',
    title: 'Arabizi - Professional Arabic Keyboard | كيبورد عربي | Clavier Arabe',
    description: 'Professional Arabic keyboard with AI transliteration. Convert English/Franco-Arabic to Arabic instantly. كيبورد عربي ذكي للكتابة بالعربية.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arabizi Arabic Keyboard Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arabizi - Arabic Keyboard Online | كيبورد عربي',
    description: 'Professional Arabic keyboard with AI transliteration. Convert English to Arabic instantly.',
    images: ['/twitter-image.jpg'],
    creator: '@arabizi',
  },
  alternates: {
    canonical: 'https://arabizi.com',
    languages: {
      'en-US': 'https://arabizi.com',
      'ar-SA': 'https://arabizi.com/ar',
      'fr-FR': 'https://arabizi.com/fr',
    },
  },
  category: 'Technology',
  classification: 'Language Tools',
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href="https://arabizi.com" />
        <link rel="alternate" hrefLang="ar" href="https://arabizi.com/ar" />
        <link rel="alternate" hrefLang="fr" href="https://arabizi.com/fr" />
        <link rel="alternate" hrefLang="x-default" href="https://arabizi.com" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${notoSansArabic.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
