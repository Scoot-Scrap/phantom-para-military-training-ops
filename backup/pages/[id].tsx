// src/pages/modules/[id].tsx
import { useRouter } from 'next/router';
import { modules } from '../../data/modules';
import Link from 'next/link';

export default function ModulePage() {
  const { query } = useRouter();
  const mod = modules.find((m) => m.id === query.id);

  if (!mod) return <p className="p-8">Module not found.</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{mod.title}</h1>
      <p className="mb-6">{mod.description}</p>
      {/* TODO: Import and render lesson components here */}
      <Link href="/"><a className="underline">← Back to modules</a></Link>
    </main>
  );
}