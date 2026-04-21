import { PRIVATE_LASTFM } from "$env/static/private";

const LASTFM_API_KEY = PRIVATE_LASTFM;
const LASTFM_USER = "punchoneman";

// Helper to extract thumbnail from Medium content
function extractThumbnail(content) {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

async function getMediumArticles() {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://anshwadhwa8.medium.com/feed",
    );
    const data = await res.json();
    if (data.status !== "ok") return [];

    return data.items.slice(0, 6).map((item) => ({
      title: item.title,
      url: item.link,
      tag: item.categories?.[0] ?? "Article",
      thumbnail: item.thumbnail || extractThumbnail(item.content),
      read: `${Math.ceil(item.content.replace(/<[^>]+>/g, "").split(" ").length / 200)} min read`,
    }));
  } catch (e) {
    console.error("Medium RSS fetch failed", e);
    return [];
  }
}

async function getLastFMUser() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`,
    );
    const data = await res.json();
    return {
      info: data.user,
      image: data.user.image[2]["#text"],
    };
  } catch (e) {
    console.error("Last.fm User fetch failed", e);
    return null;
  }
}

async function getTopArtists() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=3`,
    );
    const data = await res.json();
    return data.topartists.artist;
  } catch (e) {
    console.error("Last.fm Artists fetch failed", e);
    return [];
  }
}

async function getTopTracks() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=3`,
    );
    const data = await res.json();
    return data.toptracks.track;
  } catch (e) {
    console.error("Last.fm Tracks fetch failed", e);
    return [];
  }
}

export async function load() {
  // This runs all fetches at the same time (faster!)
  const [articles, lastFM, artists, tracks] = await Promise.all([
    getMediumArticles(),
    getLastFMUser(),
    getTopArtists(),
    getTopTracks(),
  ]);

  return {
    articles,
    lastFM,
    artists,
    tracks,
  };
}
