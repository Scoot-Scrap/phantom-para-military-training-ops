// pages/_app.js

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Workbox } from 'workbox-window'
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import seoConfig from '../next-seo.config.js'
import * as gtag from '../lib/gtag'
import ConsentBanner from '../components/ConsentBanner'
import IntercomProvider from '../components/IntercomProvider'
import FeedbackWidget from '../components/FeedbackWidget'

function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js')
    wb.register().catch(console.error)
  }
}

function App({ Component, pageProps }) {
  const router = useRouter()

  // PWA Service Worker registration
  useEffect(() => {
    registerServiceWorker()
  }, [])

  // Google Analytics pageview tracking (after consent)
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (localStorage.getItem('ga_consent')) {
        gtag.pageview(url)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <IntercomProvider appId={process.env.NEXT_PUBLIC_INTERCOM_APP_ID}>
      <DefaultSeo {...seoConfig} />

      <ConsentBanner />

      <Component {...pageProps} />

      <FeedbackWidget />
    </IntercomProvider>
  )
}

// Core Web Vitals reporting to Google Analytics
export function reportWebVitals(metric) {
  const { id, name, label, value } = metric
  if (localStorage.getItem('ga_consent')) {
    gtag.event({
      action: name,
      category: 'Web Vitals',
      label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
    })
  }
}

export default App