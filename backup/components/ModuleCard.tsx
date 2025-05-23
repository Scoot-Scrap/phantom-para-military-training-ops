// src/components/ModuleCard.tsx
import Link from 'next/link';
import { Module } from '../data/modules';

export function ModuleCard({ m }: { m: Module }) {
  return (
    <Link href={`/modules/${m.id}`}>
      <a className="block p-4 rounded-lg shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold">{m.title}</h2>
        <p className="text-gray-600">{m.description}</p>
      </a>
    </Link>
  );
}