'use client';

import Link from 'next/link';
import { Home, Search, Library, PlusSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function Sidebar() {
  const { data } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => (await api.get('/playlists')).data,
    staleTime: 60_000
  });

  return (
    <aside className="hidden md:flex w-72 bg-spotify-sidebar p-4 flex-col gap-4">
      <h1 className="text-2xl font-black text-spotify-accent">SpotifyTube</h1>
      <nav className="space-y-2 text-white/90">
        <Link href="/" className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/10"><Home size={18} /> Home</Link>
        <Link href="/search" className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/10"><Search size={18} /> Search</Link>
        <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-white/10"><Library size={18} /> Your Library</button>
        <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-white/10"><PlusSquare size={18} /> Create Playlist</button>
      </nav>
      <div className="mt-2 overflow-y-auto text-sm text-white/70">
        {data?.playlists?.map((p: { _id: string; name: string }) => (
          <Link key={p._id} href={`/playlist/${p._id}`} className="block rounded p-2 hover:bg-white/10">{p.name}</Link>
        ))}
      </div>
    </aside>
  );
}
