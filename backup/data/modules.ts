// src/data/modules.ts
export interface Module {
  id: string;
  title: string;
  description: string;
}

export const modules: Module[] = [
  {
    id: 'weapons',
    title: 'Weapons Training',
    description: 'Ballistics, safety, and maintenance.',
  },
  {
    id: 'tactics',
    title: 'Tactics & Strategy',
    description: 'Squad maneuvers, reconnaissance, and field ops.',
  },
  // add more modules here…
];
