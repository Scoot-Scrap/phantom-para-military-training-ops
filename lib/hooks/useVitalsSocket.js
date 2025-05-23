// File: lib/hooks/useVitalsSocket.js

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';                            // Socket.IO client library :contentReference[oaicite:8]{index=8}

// Initialize a singleton socket connection
const socket = io(undefined, {
  path: '/api/socket.io',
  transports: ['websocket'],
});

export function useVitalsSocket() {
  const [vitals, setVitals] = useState(null);

  useEffect(() => {
    socket.on('vital-update', data => {
      setVitals(data);                                            // Update state on each server push :contentReference[oaicite:9]{index=9}
    });
    return () => {
      socket.off('vital-update');
    };
  }, []);

  return vitals;
}