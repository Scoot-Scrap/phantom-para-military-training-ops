// app/components/CollaborationProvider.jsx

'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Pusher from 'pusher-js';

const CollaborationContext = createContext({
  users: [],
  remoteVitals: null,
  sendVitalsUpdate: () => {},
});

export function CollaborationProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [remoteVitals, setRemoteVitals] = useState(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: '/api/pusher/auth',
      auth: { headers: { 'Content-Type': 'application/json' } },
    });

    const channel = pusher.subscribe('presence-vitals');

    channel.bind('pusher:subscription_succeeded', (members) => {
      const all = [];
      members.members.each((m) => all.push(m.info.name));
      setUsers(all);
    });

    channel.bind('pusher:member_added', (member) => {
      setUsers((prev) => [...prev, member.info.name]);
    });

    channel.bind('pusher:member_removed', (member) => {
      setUsers((prev) =>
        prev.filter((name) => name !== member.info.name)
      );
    });

    channel.bind('update-vitals', (data) => {
      setRemoteVitals(data);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('presence-vitals');
    };
  }, []);

  const sendVitalsUpdate = (vitals) => {
    fetch('/api/pusher/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'update-vitals', data: vitals }),
    });
  };

  return (
    <CollaborationContext.Provider
      value={{ users, remoteVitals, sendVitalsUpdate }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);