interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  keyword,
  setKeyword,
  onSearch,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        margin: "25px auto",
        maxWidth: "900px",
        padding: "0 20px",
      }}
    >
      <input
        type="text"
        placeholder="Search Shorts... (Leave empty for latest uploads)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        style={{
          flex: 1,
          padding: "14px 18px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "1px solid #444",
          background: "#1f1f1f",
          color: "#fff",
          outline: "none",
        }}
      />

      <button
        onClick={onSearch}
        style={{
          padding: "14px 24px",
          background: "#ff0000",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "15px",
        }}
      >
        🔍 Search
      </button>
    </div>
  );
}