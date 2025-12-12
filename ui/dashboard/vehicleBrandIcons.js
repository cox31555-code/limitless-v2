import React from "react";

export const FiatIcon = () => (
  <img
    src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F3643f956b7a84b6b9375c9001053f591?format=webp&width=2000"
    alt="Fiat Logo"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center"
    }}
  />
);

export const getBrandIcon = (make) => {
  const brandIcons = {
    FIAT: FiatIcon,
  };
  return brandIcons[make] || null;
};
