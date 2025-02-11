import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NADs - Documentation System',
  description: 'Documentation system for NADs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <>
          <div>
            <Navbar />
          </div>
          <div className='mt-16'>
            {children}
          </div>
        </>
      </body>
    </html>
  );
}