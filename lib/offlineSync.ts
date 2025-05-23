import SyncedDB from 'synceddb';

const db = new SyncedDB({ name: 'training-data' });

export async function saveSession(session: any) {
  await db.put('sessions', session);
}

export async function syncSessions() {
  await db.sync(); // real‑time sync + server persistence
}
export default db;