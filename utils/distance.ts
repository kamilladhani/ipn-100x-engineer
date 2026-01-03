/**
 * Distance calculation utilities
 * Uses the Haversine formula to calculate distance between two points
 */

// Earth's radius in kilometers
const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of point 1
 * @param lon1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lon2 Longitude of point 2
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Format distance for display
 * @param distanceKm Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

// Default coordinates for Houston (used when no location is provided)
export const DEFAULT_COORDINATES = {
  latitude: 29.7604,
  longitude: -95.3698,
};

/**
 * Simple geocoding mock - in production, use a real geocoding API
 * This provides approximate coordinates for common search terms
 */
export function mockGeocode(address: string): { latitude: number; longitude: number } | null {
  const addressLower = address.toLowerCase();

  // Simple keyword matching for demo purposes - Houston locations
  const locationMap: Record<string, { latitude: number; longitude: number }> = {
    'houston': { latitude: 29.7604, longitude: -95.3698 },
    'downtown': { latitude: 29.7604, longitude: -95.3698 },
    'hillcroft': { latitude: 29.7234, longitude: -95.4987 },
    'westheimer': { latitude: 29.7413, longitude: -95.4253 },
    'bellaire': { latitude: 29.7059, longitude: -95.5403 },
    'kirby': { latitude: 29.7351, longitude: -95.4125 },
    'rice village': { latitude: 29.7351, longitude: -95.4125 },
    'galleria': { latitude: 29.7373, longitude: -95.4611 },
    'montrose': { latitude: 29.7443, longitude: -95.3886 },
    'midtown': { latitude: 29.7450, longitude: -95.3760 },
    'heights': { latitude: 29.7903, longitude: -95.3984 },
    'memorial': { latitude: 29.7697, longitude: -95.4823 },
    'sugar land': { latitude: 29.6197, longitude: -95.6349 },
    'katy': { latitude: 29.7858, longitude: -95.8245 },
    '77002': { latitude: 29.7522, longitude: -95.3589 },
    '77006': { latitude: 29.7443, longitude: -95.3886 },
    '77027': { latitude: 29.7307, longitude: -95.4376 },
    '77036': { latitude: 29.7059, longitude: -95.5403 },
    '77057': { latitude: 29.7334, longitude: -95.4988 },
    '77063': { latitude: 29.7373, longitude: -95.5156 },
    '77074': { latitude: 29.6891, longitude: -95.5367 },
    '77081': { latitude: 29.7186, longitude: -95.4985 },
    '77098': { latitude: 29.7351, longitude: -95.4125 },
    '77099': { latitude: 29.6847, longitude: -95.5892 },
  };

  // Check for exact matches first
  for (const [key, coords] of Object.entries(locationMap)) {
    if (addressLower.includes(key)) {
      return coords;
    }
  }

  // Default to Houston city center if no match
  return DEFAULT_COORDINATES;
}
