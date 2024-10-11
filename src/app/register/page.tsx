'use client';

import {useState, FormEvent, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import {AppDispatch, RootState} from '../../redux/store';
import {checkUserSession, register} from '../../redux/slices/authSlice';
import {name} from "ts-interface-checker"; // Correctly import the async thunk

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch for thunks

    const { user, loading } = useSelector((state: RootState) => state.auth); // Use Redux state for auth

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Dispatch the register thunk with the necessary arguments
            await dispatch(register({name, email, password} ));

            setSuccess('Registration successful! Redirecting to homepage...');

            // Redirect to the homepage after a brief delay to show the success message
            setTimeout(() => {
                router.push('/'); // Redirect to the homepage
            }, 2000); // 2-second delay before redirecting
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    useEffect(() => {
        dispatch(checkUserSession())
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh md:p-10">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(DOMPurify.sanitize(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(DOMPurify.sanitize(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
            </div>
        </div>
    );
};

export default Register;
