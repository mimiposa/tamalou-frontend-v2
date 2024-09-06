import localFont from 'next/font/local';
import './globals.css';

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
        <body className={`min-h-screen bg-gray-100 ${geistSans.variable} ${geistMono.variable}`}>
        <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <nav className="flex gap-6">
                <a href="/" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Home</a>
                <a href="/recipes" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Recipes</a>
                <a href="/login" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Login</a>
                <a href="/register" className="text-lg font-semibold text-gray-700 hover:text-blue-500">Register</a>
            </nav>
        </header>
        <main className="p-8">{children}</main>
        <footer className="bg-white py-4 px-8 text-center border-t border-gray-200">
            <p className="text-gray-500">&copy; 2024 Tamalou. All rights reserved.</p>
        </footer>
        </body>
        </html>
    );
}
