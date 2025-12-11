export const ChevronIcon = ({ width = 24, height = 24, color = "currentColor", direction = "down" }) => {
  const directions = {
    down: "9 18 15 12 9 6",
    up: "15 18 9 12 15 6",
    left: "15 18 9 12 15 6",
    right: "9 18 15 12 9 6",
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
      <polyline points={directions[direction] || directions.down} />
    </svg>
  );
};

export default ChevronIcon;
