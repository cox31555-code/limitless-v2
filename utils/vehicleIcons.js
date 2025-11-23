// Vehicle make to brand icon mapping
const vehicleIconMap = {
  FIAT: "https://api.builder.io/api/v1/image/assets/TEMP/641ec14faf5682f705fef4e8253503b06ab52b04?width=64",
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
