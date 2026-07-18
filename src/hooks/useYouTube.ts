import { useEffect, useState } from "react";
import { searchLatestShorts } from "../services/youtube";
import type { YouTubeVideo } from "../types/youtube";

export default function useYouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("shorts");
  const [hours, setHours] = useState(1);

  const loadVideos = async (
    searchTerm = keyword,
    selectedHours = hours
  ) => {
    try {
      setLoading(true);

      const result = await searchLatestShorts(
        searchTerm,
        20,
        selectedHours
      );

      setVideos(result.videos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return {
    videos,
    loading,

    keyword,
    setKeyword,

    hours,
    setHours,

    loadVideos,
  };
}