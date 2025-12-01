/**
 * Custom Hook for ImgBB Image Upload
 * 
 * Provides easy-to-use image upload functionality with ImgBB
 */

"use client";

import { useState, useCallback } from 'react';
import {
  uploadImageToImgBB,
  uploadMultipleImagesToImgBB,
  validateImageFile,
  type ImgBBUploadResponse,
  type UploadOptions,
} from '@/lib/imgbb';

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  imageUrl: string | null;
  response: ImgBBUploadResponse | null;
}

interface MultipleUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  imageUrls: string[];
  responses: ImgBBUploadResponse[];
}

/**
 * Hook for uploading a single image to ImgBB
 */
export function useImgBBUpload() {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
    imageUrl: null,
    response: null,
  });

  const uploadImage = useCallback(async (file: File, options?: UploadOptions) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setState(prev => ({ ...prev, error: validation.error || 'Invalid file' }));
      return null;
    }

    setState({
      uploading: true,
      progress: 0,
      error: null,
      imageUrl: null,
      response: null,
    });

    try {
      const response = await uploadImageToImgBB(file, {
        ...options,
        onProgress: (progress) => {
          setState(prev => ({ ...prev, progress }));
        },
      });

      setState({
        uploading: false,
        progress: 100,
        error: null,
        imageUrl: response.data.display_url,
        response,
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
        imageUrl: null,
        response: null,
      });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      imageUrl: null,
      response: null,
    });
  }, []);

  return {
    ...state,
    uploadImage,
    reset,
  };
}

/**
 * Hook for uploading multiple images to ImgBB
 */
export function useImgBBMultipleUpload() {
  const [state, setState] = useState<MultipleUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    imageUrls: [],
    responses: [],
  });

  const uploadImages = useCallback(async (files: File[], options?: UploadOptions) => {
    // Validate all files
    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setState(prev => ({ ...prev, error: validation.error || 'Invalid file' }));
        return null;
      }
    }

    setState({
      uploading: true,
      progress: 0,
      error: null,
      imageUrls: [],
      responses: [],
    });

    try {
      const responses = await uploadMultipleImagesToImgBB(files, options);
      const imageUrls = responses.map(r => r.data.display_url);

      setState({
        uploading: false,
        progress: 100,
        error: null,
        imageUrls,
        responses,
      });

      return responses;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
        imageUrls: [],
        responses: [],
      });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      imageUrls: [],
      responses: [],
    });
  }, []);

  return {
    ...state,
    uploadImages,
    reset,
  };
}
