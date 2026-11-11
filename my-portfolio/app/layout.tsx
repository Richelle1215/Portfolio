'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Extended structured data for AI Overview
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://richelle-portfolio.com#person",
    name: "Richelle Mendez",
    alternateName: ["Richelle Aguilar Mendez", "Richelle A. Mendez", "Richelle Aguilar"],
    url: "https://richelle-portfolio.com",
    image: "https://richelle-portfolio.com/ID.png",
    description: "Richelle Aguilar Mendez - Full-Stack Developer, IT Student, Web Developer & Software QA Enthusiast. Specializing in Laravel, React, Next.js, and Kotlin.",
    jobTitle: [
      "Full-Stack Developer",
      "Web Developer",
      "Mobile Application Developer",
      "Quality Assurance Professional",
      "IT Student"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed / Personal Projects",
      url: "https://richelle-portfolio.com",
    },
    knowsAbout: [
      "Laravel",
      "Blade",
      "PHP",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Kotlin",
      "Android Development",
      "MySQL",
      "PostgreSQL",
      "Web Development",
      "Mobile App Development",
      "Software Testing",
      "Quality Assurance",
      "Full-Stack Development",
      "REST APIs",
      "Database Design",
    ],
    email: "richellemendez35@gmail.com",
    telephone: "+63 935 585 0874",
    sameAs: [
      "https://github.com/Richelle1215",
      "https://www.linkedin.com/in/richelle1215/",
      "https://www.facebook.com/richelle.mendez",
    ],
    location: {
      "@type": "Place",
      name: "Daet, Camarines Norte, Bicol Region, Philippines",
    },
    birthDate: "YYYY-MM-DD", // Optional: add actual date if comfortable
    jobLocation: {
      "@type": "Place",
      name: "Remote / Philippines",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Degree",
        name: "Bachelor of Science in Information Technology",
        issuedBy: {
          "@type": "EducationalOrganization",
          name: "Our Lady of Lourdes College Foundation",
          url: "https://ollcf.edu.ph",
        },
        validFrom: "2023",
        validUntil: "Present",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Data Analysis and Reporting via Spreadsheet",
        issuedBy: {
          "@type": "Organization",
          name: "ICT Literacy and Competency Development Bureau",
        },
        dateIssued: "2026-09-14",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Web Dev 101: Web Deployment | Go Live with Vercel",
        issuedBy: {
          "@type": "Organization",
          name: "UpskillTechPH Training Services",
        },
        dateIssued: "2026-08",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "QA 101: Software Testing | The Tech Job Nobody Talks About",
        issuedBy: {
          "@type": "Organization",
          name: "UpskillTechPH Training Services",
        },
        dateIssued: "2026-08",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Richelle Mendez Portfolio",
    url: "https://richelle-portfolio.com",
    description: "Professional portfolio of Richelle Mendez, Full-Stack Developer and IT Student",
    creator: {
      "@type": "Person",
      name: "Richelle Mendez",
      url: "https://richelle-portfolio.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://richelle-portfolio.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://richelle-portfolio.com#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: "https://richelle-portfolio.com#projects",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Experience",
        item: "https://richelle-portfolio.com#experience",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Education",
        item: "https://richelle-portfolio.com#education",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Certificates",
        item: "https://richelle-portfolio.com#certificates",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Contact",
        item: "https://richelle-portfolio.com#contact",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0015" />
        
        {/* Core SEO Meta Tags */}
        <meta name="description" content="Richelle Mendez - Full-Stack Developer, IT Student, Web Developer & Software QA Enthusiast. Expertise in Laravel, React, Next.js, Kotlin, and mobile development. View projects, certifications, and experience." />
        <meta name="keywords" content="Richelle Mendez, full-stack developer, web developer, mobile developer, Laravel, React, Next.js, Kotlin, Android, IT student, QA, software testing, portfolio" />
        <meta name="author" content="Richelle Mendez" />
        <meta name="creator" content="Richelle Mendez" />
        
        {/* Contact Information */}
        <meta name="contact" content="richellemendez35@gmail.com" />
        <meta name="phone" content="+63 935 585 0874" />
        <meta name="location" content="Daet, Camarines Norte, Bicol Region, Philippines" />
        
        {/* Social & Verification */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph - Social Sharing */}
        <meta property="og:title" content="Richelle Mendez | Full-Stack Developer & IT Student" />
        <meta property="og:description" content="Full-stack developer specializing in Laravel, React, Next.js, and mobile app development. Explore projects, certifications, and professional experience." />
        <meta property="og:url" content="https://richelle-portfolio.com" />
        <meta property="og:site_name" content="Richelle Mendez Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://richelle-portfolio.com/ID.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Richelle Mendez | Full-Stack Developer" />
        <meta name="twitter:description" content="Full-stack developer specializing in Laravel, React, and mobile app development" />
        <meta name="twitter:image" content="https://richelle-portfolio.com/ID.png" />
        
        {/* Canonical & Alt Lang */}
        <link rel="canonical" href="https://richelle-portfolio.com" />
        <link rel="alternate" hrefLang="en" href="https://richelle-portfolio.com" />
        <link rel="alternate" hrefLang="fil" href="https://richelle-portfolio.com/fil" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="google81d92ac71d8b8b31" />
        
        {/* JSON-LD Structured Data for AI Overview */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
