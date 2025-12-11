export const PaymentsIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
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
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

export default PaymentsIcon;
