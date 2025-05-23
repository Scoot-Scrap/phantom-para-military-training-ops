import { useState, useEffect } from 'react';

/**
 * Returns true once the specified delay (ms) has elapsed.
 * Use to avoid flicker by only showing skeletons if loading exceeds delay.
 */
export default function useDelayedSkeleton(delay = 300) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return showSkeleton;
}