'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { usePlayerStore } from '@/store/player-store';

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const { setTrack } = usePlayerStore();
  const { data } = useQuery({ queryKey: ['playlist', id], queryFn: async () => (await api.get(`/playlists/${id}`)).data });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{data?.playlist?.name}</h1>
      <div className="space-y-2">
        {data?.playlist?.tracks?.map((song: any, idx: number) => (
          <button key={`${song.youtubeId}-${idx}`} onClick={() => setTrack(song, data.playlist.tracks)} className="w-full text-left p-3 rounded-lg hover:bg-white/10">
            {idx + 1}. {song.title} <span className="text-white/60">• {song.artist}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
