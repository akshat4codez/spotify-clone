import { create } from 'zustand';
import { Track, RepeatMode } from '@/features/player/types';

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  seekTarget: number | null;
  shuffleMode: boolean;
  repeatMode: RepeatMode;
  setTrack: (track: Track, queue?: Track[]) => void;
  setPlaying: (value: boolean) => void;
  setVolume: (value: number) => void;
  setProgress: (value: number) => void;
  requestSeek: (value: number) => void;
  consumeSeek: () => number | null;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 60,
  progress: 0,
  seekTarget: null,
  shuffleMode: false,
  repeatMode: 'off',
  setTrack: (track, queue) => set({ currentTrack: track, queue: queue ?? get().queue, isPlaying: true, progress: 0 }),
  setPlaying: (value) => set({ isPlaying: value }),
  setVolume: (value) => set({ volume: value }),
  setProgress: (value) => set({ progress: value }),
  requestSeek: (value) => set({ seekTarget: value }),
  consumeSeek: () => {
    const target = get().seekTarget;
    set({ seekTarget: null });
    return target;
  },
  nextTrack: () => {
    const { queue, currentTrack, shuffleMode, repeatMode } = get();
    if (!currentTrack || !queue.length) return;
    const currentIdx = queue.findIndex((t) => t.youtubeId === currentTrack.youtubeId);
    if (repeatMode === 'one') return set({ isPlaying: true, progress: 0 });
    const nextIdx = shuffleMode ? Math.floor(Math.random() * queue.length) : currentIdx + 1;
    if (nextIdx >= queue.length) {
      if (repeatMode === 'all') return set({ currentTrack: queue[0], progress: 0, isPlaying: true });
      return set({ isPlaying: false, progress: 0 });
    }
    set({ currentTrack: queue[nextIdx], progress: 0, isPlaying: true });
  },
  previousTrack: () => {
    const { queue, currentTrack } = get();
    if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex((t) => t.youtubeId === currentTrack.youtubeId);
    set({ currentTrack: queue[Math.max(0, idx - 1)], progress: 0, isPlaying: true });
  },
  toggleShuffle: () => set((state) => ({ shuffleMode: !state.shuffleMode })),
  cycleRepeat: () => set((state) => ({ repeatMode: state.repeatMode === 'off' ? 'all' : state.repeatMode === 'all' ? 'one' : 'off' }))
}));
