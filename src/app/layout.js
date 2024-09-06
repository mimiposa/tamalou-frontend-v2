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

// Set page metadata
export const metadata = {
    title: 'Tamalou - Essential Oil Recipes',
    description: 'Personalized essential oil recipes for everyday aches and pains',
};

// Main layout component
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
            <nav>
                <a href="/">Home</a>
                <a href="/recipes">Recipes</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </nav>
        </header>
        <main>{children}</main>
        <footer>
            <p>&copy; 2024 Tamalou. All rights reserved.</p>
        </footer>
        </body>
        </html>
    );
}
