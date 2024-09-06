import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Tamalou</h1>
            <p className="text-lg text-gray-600 mb-8">
                Your personal essential oil recipe generator for everyday aches and pains.
            </p>
            <div className="flex gap-4">
                <Link href="/register" className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200">
                    Register
                </Link>
                <Link href="/login" className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-200">
                    Login
                </Link>
            </div>
        </div>
    );
}
