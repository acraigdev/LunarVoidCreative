import React from 'react';
import { TrackerForm } from '../../../components/shared/TrackerForm';
import { CreateTrackerSelection } from './components/CreateTrackerSelection';
import { SpaceBetween } from '../../../components/shared/SpaceBetween';
import { getTrackerQuestions } from '../../../lib/actions/database/getTrackerQuestions';

export default async function Create({
  searchParams,
}: {
  searchParams: Promise<{ trackerId?: string }>;
}) {
  const trackerId = (await searchParams).trackerId;
  const questionList = await getTrackerQuestions({
    trackerId: Number(trackerId),
  });

  return (
    <div className="m-auto rounded-lg shadow-sm p-4 md:p-15 bg-white">
      <div className="flex items-center flex-col">
        <h1 className="mb-10">Create Tracker</h1>
        <SpaceBetween size="m" alignOverride="items-center" className="w-full">
          <CreateTrackerSelection />
          {questionList?.length && (
            <TrackerForm
              trackerId={Number(trackerId)}
              questionList={questionList}
            />
          )}
        </SpaceBetween>
      </div>
    </div>
  );
}
