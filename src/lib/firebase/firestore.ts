import { db, auth } from '@/lib/firebase/clientApp';
import {
  addDoc,
  collection,
  doc,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  runTransaction,
  setDoc,
  SnapshotOptions,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from './serverApp';
import invariant from 'ts-invariant';
import { reminderConverter } from './types/Reminder';
import { Reminder } from '../utils/types/Reminders';

// export async function getRestaurantById(db, restaurantId) {
//   if (!restaurantId) {
//     console.log('Error: Invalid ID received: ', restaurantId);
//     return;
//   }
//   const docRef = doc(db, 'restaurants', restaurantId);
//   const docSnap = await getDoc(docRef);
//   return {
//     ...docSnap.data(),
//     timestamp: docSnap.data().timestamp.toDate(),
//   };
// }

// working on adding users if they dont exist via firestore.rules and this
export async function addUserToDb(userId: string) {
  const docRef = doc(db, 'users', userId);
  return await setDoc(docRef, { userId });
}

export async function upsertReminder(reminder: Reminder) {
  const uid = auth.currentUser?.uid;
  invariant(uid, 'uid undefined');
  // TODO: if reminder.id setDoc else addDoc
  const usersRef = collection(db, 'users', uid, 'trackers').withConverter(
    converter<Reminder>(),
  );

  await addDoc(usersRef, reminder);
  // return await setDoc(docRef, { userId });
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
