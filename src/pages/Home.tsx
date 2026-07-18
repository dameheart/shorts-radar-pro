import { useEffect, useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

import useYouTube from "../hooks/useYouTube";

export default function Home() {
  const {
    videos,
    loading,
    keyword,
    setKeyword,
    hours,
    setHours,
    loadVideos,
  } = useYouTube();

  const [selectedFilter, setSelectedFilter] = useState("1 Hour");
  const [selectedVideo, setSelectedVideo] = useState("");

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);

    let selectedHours = 1;

    switch (filter) {
      case "15 Min":
        selectedHours = 0.25;
        break;
      case "30 Min":
        selectedHours = 0.5;
        break;
      case "1 Hour":
        selectedHours = 1;
        break;
      case "3 Hours":
        selectedHours = 3;
        break;
      case "6 Hours":
        selectedHours = 6;
        break;
      case "24 Hours":
        selectedHours = 24;
        break;
    }

    setHours(selectedHours);
  };

  // Sirf filter change hone par reload kare
  useEffect(() => {
    loadVideos(keyword, hours);
  }, [hours]);

  return (
    <>
      <Header />

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={() => loadVideos(keyword, hours)}
      />

      <FilterBar
        selected={selectedFilter}
        onSelect={handleFilter}
      />

      {/* YouTube Player */}
      {selectedVideo && (
        <div
          style={{
            margin: "20px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
            title="YouTube Player"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />

          <button
            onClick={() => setSelectedVideo("")}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ✖ Close Player
          </button>
        </div>
      )}

      {loading && <h2>Loading...</h2>}

      {!loading &&
        videos.map((video) => (
          <VideoCard
  key={video.id}
  video={video}
/>
        ))}
    </>
  );
}