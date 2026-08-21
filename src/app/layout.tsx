import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { ModalProvider } from '@/context/ModalContext';
import { ToastContainer } from '@/components/ui/Toast';
import { WhatsAppModal } from '@/components/shared/WhatsAppModal';
import { LeadCaptureDrawer } from '@/components/shared/LeadCaptureDrawer';
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
  title: {
    default: 'Senior Living Citizen Foundation — Plotted Sanctuary & Ayurvedic Hospital · Haryana',
    template: '%s | Senior Living Citizen Foundation'
  },
  description: '64 residential plots and 1 BHK/1 RK senior residences with an on-site 30,000 sq. ft. G+2 Ayurvedic Hospital and Mandir near Reliance MET City, SH-22 Jhajjar, Haryana.',
  keywords: [
    'Senior Living Citizen Foundation',
    'Senior living Haryana',
    'Ayurvedic hospital Jhajjar',
    'Reliance MET City plots',
    'Senior citizen plots Haryana',
    'Senior apartments Jhajjar Gurugram',
    'Elderly plotted township NCR',
    'Panchakarma senior living'
  ],
  authors: [{ name: 'Senior Living Citizen Foundation' }],
  creator: 'Senior Living Citizen Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://seniorlivingcitizensfoundation.com',
    title: 'Senior Living Citizen Foundation — A Home for the Second Half of Life',
    description: '64 residential plots with on-site Ayurvedic Hospital and Mandir near Reliance MET City, SH-22 Jhajjar, Haryana.',
    siteName: 'Senior Living Citizen Foundation'
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
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

