import Navbar from '@/components/client/Navbar';
import ReactQueryProvider from '@/components/client/providers/ReactQueryProvider';
import ReduxProvider from '@/components/client/providers/ReduxProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <div className="max-w-6xl mx-auto p-4 min-h-[100vh] flex flex-col justify-center items-center">
              <Navbar />
              <div className="bg-slate-400 min-w-full rounded-lg p-5 my-5">{children}</div>
            </div>
            <ReactQueryDevtools />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
