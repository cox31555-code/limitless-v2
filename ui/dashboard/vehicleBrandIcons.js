import React from "react";

export const FiatIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle background */}
    <circle cx="100" cy="100" r="100" fill="#1a1a1a"/>
    {/* Silver ring */}
    <circle cx="100" cy="100" r="95" fill="#c0c0c0" stroke="#808080" strokeWidth="2"/>
    {/* Red center */}
    <circle cx="100" cy="100" r="85" fill="#c41e3a"/>
    {/* FIAT text */}
    <text x="100" y="115" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="#d3d3d3" textAnchor="middle" letterSpacing="3">
      FIAT
    </text>
  </svg>
);

export const getBrandIcon = (make) => {
  const brandIcons = {
    FIAT: FiatIcon,
  };
  return brandIcons[make] || null;
};
