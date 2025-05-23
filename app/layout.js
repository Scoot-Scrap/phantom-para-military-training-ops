// app/layout.js

import React, { useEffect } from 'react';
import './globals.css';
import { DefaultSeo } from 'next-seo';
import seoConfig from '../next-seo.config.js';
import { Workbox } from 'workbox-window';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import { BiometricProvider } from './context/BiometricContext';
import ErrorBoundary from './components/ErrorBoundary';
import ShortcutModalProvider from './components/ShortcutModal';
import FeedbackWidget from './components/FeedbackWidget';
import LocaleSwitcher from './components/LocaleSwitcher';
import IntercomProvider from './components/IntercomProvider';
import { CollaborationProvider } from './components/CollaborationProvider';
import PushNotification from './components/PushNotification';

export const metadata = { title: 'Phantom AR Martial Ops' };

function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    wb.register().catch(console.error);
  }
}

export default function RootLayout({ children, params }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <html lang={params.locale || 'en'}>
      <body>
        <IntercomProvider appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID}>
          <DefaultSeo {...seoConfig} />

          {/* Skip link for a11y */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <ApolloProvider client={apolloClient}>
            <ThemeProvider>
              <LocaleProvider>
                <CollaborationProvider>
                  <BiometricProvider>
                    <ErrorBoundary>
                      <header
                        className="header-controls"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <LocaleSwitcher />
                        <PushNotification />
                      </header>

                      <main id="main-content">{children}</main>

                      <ShortcutModalProvider />
                      <FeedbackWidget />
                    </ErrorBoundary>
                  </BiometricProvider>
                </CollaborationProvider>
              </LocaleProvider>
            </ThemeProvider>
          </ApolloProvider>
        </IntercomProvider>
      </body>
    </html>
  );
}