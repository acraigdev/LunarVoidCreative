'use client';
import { getUserTrackers } from '@/lib/firebase/firestore';
import { Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { TrackerCard } from './components/TrackerCard';
import { SpaceBetween } from '@/components/shared/SpaceBetween';
import { useMasonry } from '../lib/utils/hooks/useMasonry';

export default function Home() {
  const { getItems } = useMasonry();

  const { data: trackers, isLoading } = useQuery({
    queryKey: ['getTrackers'],
    queryFn: () => getUserTrackers(),
  });

  const trackerColumns = getItems(trackers);

  return (
    <SpaceBetween size="m" alignOverride="items-center">
      <h1>Trackers</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
          {trackerColumns?.map((column, i) => (
            <div className="flex flex-col gap-6 w-full" key={i}>
              {column.map(tracker => (
                <TrackerCard key={tracker.id} {...tracker} />
              ))}
            </div>
          ))}
        </div>
      )}
    </SpaceBetween>
  );
}
