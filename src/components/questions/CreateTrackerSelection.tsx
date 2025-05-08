import React from 'react';
import type {
  TrackerSubtype,
  TrackerType,
} from '../../lib/utils/types/Tracker';
import type { Nullable } from '../../lib/utils/typeHelpers';

interface CreateTrackerSelectionProps {
  tracker: Nullable<TrackerType>;
  onTrackerChange: (tracker: Nullable<TrackerType>) => void;
  subtype: Nullable<TrackerSubtype>;
  onSubtypeChange: (subtype: Nullable<TrackerSubtype>) => void;
}

export function CreateTrackerSelection({}: CreateTrackerSelectionProps) {
  return <>CreateTypeSelection</>;
}
