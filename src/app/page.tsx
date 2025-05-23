import { SpaceBetween } from '@/components/shared/SpaceBetween';
import { getFirestore } from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';
import { listUserTrackers } from '@/lib/firebase/firestore';
import Trackers from './(home)/Trackers';
import { Suspense } from 'react';
import { Spinner } from '@heroui/spinner';

export default async function Home() {
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);
  const uid = currentUser?.uid;
  const trackers = listUserTrackers({ db, uid });

  return (
    <SpaceBetween size="m" alignOverride="items-center">
      <h1>Trackers</h1>
      <Suspense fallback={<Spinner />}>
        <Trackers trackers={trackers} />
      </Suspense>
    </SpaceBetween>
  );
}
