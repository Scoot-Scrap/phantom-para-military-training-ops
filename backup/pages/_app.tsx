+ import LogRocket from 'logrocket'
  
  export default function MyApp({ Component, pageProps }: AppProps) {
+   LogRocket.init('your-org/your-app')
    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
      }
    }, [])

    return <Component {...pageProps} />
  }