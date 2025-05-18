'use client';
import React, { useState } from 'react';
import { CreateForm } from './components/CreateForm';
import type { Nullable } from '../../lib/utils/typeHelpers';
import { CreateTrackerSelection } from './components/CreateTrackerSelection';
import { SpaceBetween } from '../../components/shared/SpaceBetween';

export default function Create() {
  const [tracker, setTracker] = useState<Nullable<number>>(null);

  return (
    <div className="m-auto bg-white rounded-lg shadow-sm p-4 md:p-15">
      <div className="flex items-center flex-col">
        <h1 className="mb-10">Create Tracker</h1>
        <SpaceBetween size="m" alignOverride="items-center" className="w-full">
          <CreateTrackerSelection
            tracker={tracker}
            onTrackerChange={val => setTracker(val)}
          />
          {tracker && <CreateForm trackerId={tracker} />}
        </SpaceBetween>
      </div>
    </div>
  );
}
