import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Tamalou</h1>
            <p>Your personal essential oil recipe generator for everyday aches and pains.</p>
            <Link href="/register"><a>Get Started</a></Link>
        </div>
    );
};

export default Home;
