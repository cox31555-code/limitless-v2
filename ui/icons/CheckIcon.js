export const CheckIcon = ({ width = 24, height = 24, color = "currentColor", style = "outline" }) => {
  if (style === "filled") {
    return (
      <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={color}
      >
        <circle cx="12" cy="12" r="12" fill={color} />
        <path
          d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
          fill="white"
        />
      </svg>
    );
  }

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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default CheckIcon;
