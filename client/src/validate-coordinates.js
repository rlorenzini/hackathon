export const validateCoordinates = feature => {
  const { geometry } = feature;
  const lng = geometry.coordinates[0];
  const lat = geometry.coordinates[1];

  if (!(lng < 180 && lng > -180)) {
    return false;
  }
  if (!(lat < 90 && lat > -90)) {
    return false;
  }
  return true;
};
