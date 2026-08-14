import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { ModalProvider } from '@/context/ModalContext';
import { ToastContainer } from '@/components/ui/Toast';
import { EmergencyModal } from '@/components/shared/EmergencyModal';
import { WhatsAppModal } from '@/components/shared/WhatsAppModal';
import { LeadCaptureDrawer } from '@/components/shared/LeadCaptureDrawer';
import { TopNotificationBar } from '@/components/layout/TopNotificationBar';
import { Navbar } from '@/components/layout/Navbar';
import { EmergencyBar } from '@/components/layout/EmergencyBar';
import { Footer } from '@/components/layout/Footer';

export const viewport: Viewport = {
  themeColor: '#0D2329',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Aeterna Care — The Gold Standard in Elder Wellness & At-Home Care',
    template: '%s | Aeterna Care Senior Living & Healthcare'
  },
  description: 'Hospital-grade clinical home nursing, senior doctor visits, dementia care, and 24/7 emergency response across 12+ metro cities in India. Rated 4.96/5 by 12,000+ families.',
  keywords: [
    'elder care India',
    'senior citizen care at home',
    'home nursing Delhi Gurgaon Bangalore Mumbai',
    'geriatrician home visit',
    'dementia care India',
    'elder attendant live in',
    'emergency ambulance elderly',
    'physiotherapy for seniors',
    'Emoha alternative elder care'
  ],
  authors: [{ name: 'Aeterna Care Healthtech' }],
  creator: 'Aeterna Care',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aeternacare.com',
    title: 'Aeterna Care — Premium Senior Wellness & At-Home Clinical Care',
    description: 'Hospital-grade clinical home nursing, senior doctor visits, and 24/7 emergency response across 12+ cities in India.',
    siteName: 'Aeterna Care'
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
            <EmergencyBar />
            <ToastContainer />
            <EmergencyModal />
            <WhatsAppModal />
            <LeadCaptureDrawer />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
