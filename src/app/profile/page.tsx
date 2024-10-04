'use client';

import {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {logout, UserData} from "../../redux/slices/authSlice";
import {t} from "i18next";

interface Recipe {
    id: string;
    name: string;
    ingredients: string;
    notes?: string;
}


const ProfilePage: React.FC = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    const [last5Recipes, setLast5Recipes] = useState<Recipe[]>([]);
    const [newRecipe, setNewRecipe] = useState<Recipe>({ id: '', name: '', ingredients: '', notes: '' });
    const { user } = useSelector((state: RootState) => state.auth); // Redux for user state
    const [clientReady, setClientReady] = useState(false);

    const [newProfile, setNewProfile] = useState<UserData>({
        data: null

    });

    const fetchUserData = async () => {
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUserProfile(user); // Assuming user comes from the Auth context
            setLast5Recipes(response.data.recipes); // Fetch the last 5 recipes
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    useEffect(() => {
        dispatch(logout());
        setClientReady(true); // Ensures client-side rendering
    }, [dispatch]);


    // Fetch user profile and last 5 generated recipes
    useEffect(() => {
        fetchUserData();
    }, [user]);


    if (!clientReady) return null; // Avoid mismatches between server and client




    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProfile({...newProfile, [e.target.name]: e.target.value });
    };

    const handleUpdateUserProfile = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = Cookies.get('token');

            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, newProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Profile updated successfully!');

            await fetchUserData();
        } catch (err) {
            setError( 'Failed to update recipe' );
        }
    };


    return user && (
        <>
            <div className="p-10">
                <div className="mx-auto p-6 bg-white rounded-lg">
                    {/* Account Section */}
                    {/*<section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800">Account</h2>
                        <p className="text-gray-600">Real-time information and activities of your property.</p>
                    </section>*/}

                    {/* Profile Picture and Name */}
                    {/*<div className="flex items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                            <img src="profile.jpg" alt="Profile Picture" className="object-cover w-full h-full"/>
                        </div>
                        <div className="ml-4">
                            <button className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700">
                                Upload new picture
                            </button>
                            <button className="ml-2 bg-red-500 px-4 py-2 rounded-md text-sm font-medium text-white">
                                Delete
                            </button>
                        </div>
                    </div>*/}

                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-6">Account</h1>

                        <form onSubmit={handleUpdateUserProfile}
                              className="bg-white p-6 rounded-lg shadow-lg mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-semibold mb-2">{t('profile_name')}</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={user?.data?.name}
                                    placeholder="Category"
                                    onChange={handleInputChange}
                                    required
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-semibold mb-2">{t('profile_email')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user?.data?.email}
                                    placeholder="Name"
                                    onChange={handleInputChange}
                                    required
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                            </div>


                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-semibold mb-2">{t('profile_password')}</label>

                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={user?.data?.password}
                                        placeholder="********"
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                    <button className="absolute right-2 top-2 text-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 12H9m0 0a4 4 0 110-8h6a4 4 0 010 8z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <button type="submit"
                                        className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-opacity-95 transition duration-200 w-full">
                                    {t('Update Recipe')}
                                </button>
                            </div>
                        </form>

                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {success && <p className="text-green-500 mb-4">{success}</p>}

                    </div>


                </div>
            </div>
        </>
    );
};

export default ProfilePage;
