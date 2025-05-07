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
import type { Tracker } from '../utils/types/Tracker';

export async function addUserToDb(userId: string) {
  const docRef = doc(db, 'users', userId);
  return await setDoc(docRef, { userId });
}

// export async function populateQuestions(questions: Question[]) {
//   const batch = writeBatch(db);
//   questions.forEach(q => {
//     const docRef = doc(db, 'questions', q.id);
//     batch.set(docRef, q);
//   });
//   await batch.commit();
// }

// export async function populateProjects(
//   projects: Record<ProjectType, string[]>,
// ) {
//   const batch = writeBatch(db);
//   (Object.keys(projects) as ProjectType[]).forEach(p => {
//     const docRef = doc(db, 'trackers', 'projects', p);
//     batch.set(docRef, projects[p]);
//   });
//   await batch.commit();
// }

export async function upsertTracker(tracker: Tracker) {
  const uid = auth.currentUser?.uid;
  invariant(uid, 'uid undefined');
  const usersRef = doc(db, 'users', uid, 'trackers', tracker.id).withConverter(
    converter<Tracker>(),
  );

  return await setDoc(usersRef, tracker);
}

export async function getTrackers() {
  const uid = auth.currentUser?.uid;
  invariant(uid, 'uid undefined');
  const q = query(collection(db, 'users', uid, 'trackers'), limit(20));
  // if (lastDoc) {
  //   q = query(q, startAfter(lastDoc));
  // }

  const docs = await getDocs(q);
  return docs.docs.map(doc => doc.data()) as Array<Tracker>;
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
