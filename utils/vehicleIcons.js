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
