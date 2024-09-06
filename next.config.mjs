/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return process.env.NODE_ENV === 'development'
            ? [
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:5000/api/:path*', // Proxy to Backend in Development
                },
            ]
            : [];
    },
};

export default nextConfig;
