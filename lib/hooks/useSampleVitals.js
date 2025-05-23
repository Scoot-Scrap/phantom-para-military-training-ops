// File: lib/hooks/useSampleVitals.js

import { useQuery } from '@tanstack/react-query';

/**
 * Fetch sample vitals from our API route.
 * @returns {Object} { data, isLoading, isError, error }
 */
export function useSampleVitals() {
  return useQuery({
    queryKey: ['sampleVitals'],
    queryFn: async () => {
      const res = await fetch('/api/biometric/sampleVitals');
      if (!res.ok) {
        // Fetch only rejects on network errors; check HTTP status manually
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return res.json();
    },
    // Optional: refetch on window focus if needed
    refetchOnWindowFocus: false,
  });
}