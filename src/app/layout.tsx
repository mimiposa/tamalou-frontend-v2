'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {persistor, store} from '../redux/store';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Sidebar from '../components/Sidebar';
import NavLinks from '../components/NavLinks';
import localFont from 'next/font/local';
import {ReactNode} from "react";

// Load custom fonts
const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});


// Define props for the layout (children should be ReactNode type)
interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" className="min-h-dvh">
      <I18nextProvider i18n={i18n}>
          <Provider store={store}>
              {/* PersistGate delays rendering until rehydration is complete */}
              <PersistGate loading={null} persistor={persistor}>
                  <body
                      className={`bg-white flex overflow-y-auto scroll-auto min-h-dvh ${geistSans.variable} ${geistMono.variable}`}>
                  <Sidebar/>
                  <div className="w-full p-10">
                      <header className="w-full fixed right-0 top-0">
                          <nav className="w-full flex justify-end items-end">
                              <NavLinks/>
                          </nav>
                      </header>
                      <main className="min-h-dvh flex flex-col justify-center">
                          {children}
                      </main>
                  </div>
                  </body>
              </PersistGate>

          </Provider>
      </I18nextProvider>

      </html>
  );
}
