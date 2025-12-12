export const CarIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
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
    <path d="M18 8h1a4 4 0 0 1 4 4v10H1V12a4 4 0 0 1 4-4h1M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5z" />
    <circle cx="6" cy="17" r="1" />
    <circle cx="18" cy="17" r="1" />
  </svg>
);

export default CarIcon;
