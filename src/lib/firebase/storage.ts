/**
 * Firebase Storage Helper Functions
 * 
 * This file contains utility functions for interacting with Firebase Storage,
 * including file uploads, downloads, and deletions.
 */

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  UploadResult,
  StorageReference,
  UploadMetadata,
  UploadTask,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  path: string,
  file: File | Blob,
  metadata?: UploadMetadata
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Upload a file with progress tracking
 */
export function uploadFileWithProgress(
  path: string,
  file: File | Blob,
  onProgress?: (progress: number) => void,
  metadata?: UploadMetadata
): UploadTask {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress?.(progress);
    },
    (error) => {
      console.error("Error uploading file:", error);
    }
  );

  return uploadTask;
}

/**
 * Get download URL for a file
 */
export async function getFileURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

/**
 * List all files in a directory
 */
export async function listFiles(path: string): Promise<StorageReference[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    return result.items;
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
}

/**
 * Get file metadata
 */
export async function getFileMetadata(path: string) {
  try {
    const storageRef = ref(storage, path);
    const metadata = await getMetadata(storageRef);
    return metadata;
  } catch (error) {
    console.error("Error getting file metadata:", error);
    throw error;
  }
}

/**
 * Update file metadata
 */
export async function updateFileMetadata(
  path: string,
  metadata: UploadMetadata
) {
  try {
    const storageRef = ref(storage, path);
    const updatedMetadata = await updateMetadata(storageRef, metadata);
    return updatedMetadata;
  } catch (error) {
    console.error("Error updating file metadata:", error);
    throw error;
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: Array<{ path: string; file: File | Blob; metadata?: UploadMetadata }>
): Promise<string[]> {
  try {
    const uploadPromises = files.map(({ path, file, metadata }) =>
      uploadFile(path, file, metadata)
    );
    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error;
  }
}

/**
 * Delete multiple files
 */
export async function deleteMultipleFiles(paths: string[]): Promise<void> {
  try {
    const deletePromises = paths.map((path) => deleteFile(path));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting multiple files:", error);
    throw error;
  }
}

/**
 * Generate a unique file path
 */
export function generateFilePath(
  directory: string,
  fileName: string,
  userId?: string
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const fileExtension = fileName.split(".").pop();
  const fileNameWithoutExt = fileName.replace(`.${fileExtension}`, "");
  
  const sanitizedFileName = fileNameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  
  if (userId) {
    return `${directory}/${userId}/${sanitizedFileName}-${timestamp}-${randomString}.${fileExtension}`;
  }
  
  return `${directory}/${sanitizedFileName}-${timestamp}-${randomString}.${fileExtension}`;
}

/**
 * Storage paths for different file types
 */
export const storagePaths = {
  products: "products",
  users: "users",
  categories: "categories",
  avatars: "avatars",
  documents: "documents",
  temp: "temp",
} as const;
