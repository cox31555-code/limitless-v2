export const ArrowIcon = ({ width = 24, height = 24, color = "currentColor", direction = "right" }) => {
  const directions = {
    right: "M5 12h14M12 5l7 7-7 7",
    left: "M19 12H5M12 19l-7-7 7-7",
    up: "M12 19v-14M5 12l7-7 7 7",
    down: "M12 5v14M5 12l7 7 7-7",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g>
        {directions[direction].split("M").map((path, i) => 
          path ? <path key={i} d={`M${path}`} /> : null
        )}
      </g>
    </svg>
  );
};

export default ArrowIcon;
