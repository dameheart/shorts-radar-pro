import "./VideoCard.css";
import { timeAgo } from "../utils/timeAgo";
import type { YouTubeVideo } from "../types/youtube";

interface Props {
  video: YouTubeVideo;
}

function formatViews(views: string) {
  const n = Number(views);

  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";

  return views;
}

function parseDuration(duration: string) {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return "";

  const h = match[1] ? match[1] + ":" : "";
  const m = (match[2] || "0").padStart(2, "0");
  const s = (match[3] || "0").padStart(2, "0");

  return `${h}${m}:${s}`;
}

export default function VideoCard({ video }: Props) {
  const url = `https://www.youtube.com/watch?v=${video.id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("✅ Video link copied!");
    } catch {
      alert("Unable to copy link.");
    }
  };

  return (
    <div className="video-card">
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} />

        <div className="duration">
          {parseDuration(video.duration)}
        </div>
      </div>

      <div className="card-content">
        <div className="video-title">
          {video.title}
        </div>

        <div className="channel">
          📺 {video.channelTitle}
        </div>

        <div className="meta">
          <span>👁 {formatViews(video.viewCount)} Views</span>
          <span>🕒 {timeAgo(video.publishedAt)}</span>
        </div>

        <div className="buttons">
          <button
            className="btn copy-btn"
            onClick={copyLink}
          >
            📋 Copy Link
          </button>

          <button
            className="btn open-btn"
            onClick={() => window.open(url, "_blank")}
          >
            ▶ Watch on YouTube
          </button>
        </div>
      </div>
    </div>
  );
}