'use client';
import React from 'react';
import type { Nullable } from '../../lib/utils/typeHelpers';
import { Select, SelectItem, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { listTrackerDefinitions } from '@/lib/sdk/databaseQueries';
import { FeatureIcon } from '../shared/FeatureIcon';

interface CreateTrackerSelectionProps {
  tracker: Nullable<string>;
  onTrackerChange: (tracker: Nullable<string>) => void;
  subtype: Nullable<string>;
  onSubtypeChange: (subtype: Nullable<string>) => void;
}

export function CreateTrackerSelection({}: CreateTrackerSelectionProps) {
  const {
    data: trackers,
    isLoading,
    error,
  } = useQuery({
    ...listTrackerDefinitions({ parentId: null }),
  });

  console.log({ trackers });
  console.log({ error });

  return isLoading ? (
    <Spinner />
  ) : (
    <Select
      variant="bordered"
      className="shadow-none"
      items={trackers ?? []}
      label="Tracker type"
      placeholder="Select a tracker"
    >
      {tracker => (
        <SelectItem key={tracker.id} textValue={tracker.label}>
          <div className="flex gap-2 items-center">
            <FeatureIcon
              icon={tracker.icon}
              classes="size-8 text-primary-700"
            />
            <div className="flex flex-col">
              <span className="text-small">{tracker.label}</span>
              <span className="text-tiny text-default-400">
                {tracker.description}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
