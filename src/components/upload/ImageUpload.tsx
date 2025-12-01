/**
 * Image Upload Component using ImgBB
 * 
 * A reusable component for uploading images to ImgBB with drag & drop support
 */

"use client";

import { useState, useCallback, DragEvent } from 'react';
import { useImgBBUpload } from '@/hooks/useImgBBUpload';
import Image from 'next/image';

interface ImageUploadProps {
  onUploadComplete?: (imageUrl: string) => void;
  onUploadError?: (error: string) => void;
  label?: string;
  existingImageUrl?: string;
  className?: string;
}

export default function ImageUpload({
  onUploadComplete,
  onUploadError,
  label = "Upload Image",
  existingImageUrl,
  className = "",
}: ImageUploadProps) {
  const { uploading, progress, error, imageUrl, uploadImage, reset } = useImgBBUpload();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null);

  const handleFile = useCallback(async (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    const response = await uploadImage(file, {
      name: file.name.split('.')[0],
    });

    if (response) {
      onUploadComplete?.(response.data.display_url);
    } else if (error) {
      onUploadError?.(error);
    }
  }, [uploadImage, error, onUploadComplete, onUploadError]);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    reset();
  }, [reset]);

  const displayUrl = imageUrl || preview;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors ${
          dragActive
            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
            : "border-gray-300 dark:border-gray-700"
        } ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {displayUrl ? (
          <div className="relative p-4">
            <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={displayUrl}
                alt="Upload preview"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="flex-1 px-4 py-2 text-sm text-red-600 transition bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 disabled:opacity-50"
              >
                Remove Image
              </button>
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 text-sm text-center text-brand-600 transition bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30"
                >
                  View Full Size
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, GIF, WebP up to 32MB
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg">
            <div className="text-center">
              <div className="inline-block w-12 h-12 mb-2 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploading... {Math.round(progress)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {imageUrl && (
        <p className="mt-2 text-xs text-green-600 dark:text-green-400">
          ✓ Image uploaded successfully to ImgBB
        </p>
      )}
    </div>
  );
}
