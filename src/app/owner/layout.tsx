import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Owner Document Vault — Senior Living Citizens Foundation',
  description: 'Authorized access to official project title deeds, architectural CAD sets, and statutory approvals.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
