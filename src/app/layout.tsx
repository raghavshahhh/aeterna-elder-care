import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';

import { ModalProvider } from '@/context/ModalContext';
import { ToastContainer } from '@/components/ui/Toast';
import { WhatsAppModal } from '@/components/shared/WhatsAppModal';
import { LeadCaptureDrawer } from '@/components/shared/LeadCaptureDrawer';
import { FloorPlanModal } from '@/components/modals/FloorPlanModal';
import { ReferralTracker } from '@/components/shared/ReferralTracker';
import { TopNotificationBar } from '@/components/layout/TopNotificationBar';
import { Navbar } from '@/components/layout/Navbar';
import { QuickContactBar } from '@/components/layout/QuickContactBar';
import { Footer } from '@/components/layout/Footer';

export const viewport: Viewport = {
  themeColor: '#0D2329',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aeterna-elder-care.vercel.app'),
  title: {
    default: 'Senior Living Citizens Foundation — Plotted Sanctuary & Ayurvedic Hospital · Haryana',
    template: '%s | Senior Living Citizens Foundation'
  },
  description: '64 residential plots and 1 BHK/1 RK senior residences with an on-site 30,000 sq. ft. G+2 Ayurvedic Hospital and Mandir near Reliance MET City, SH-22 Jhajjar, Haryana.',
  keywords: [
    'Senior Living Citizens Foundation',
    'Senior living Haryana',
    'Ayurvedic hospital Jhajjar',
    'Reliance MET City plots',
    'Senior citizen plots Haryana',
    'Senior apartments Jhajjar Gurugram',
    'Elderly plotted township NCR',
    'Panchakarma senior living'
  ],
  authors: [{ name: 'Senior Living Citizens Foundation' }],
  creator: 'Senior Living Citizens Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Senior Living Citizens Foundation',
    images: [
      {
        url: '/project-assets/brand/logo-full-trimmed.png',
        width: 1200,
        height: 630,
        alt: 'Senior Living Citizens Foundation'
      }
    ]
  },
  icons: {
    icon: [
      { url: '/project-assets/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/project-assets/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/project-assets/brand/favicon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/project-assets/brand/favicon-192.png', sizes: '192x192', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#142126] font-sans antialiased selection:bg-[#C58F58]/20 selection:text-[#0D2329]">
        <ToastProvider>
          <ModalProvider>
            <TopNotificationBar />
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <QuickContactBar />
            <ToastContainer />
            <WhatsAppModal />
            <LeadCaptureDrawer />
            <FloorPlanModal />
            <ReferralTracker />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

