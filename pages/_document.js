// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Structured Data JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                url: 'https://your-domain.com',
                name: 'Phantom AR Martial Ops',
                description:
                  'Real-time AR biometric dashboard and tactical training simulator',
                publisher: {
                  '@type': 'Organization',
                  name: 'Phantom AR',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://your-domain.com/logo.png',
                  },
                },
              }),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}