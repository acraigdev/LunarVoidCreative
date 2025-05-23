'use server';
import 'server-only';
import { db } from '@/lib/firebase/clientApp';
import type {
  Firestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import invariant from 'ts-invariant';
import type { UserTracker } from '../utils/types/Tracker';
import type { Maybe, Nullable } from '../utils/typeHelpers';
import { cache } from '../utils/cache';

export async function addUserToDb(userId: string) {
  const docRef = doc(db, 'users', userId);
  return await setDoc(docRef, { userId });
}

export async function upsertTracker({
  tracker,
  db,
  uid,
}: {
  tracker: UserTracker;
  db: Firestore;
  uid?: Maybe<string>;
}) {
  if (!uid) return;
  const usersRef = doc(db, 'users', uid, 'trackers', tracker.id).withConverter(
    converter<UserTracker>(),
  );

  return await setDoc(usersRef, tracker);
}

export async function getUserTracker({
  db,
  uid,
  userTracker,
}: {
  db: Firestore;
  uid?: Maybe<string>;
  userTracker: string;
}) {
  invariant(uid, 'uid undefined');
  const usersRef = doc(db, 'users', uid, 'trackers', userTracker).withConverter(
    converter<UserTracker>(),
  );

  const docSnap = await getDoc(usersRef);
  return docSnap.data();
}

export async function deleteUserTracker({
  db,
  uid,
  userTrackerId,
}: {
  db: Firestore;
  uid?: Maybe<string>;
  userTrackerId: Nullable<string>;
}) {
  if (!userTrackerId) return;
  invariant(uid, 'uid undefined');
  await deleteDoc(doc(db, 'users', uid, 'trackers', userTrackerId));
}

export const listUserTrackers = cache(
  async ({ db, uid }: { db: Firestore; uid?: Maybe<string> }) => {
    if (!uid) return;
    const q = query(
      collection(db, 'users', uid, 'trackers').withConverter(
        converter<UserTracker>(),
      ),
      orderBy('modified', 'desc'),
      limit(20),
    );
    // if (lastDoc) {
    //   q = query(q, startAfter(lastDoc));
    // }

    const docs = await getDocs(q);
    return docs.docs.map(doc => doc.data());
  },
);

const converter = <T>() => ({
  toFirestore: (data: T) => data ?? {},
  fromFirestore: (snap: QueryDocumentSnapshot, options?: SnapshotOptions) =>
    snap.data(options) as T,
});
