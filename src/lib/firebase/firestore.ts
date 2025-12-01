/**
 * Firestore Helper Functions
 * 
 * This file contains utility functions for interacting with Firestore,
 * including CRUD operations, queries, and real-time listeners.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  onSnapshot,
  Timestamp,
  writeBatch,
  serverTimestamp,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "./config";

// Collection references
export const collections = {
  users: "users",
  products: "products",
  orders: "orders",
  categories: "categories",
  reviews: "reviews",
  settings: "settings",
} as const;

/**
 * Create or update a document in Firestore
 */
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: T,
  merge = true
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge });
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get a document from Firestore
 */
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update a document in Firestore
 */
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document from Firestore
 */
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Query documents from Firestore with filters
 */
export async function queryDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as T[];
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 */
export async function getAllDocuments<T extends DocumentData>(
  collectionName: string
): Promise<T[]> {
  return queryDocuments<T>(collectionName);
}

/**
 * Subscribe to real-time updates for a document
 */
export function subscribeToDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  callback: (data: T | null) => void
): () => void {
  const docRef = doc(db, collectionName, documentId);
  
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...snapshot.data() } as unknown as T);
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(`Error subscribing to document in ${collectionName}:`, error);
    }
  );
}

/**
 * Subscribe to real-time updates for a collection query
 */
export function subscribeToQuery<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[],
  callback: (data: T[]) => void
): () => void {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...constraints);
  
  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
      callback(data);
    },
    (error) => {
      console.error(`Error subscribing to query in ${collectionName}:`, error);
    }
  );
}

/**
 * Batch write operations
 */
export async function batchWrite(
  operations: Array<{
    type: 'set' | 'update' | 'delete';
    collectionName: string;
    documentId: string;
    data?: DocumentData;
  }>
): Promise<void> {
  try {
    const batch = writeBatch(db);
    
    operations.forEach(({ type, collectionName, documentId, data }) => {
      const docRef = doc(db, collectionName, documentId);
      
      switch (type) {
        case 'set':
          batch.set(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
          });
          break;
        case 'update':
          batch.update(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
          });
          break;
        case 'delete':
          batch.delete(docRef);
          break;
      }
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error performing batch write:', error);
    throw error;
  }
}

/**
 * Helper to create Firestore query constraints
 */
export const createConstraints = {
  where: (field: string, operator: WhereFilterOp, value: any) =>
    where(field, operator, value),
  orderBy: (field: string, direction: 'asc' | 'desc' = 'asc') =>
    orderBy(field, direction),
  limit: (count: number) => limit(count),
  startAfter: (snapshot: any) => startAfter(snapshot),
};

export { Timestamp, serverTimestamp };
