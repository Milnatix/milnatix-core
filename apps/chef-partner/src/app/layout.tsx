import type { Metadata, Viewport } from 'next';
import './globals.css';
import GlobalAlert from '@/components/molecule/GlobalAlert';
import GlobalConfirmModal from '@/components/molecule/GlobalConfirmModal';

export const metadata: Metadata = {
  title: 'ChefPartner',
  description: 'Site de gerenciamento de pedidos',
};

export const viewport: Viewport = {
  themeColor: '#f91f37',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        {children}
        <GlobalAlert />
        <GlobalConfirmModal />
      </body>
    </html>
  );
}
