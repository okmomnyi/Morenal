/**
 * ImgBB Configuration
 * 
 * ImgBB is a free image hosting service that provides reliable CDN-backed image hosting.
 * Get your API key from: https://api.imgbb.com/
 */

export const IMGBB_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_IMGBB_API_KEY || '',
  uploadEndpoint: 'https://api.imgbb.com/1/upload',
  expirationTime: undefined, // undefined = no expiration, or set in seconds (e.g., 600 for 10 minutes)
} as const;

/**
 * Validate ImgBB configuration
 */
export function validateImgBBConfig(): void {
  if (!IMGBB_CONFIG.apiKey) {
    console.warn(
      'ImgBB API key is not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.\n' +
      'Get your free API key from: https://api.imgbb.com/'
    );
  }
}

// Validate on initialization
if (typeof window !== 'undefined') {
  validateImgBBConfig();
}
