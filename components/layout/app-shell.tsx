import { Sidebar } from './sidebar';
import { PlayerBar } from '@/components/player/player-bar';
import { YouTubeAudio } from '@/components/player/youtube-audio';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <PlayerBar />
      <YouTubeAudio />
    </div>
  );
}
