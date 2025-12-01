/**
 * ImgBB Upload Utilities
 * 
 * Functions for uploading images to ImgBB hosting service
 */

import { IMGBB_CONFIG } from './config';

export interface ImgBBUploadResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export interface UploadOptions {
  name?: string;
  expiration?: number;
  onProgress?: (progress: number) => void;
}

/**
 * Upload a single image to ImgBB
 */
export async function uploadImageToImgBB(
  file: File | Blob,
  options: UploadOptions = {}
): Promise<ImgBBUploadResponse> {
  if (!IMGBB_CONFIG.apiKey) {
    throw new Error(
      'ImgBB API key is not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.'
    );
  }

  try {
    // Convert file to base64
    const base64Image = await fileToBase64(file);

    // Create form data
    const formData = new FormData();
    formData.append('key', IMGBB_CONFIG.apiKey);
    formData.append('image', base64Image.split(',')[1]); // Remove data:image/xxx;base64, prefix
    
    if (options.name) {
      formData.append('name', options.name);
    }
    
    if (options.expiration || IMGBB_CONFIG.expirationTime) {
      formData.append('expiration', String(options.expiration || IMGBB_CONFIG.expirationTime));
    }

    // Upload to ImgBB
    const response = await fetch(IMGBB_CONFIG.uploadEndpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to ImgBB');
    }

    const result: ImgBBUploadResponse = await response.json();

    if (!result.success) {
      throw new Error('ImgBB upload failed');
    }

    return result;
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw error;
  }
}

/**
 * Upload multiple images to ImgBB
 */
export async function uploadMultipleImagesToImgBB(
  files: (File | Blob)[],
  options: UploadOptions = {}
): Promise<ImgBBUploadResponse[]> {
  const uploadPromises = files.map((file, index) => {
    const fileName = options.name ? `${options.name}-${index + 1}` : undefined;
    return uploadImageToImgBB(file, { ...options, name: fileName });
  });

  return Promise.all(uploadPromises);
}

/**
 * Upload image from URL to ImgBB
 */
export async function uploadImageFromURL(
  imageUrl: string,
  options: UploadOptions = {}
): Promise<ImgBBUploadResponse> {
  if (!IMGBB_CONFIG.apiKey) {
    throw new Error(
      'ImgBB API key is not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.'
    );
  }

  try {
    // Create form data
    const formData = new FormData();
    formData.append('key', IMGBB_CONFIG.apiKey);
    formData.append('image', imageUrl);
    
    if (options.name) {
      formData.append('name', options.name);
    }

    // Upload to ImgBB
    const response = await fetch(IMGBB_CONFIG.uploadEndpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to ImgBB');
    }

    const result: ImgBBUploadResponse = await response.json();

    if (!result.success) {
      throw new Error('ImgBB upload failed');
    }

    return result;
  } catch (error) {
    console.error('Error uploading URL to ImgBB:', error);
    throw error;
  }
}

/**
 * Convert File/Blob to base64 string
 */
function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Get optimized image URL from ImgBB response
 * Returns the best URL based on usage context
 */
export function getOptimizedImageUrl(
  response: ImgBBUploadResponse,
  size: 'thumb' | 'medium' | 'full' = 'full'
): string {
  switch (size) {
    case 'thumb':
      return response.data.thumb.url;
    case 'medium':
      return response.data.medium.url;
    case 'full':
    default:
      return response.data.display_url;
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 32 * 1024 * 1024; // 32MB (ImgBB limit)
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 32MB limit',
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, BMP',
    };
  }

  return { valid: true };
}
