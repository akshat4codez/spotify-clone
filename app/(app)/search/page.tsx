'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { usePlayerStore } from '@/store/player-store';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const { setTrack } = usePlayerStore();
  const { data } = useQuery({
    queryKey: ['search', q],
    queryFn: async () => (await api.get('/youtube/search', { params: { q } })).data,
    enabled: q.length > 2
  });

  return (
    <div className="space-y-4">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search songs, artists, albums" />
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60"><tr><th className="p-3 text-left">Title</th><th>Artist</th><th>Duration</th></tr></thead>
          <tbody>
            {data?.items?.map((song: any) => (
              <tr key={song.youtubeId} className="border-t border-white/10 hover:bg-white/5 cursor-pointer" onClick={() => setTrack(song, data.items)}>
                <td className="p-3">{song.title}</td><td>{song.artist}</td><td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
