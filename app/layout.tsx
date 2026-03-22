import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Paraura — Skywalk Paragliders South Africa',
    template: '%s | Paraura',
  },
  description:
    'South Africa\'s official Skywalk paraglider distributor. Expert guidance for pilots at every level. Find your perfect wing.',
  keywords: [
    'Skywalk paraglider South Africa',
    'buy paraglider South Africa',
    'paragliding Cape Town',
    'XC flying South Africa',
    'paraglider distributor',
  ],
  openGraph: {
    title: 'Paraura — Skywalk Paragliders South Africa',
    description: 'Expert guidance. Premium equipment. South Africa\'s Skywalk specialist.',
    url: 'https://www.paraura.com',
    siteName: 'Paraura',
    locale: 'en_ZA',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
