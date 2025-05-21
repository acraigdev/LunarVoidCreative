'use client';
import React, { useState } from 'react';
import { TrackerForm } from '../../components/shared/TrackerForm';
import type { Nullable } from '../../lib/utils/typeHelpers';
import { CreateTrackerSelection } from './components/CreateTrackerSelection';
import { SpaceBetween } from '../../components/shared/SpaceBetween';
import { getTrackerQuestions } from '@/lib/sdk/databaseQueries';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/spinner';

function getQuestions(tracker: Nullable<number>) {
  'use server';
}

export default function Create() {
  const [tracker, setTracker] = useState<Nullable<number>>(null);
  const { data: questionList, isLoading } = useQuery({
    ...getTrackerQuestions({ trackerId: tracker }),
    enabled: Boolean(tracker),
  });

  return (
    <div className="m-auto bg-white rounded-lg shadow-sm p-4 md:p-15">
      <div className="flex items-center flex-col">
        <h1 className="mb-10">Create Tracker</h1>
        <SpaceBetween size="m" alignOverride="items-center" className="w-full">
          <CreateTrackerSelection
            tracker={tracker}
            onTrackerChange={val => setTracker(val)}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            questionList && (
              <TrackerForm trackerId={tracker} questionList={questionList} />
            )
          )}
        </SpaceBetween>
      </div>
    </div>
  );
}
