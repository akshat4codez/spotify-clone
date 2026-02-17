import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Spotify Clone | YouTube Audio',
  description: 'Spotify style full-stack clone with YouTube playback'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
