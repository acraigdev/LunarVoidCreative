'use client';
import { useMasonry } from '@/lib/utils/hooks/useMasonry';
import type { UserTracker } from '@/lib/utils/types/Tracker';
import { TrackerCard } from './TrackerCard';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { use, useEffect, useState } from 'react';

export default function Trackers({
  trackers,
}: {
  trackers: Promise<Nullable<UserTracker[]>>;
}) {
  const trackerList = use(trackers);
  const [trackerColumns, setTrackerColumns] =
    useState<Nullable<UserTracker[][]>>(null);
  const { getMasonryColumns } = useMasonry();

  /**
   * Have to useEffect because useMasonry relies on window which doesn't exist SSR
   */
  useEffect(
    () => setTrackerColumns(getMasonryColumns(trackerList)),
    [getMasonryColumns, trackerList],
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
      {trackerColumns?.map((column, i) => (
        <div className="flex flex-col gap-4 w-full" key={i}>
          {column.map(tracker => (
            <TrackerCard key={tracker.id} {...tracker} />
          ))}
        </div>
      ))}
    </div>
  );
}
