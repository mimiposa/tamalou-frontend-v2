// src/app/layout.js

import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Sidebar from "@/components/Sidebar";
import ClientWrapper from "@/app/ClientWrapper";
import {RecipeProvider} from "@/context/RecipeContext";

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


            <body className={`bg-white flex overflow-y-auto scroll-auto ${geistSans.variable} ${geistMono.variable}`}>
                <AuthProvider>
                        <ClientWrapper>
                    <RecipeProvider> {/* Wrap the entire layout with RecipeProvider */}
                        {/* Sidebar Component (Client Component) */}
                        <Sidebar />
                        {/* Main Content */}
                        <main className="flex-1 md:p-4">
                            {children}
                        </main>
                    </RecipeProvider>
                    </ClientWrapper>
                </AuthProvider>
            </body>


        </html>
    );
}
