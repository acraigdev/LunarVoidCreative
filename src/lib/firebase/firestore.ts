import { db, auth } from '@/lib/firebase/clientApp';
import type {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
} from 'firebase/firestore';
import invariant from 'ts-invariant';
import type { UserTracker } from '../utils/types/Tracker';

export async function addUserToDb(userId: string) {
  const docRef = doc(db, 'users', userId);
  return await setDoc(docRef, { userId });
}

export async function upsertTracker(tracker: UserTracker) {
  const uid = auth.currentUser?.uid;
  invariant(uid, 'uid undefined');
  const usersRef = doc(db, 'users', uid, 'trackers', tracker.id).withConverter(
    converter<UserTracker>(),
  );

  return await setDoc(usersRef, tracker);
}

export async function getUserTrackers() {
  const uid = auth.currentUser?.uid;
  invariant(uid, 'uid undefined');
  const q = query(
    collection(db, 'users', uid, 'trackers').withConverter(
      converter<UserTracker>(),
    ),
    limit(20),
  );
  // if (lastDoc) {
  //   q = query(q, startAfter(lastDoc));
  // }

  const docs = await getDocs(q);
  console.log(docs.docs.map(doc => doc.data()));
  return docs.docs.map(doc => doc.data()) as Array<UserTracker>;
}

const converter = <T>() => ({
  toFirestore: (data: T) => data ?? {},
  fromFirestore: (
    snap: QueryDocumentSnapshot<T>,
    options?: SnapshotOptions,
  ) => {
    const data = snap.data(options);
    return {
      ...data,
      id: snap.id,
    };
  },
});
