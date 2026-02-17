'use client';

import Image from 'next/image';
import { Pause, Play, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react';
import { usePlayerStore } from '@/store/player-store';
import { cn } from '@/lib/utils';

export function PlayerBar() {
  const {
    currentTrack, isPlaying, progress, volume, repeatMode, shuffleMode,
    setPlaying, setVolume, requestSeek, nextTrack, previousTrack, cycleRepeat, toggleShuffle
  } = usePlayerStore();

  return (
    <div className="h-24 border-t border-white/10 bg-black/80 backdrop-blur px-4 flex items-center justify-between gap-4">
      <div className="w-1/4 flex items-center gap-3 min-w-0">
        {currentTrack && <Image src={currentTrack.thumbnail} alt={currentTrack.title} width={56} height={56} className="rounded" />}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{currentTrack?.title || 'Nothing playing'}</p>
          <p className="truncate text-xs text-white/60">{currentTrack?.artist || 'Select a track'}</p>
        </div>
      </div>
      <div className="w-2/4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button onClick={toggleShuffle} className={cn('p-2', shuffleMode && 'text-spotify-accent')}><Shuffle size={16} /></button>
          <button onClick={previousTrack} className="p-2"><SkipBack size={18} /></button>
          <button onClick={() => setPlaying(!isPlaying)} className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center">{isPlaying ? <Pause /> : <Play />}</button>
          <button onClick={nextTrack} className="p-2"><SkipForward size={18} /></button>
          <button onClick={cycleRepeat} className={cn('p-2', repeatMode !== 'off' && 'text-spotify-accent')}><Repeat size={16} /></button>
        </div>
        <input type="range" min={0} max={100} value={progress} onChange={(e) => requestSeek(Number(e.target.value))} className="w-full accent-spotify-accent" />
      </div>
      <div className="w-1/4 flex items-center justify-end gap-2">
        <Volume2 size={16} />
        <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-28 accent-spotify-accent" />
      </div>
    </div>
  );
}
