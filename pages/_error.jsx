// /pages/_error.jsx  (or /app/error.jsx)
'use client';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function ErrorPage() {
  useEffect(() => {
    Sentry.captureException(new Error('Test Sentry error'));
  }, []);

  return <h1>Something went wrong</h1>;
}