import axios from "axios";
import type { YouTubeVideo } from "../types/youtube";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function searchLatestShorts(
  keyword: string = "",
  maxResults: number = 20,
  hours: number = 1,
  pageToken: string = ""
) {
  try {
    const publishedAfter = new Date(
      Date.now() - hours * 60 * 60 * 1000
    ).toISOString();

    const params: Record<string, any> = {
      key: API_KEY,
      part: "snippet",
      type: "video",
      order: "date",
      maxResults,
      publishedAfter,
      pageToken,
    };

    // Sirf keyword hone par q bhejo
    if (keyword.trim() !== "") {
      params.q = keyword.trim();
    }

    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      params,
    });

    const items = searchResponse.data.items ?? [];

    const ids = items
      .map((item: any) => item.id.videoId)
      .filter(Boolean)
      .join(",");

    if (!ids) {
      return {
        videos: [],
        nextPageToken: "",
      };
    }

    const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: API_KEY,
        part: "statistics,contentDetails",
        id: ids,
      },
    });

    const detailsMap = new Map();

    detailsResponse.data.items.forEach((item: any) => {
      detailsMap.set(item.id, {
        viewCount: item.statistics?.viewCount ?? "0",
        duration: item.contentDetails?.duration ?? "",
      });
    });

    const videos: YouTubeVideo[] = items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      viewCount:
        detailsMap.get(item.id.videoId)?.viewCount ?? "0",
      duration:
        detailsMap.get(item.id.videoId)?.duration ?? "",
    }));

    return {
      videos,
      nextPageToken: searchResponse.data.nextPageToken || "",
    };
  } catch (error) {
    console.error("YouTube API Error:", error);

    return {
      videos: [],
      nextPageToken: "",
    };
  }
}