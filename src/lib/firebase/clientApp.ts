'use client';

import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import invariant from 'ts-invariant';

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
invariant(firebaseApp, 'firebaseApp nullish or undefined');
export const db = getFirestore(firebaseApp);
