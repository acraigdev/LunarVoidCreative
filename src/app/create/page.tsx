import React, { useState } from 'react';
import { CreateForm } from '../../components/questions/CreateForm';
import type { TrackerSubtype, TrackerType } from '@/lib/utils/types/Tracker';
import type { Nullable } from '../../lib/utils/typeHelpers';
import { CreateTrackerSelection } from '../../components/questions/CreateTrackerSelection';

export default function Create() {
  const [tracker, setTracker] = useState<Nullable<TrackerType>>();
  const [subtype, setSubtype] = useState<Nullable<TrackerSubtype>>();

  return (
    <div className="m-auto bg-white rounded-lg shadow-sm p-4 md:p-15">
      <div className="flex items-center flex-col">
        <h1 className="mb-10">Create Tracker</h1>
        <CreateTrackerSelection
          tracker={tracker}
          onTrackerChange={val => setTracker(val)}
          subtype={subtype}
          onSubtypeChange={val => setSubtype(val)}
        />
        {tracker && <CreateForm tracker={tracker} subtype={subtype} />}
      </div>
    </div>
  );
}
