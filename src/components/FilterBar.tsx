type FilterBarProps = {
  selected: string;
  onSelect: (filter: string) => void;
};

const filters = [
  "15 Min",
  "30 Min",
  "1 Hour",
  "3 Hours",
  "6 Hours",
  "24 Hours",
];

function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        overflowX: "auto",
        padding: "0 20px 20px",
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          style={{
            background:
              selected === filter ? "#cc0000" : "#ff0000",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "25px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontWeight: selected === filter ? "bold" : "normal",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;