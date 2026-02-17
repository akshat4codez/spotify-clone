import { env } from '../config/env';

export async function getLyrics(artist: string, title: string) {
  if (!env.geniusApiKey) return { lyrics: 'Add GENIUS_API_KEY to enable lyrics.', synced: [] };
  const query = encodeURIComponent(`${artist} ${title}`);
  const search = await fetch(`https://api.genius.com/search?q=${query}`, {
    headers: { Authorization: `Bearer ${env.geniusApiKey}` }
  });
  const searchJson: any = await search.json();
  const hit = searchJson.response?.hits?.[0];
  if (!hit) return { lyrics: 'No lyrics found.', synced: [] };
  return {
    lyrics: `Lyrics source found: ${hit.result.title} by ${hit.result.primary_artist.name}. Fetch and sync parser can be attached here for full timed lyrics.`,
    synced: []
  };
}
