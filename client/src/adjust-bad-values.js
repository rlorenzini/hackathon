export const adjustBadValues = feature => {
  const { properties } = feature;
  if (properties.decibel < 0) {
    return {
      ...feature,
      properties: {
        ...properties,
        // Set to 1 so they show up on the map
        decibel: 1
      }
    };
  }
  return feature;
};
