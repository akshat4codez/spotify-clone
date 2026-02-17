'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/player-store';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubeAudio() {
  const playerRef = useRef<any>(null);
  const { currentTrack, isPlaying, volume, setProgress, seekTarget, consumeSeek, nextTrack } = usePlayerStore();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-audio-player', {
        height: '0', width: '0',
        events: {
          onReady: () => playerRef.current?.setVolume(volume),
          onStateChange: (e: any) => e.data === window.YT.PlayerState.ENDED && nextTrack()
        }
      });
    };
  }, [nextTrack, volume]);

  useEffect(() => {
    if (!playerRef.current || !currentTrack) return;
    playerRef.current.loadVideoById(currentTrack.youtubeId);
  }, [currentTrack]);

  useEffect(() => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!playerRef.current?.getCurrentTime || !playerRef.current?.getDuration) return;
      const duration = playerRef.current.getDuration() || 0;
      const current = playerRef.current.getCurrentTime() || 0;
      setProgress(duration ? (current / duration) * 100 : 0);
    }, 1000);
    return () => clearInterval(id);
  }, [setProgress]);

  useEffect(() => {
    if (seekTarget === null || !playerRef.current?.getDuration || !playerRef.current?.seekTo) return;
    const duration = playerRef.current.getDuration() || 0;
    playerRef.current.seekTo((seekTarget / 100) * duration, true);
    consumeSeek();
  }, [seekTarget, consumeSeek]);

  return <div id="yt-audio-player" className="hidden" />;
}
