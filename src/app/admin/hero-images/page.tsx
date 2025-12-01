"use client";
import { useState, useEffect } from "react";
import { useImgBBMultipleUpload } from "@/hooks/useImgBBUpload";
import { setDocument, getDocument, collections } from "@/lib/firebase";
import { TrashBinIcon } from "@/icons";

interface HeroSettings {
  images: string[];
  updatedAt?: Date;
}

function HeroImagesContent() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { uploadImages, imageUrls, uploading, error } = useImgBBMultipleUpload();

  useEffect(() => {
    loadHeroImages();
  }, []);

  const loadHeroImages = async () => {
    setLoading(true);
    try {
      const settings = await getDocument<HeroSettings>(collections.settings, "hero-images");
      if (settings && settings.images) {
        setHeroImages(settings.images);
      }
    } catch (error) {
      console.error("Failed to load hero images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const responses = await uploadImages(files);
    
    if (responses && imageUrls.length > 0) {
      const newImages = [...heroImages, ...imageUrls];
      await saveHeroImages(newImages);
    }
  };

  const handleRemove = async (index: number) => {
    if (!confirm("Remove this hero image?")) return;

    const newImages = heroImages.filter((_, i) => i !== index);
    await saveHeroImages(newImages);
  };

  const saveHeroImages = async (images: string[]) => {
    try {
      await setDocument(collections.settings, "hero-images", {
        images,
        updatedAt: new Date(),
      });
      setHeroImages(images);
      alert("Hero images updated successfully!");
    } catch (error) {
      console.error("Failed to save hero images:", error);
      alert("Failed to save hero images. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
          Hero Images Management
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Upload and manage hero carousel images with ImgBB CDN
        </p>
      </div>

      <div className="p-6 mb-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Hero Images (Multiple)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        {uploading && (
          <p className="mt-2 text-sm text-brand-600">Uploading to ImgBB CDN...</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {heroImages.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 rounded-2xl">
          <p className="text-gray-600 dark:text-gray-400">
            No hero images yet. Upload some to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {heroImages.map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white border border-gray-200 group dark:border-gray-800 dark:bg-gray-900 rounded-2xl"
            >
              <div className="aspect-video">
                <img
                  src={url}
                  alt={`Hero ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="absolute p-2 text-white transition bg-red-500 rounded-lg opacity-0 top-2 right-2 group-hover:opacity-100 hover:bg-red-600"
                title="Remove image"
              >
                <TrashBinIcon className="w-5 h-5" />
              </button>
              <div className="p-3 text-xs text-gray-600 dark:text-gray-400">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroImagesPage() {
  return <HeroImagesContent />;
}
