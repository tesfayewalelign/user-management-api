import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My CRUD App',
  description: 'Frontend for user management system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <header className="sticky top-0 z-50 bg-blue-700 shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold tracking-wide text-white select-none">
               My User Management App
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
