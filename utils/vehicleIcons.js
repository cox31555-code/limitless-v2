// Vehicle make to brand icon mapping
const vehicleIconMap = {
  FIAT: "https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2Fc1dd7526dafb4da0ac21083a71d98291",
  // Add more brands as they're uploaded
  // VW: "URL_TO_VW_ICON",
  // FORD: "URL_TO_FORD_ICON",
  // BMW: "URL_TO_BMW_ICON",
};

/**
 * Extract vehicle make from vehicle string
 * e.g., "LN60AYT - VW GOLF TWIST" -> "VW"
 * @param {string} vehicleString
 * @returns {string} vehicle make
 */
export const extractVehicleMake = (vehicleString) => {
  if (!vehicleString) return null;
  const parts = vehicleString.split(" - ");
  if (parts.length < 2) return null;
  const makeAndModel = parts[1];
  const make = makeAndModel.split(" ")[0];
  return make.toUpperCase();
};

/**
 * Get icon URL for vehicle make
 * @param {string} vehicleString
 * @returns {string|null} icon URL or null if not found
 */
export const getVehicleIconUrl = (vehicleString) => {
  const make = extractVehicleMake(vehicleString);
  return make && vehicleIconMap[make] ? vehicleIconMap[make] : null;
};

/**
 * Check if an icon exists for a vehicle make
 * @param {string} vehicleString
 * @returns {boolean}
 */
export const hasVehicleIcon = (vehicleString) => {
  return getVehicleIconUrl(vehicleString) !== null;
};
