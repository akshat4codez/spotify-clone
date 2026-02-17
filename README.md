# SpotifyTube - Full-Stack Spotify-Style YouTube Audio App

A production-oriented Spotify-inspired web app built with **Next.js 14**, **Express**, **MongoDB**, **YouTube IFrame API**, **YouTube Data API v3**, **JWT auth**, **Zustand**, and **React Query**.

## Features
- Spotify-like dark UI layout (sidebar, main content, sticky bottom player)
- YouTube-backed audio playback (hidden iframe video)
- Search + trending music from YouTube Data API
- JWT authentication (signup/login)
- MongoDB playlists (create/read/update/delete)
- Lyrics API integration endpoint
- Shuffle / repeat / progress / volume player controls
- Responsive structure with modular folders

## Tech Structure
- `app/`, `components/`, `features/`, `hooks/`, `lib/`, `store/`
- `server/src/{config,controllers,middleware,models,routes,services}`

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   npm --prefix server install
   ```
2. Create `.env` from `.env.example`.
3. Start app:
   ```bash
   npm run dev
   ```
4. Frontend: `http://localhost:3000`
5. Backend: `http://localhost:4000/api/health`

## Required Env Vars
```env
YOUTUBE_API_KEY=
MONGODB_URI=
JWT_SECRET=
GENIUS_API_KEY=
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Deployment
### Vercel (Frontend)
- Deploy root as Next.js app.
- Add `NEXT_PUBLIC_API_URL` pointing to your Render backend URL.

### Render (Backend)
- Deploy `server` as Node service.
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Set env vars from `.env.example`.

## Docker
```bash
docker build -t spotifytube .
docker run -p 3000:3000 -p 4000:4000 --env-file .env spotifytube
```

## Production Notes
- Add rate limiting and request validation middleware.
- Add refresh token flow and secure HTTP-only cookies.
- Add websocket sync for realtime multi-device controls.
