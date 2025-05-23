import { useState, useEffect } from 'react';

/**
 * Fetch data from `url`, canceling the request if the component unmounts.
 */
export function useCancelableFetch(url) {
  const [data, setData]      = useState(null);
  const [error, setError]    = useState(null);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}