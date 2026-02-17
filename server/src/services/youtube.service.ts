import { env } from '../config/env';

const base = 'https://www.googleapis.com/youtube/v3';

function mapItem(item: any) {
  return {
    youtubeId: item.id.videoId || item.id,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    duration: 'N/A'
  };
}

export async function searchYouTube(query: string) {
  const url = `${base}/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(query)}&key=${env.youtubeApiKey}`;
  const res = await fetch(url);
  const json = await res.json();
  return (json.items || []).map(mapItem);
}

export async function getTrendingYouTube() {
  const url = `${base}/search?part=snippet&type=video&maxResults=24&q=official%20audio%20music&key=${env.youtubeApiKey}`;
  const res = await fetch(url);
  const json = await res.json();
  return (json.items || []).map(mapItem);
}
