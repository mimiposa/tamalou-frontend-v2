'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import i18n from '@/i18n';
import {I18nextProvider} from "react-i18next";

const ClientWrapper = ({ children }) => {
    const [data, setData] = useState(null);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Client-side logic, such as fetching data
    }, []);

    return <>
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    </>;
};

export default ClientWrapper;