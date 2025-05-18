'use client';
import React, { useState } from 'react';
import type { Maybe, Nullable } from '../../../lib/utils/typeHelpers';
import { Select, SelectItem, Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { listTrackerDefinitions } from '@/lib/sdk/databaseQueries';
import { FeatureIcon } from '../../../components/shared/FeatureIcon';
import type { TrackerDefinition } from '../../../lib/utils/types/Tracker';
import { SpaceBetween } from '../../../components/shared/SpaceBetween';

interface CreateTrackerSelectionProps {
  tracker: Nullable<number>;
  onTrackerChange: (tracker: Nullable<number>) => void;
}

export function CreateTrackerSelection({
  onTrackerChange,
}: CreateTrackerSelectionProps) {
  // TODO: edit
  const [parentTracker, setParentTracker] =
    useState<Nullable<TrackerDefinition>>(null);
  const { data: trackers, isLoading } = useQuery({
    ...listTrackerDefinitions({ parentId: null }),
  });

  const { data: childTrackers } = useQuery({
    ...listTrackerDefinitions({ parentId: parentTracker?.id }),
    enabled: Boolean(parentTracker?.id),
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <SpaceBetween
      size="m"
      alignOverride="items-center"
      className="w-full max-w-md"
    >
      <TrackerSelect
        trackers={trackers}
        onSelect={val => setParentTracker(val ?? null)}
      />
      {parentTracker && (
        <TrackerSelect
          trackers={childTrackers}
          onSelect={val => onTrackerChange(val?.id)}
          label={parentTracker?.label}
          placeholder={`Select a ${parentTracker?.label.toLowerCase()}`}
        />
      )}
    </SpaceBetween>
  );
}

function TrackerSelect({
  trackers,
  label,
  placeholder,
  onSelect,
}: {
  trackers: Maybe<TrackerDefinition[]>;
  label?: Nullable<string>;
  placeholder?: Nullable<string>;
  onSelect: (item: Maybe<TrackerDefinition>) => void;
}) {
  return (
    <Select
      variant="bordered"
      className="shadow-none"
      items={trackers ?? []}
      label={label ?? 'Tracker type'}
      placeholder={placeholder ?? 'Select a tracker'}
      onChange={({ target: { value } }) =>
        onSelect?.(trackers?.find(tracker => tracker.id === Number(value)))
      }
    >
      {tracker => (
        <SelectItem
          key={tracker.id}
          textValue={tracker.label}
          classNames={{
            base: 'data-[hover=true]:bg-default-100 data-[selectable=true]:focus:bg-default-100',
          }}
        >
          <div className="flex gap-2 items-center">
            <FeatureIcon
              icon={tracker.icon}
              classes="size-8 text-primary-700"
            />
            <div className="flex flex-col">
              <span className="text-small">{tracker.label}</span>
              <span className="text-tiny text-default-500">
                {tracker.description}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
