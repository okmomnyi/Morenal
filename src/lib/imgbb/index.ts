/**
 * ImgBB Library Index
 * 
 * Export all ImgBB utilities for easy importing
 */

export { IMGBB_CONFIG, validateImgBBConfig } from './config';
export {
  uploadImageToImgBB,
  uploadMultipleImagesToImgBB,
  uploadImageFromURL,
  getOptimizedImageUrl,
  validateImageFile,
  type ImgBBUploadResponse,
  type UploadOptions,
} from './upload';
