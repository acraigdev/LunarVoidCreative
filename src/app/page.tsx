'use client';
import { getTrackers } from '@/lib/firebase/firestore';
import { Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { TrackerCard } from './components/TrackerCard';
import { SpaceBetween } from '@/components/shared/SpaceBetween';

export default function Home() {
  const { data: trackers, isLoading } = useQuery({
    queryKey: ['getTrackers'],
    queryFn: () => getTrackers(),
  });

  return (
    <SpaceBetween size="m" alignOverride="items-center">
      <h1>Trackers</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trackers?.map(tracker => (
            <TrackerCard key={tracker.id} {...tracker} />
          ))}
        </div>
      )}
    </SpaceBetween>
  );
}
