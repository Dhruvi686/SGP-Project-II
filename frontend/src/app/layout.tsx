import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ladakh Tourism',
  description: 'Explore Ladakh with the smart travel companion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
