'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import Image from 'next/image';
import { usePlayerStore } from '@/store/player-store';

export default function HomePage() {
  const { setTrack } = usePlayerStore();
  const { data } = useQuery({ queryKey: ['trending'], queryFn: async () => (await api.get('/youtube/trending')).data });

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Songs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.items?.map((song: any) => (
            <button key={song.youtubeId} onClick={() => setTrack(song, data.items)} className="card-glass rounded-xl p-3 text-left hover:bg-white/10 transition">
              <Image src={song.thumbnail} alt={song.title} width={240} height={240} className="rounded-lg aspect-square object-cover" />
              <p className="mt-2 line-clamp-2 text-sm font-medium">{song.title}</p>
              <p className="text-xs text-white/60 truncate">{song.artist}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
