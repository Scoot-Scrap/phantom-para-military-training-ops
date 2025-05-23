// next.config.js

const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,

  // Built-in internationalized routing
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Serve /admin/* from public/admin
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/index.html',
      },
    ]
  },

  // Performance budgets
  webpack(config, { dev }) {
    if (!dev) {
      config.performance = {
        hints: 'error',
        maxAssetSize: 200_000,
        maxEntrypointSize: 200_000,
      }
    }
    return config
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withPWA(
  withBundleAnalyzer(
    withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  )
)