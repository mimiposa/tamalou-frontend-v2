// src/app/layout.js

import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import NavLinks from "@/components/NavLinks";
import Sidebar from "@/components/Sidebar"; // Import the new Sidebar component

// Load custom fonts
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata = {
    title: 'Tamalou - Essential Oil Recipes',
    description: 'Personalized essential oil recipes for everyday aches and pains',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`min-h-screen-layout bg-white flex h-screen overflow-y-auto scroll-auto md:overflow-y-hidden ${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>

            {/* Sidebar Component (Client Component) */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 md:p-4">
                {children}
            </main>

        </AuthProvider>
        </body>
        </html>
    );
}
