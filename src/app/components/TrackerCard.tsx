'use client';

import type { UserTracker } from '@/lib/utils/types/Tracker';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { getTrackerDefinition } from '../../lib/sdk/databaseQueries';
import { FeatureIcon } from '../../components/shared/FeatureIcon';
import { TrackerDetails } from './TrackerDetails';

export function TrackerCard({ label, trackerId, data }: UserTracker) {
  const { data: trackerDef } = useQuery({
    ...getTrackerDefinition({ id: trackerId }),
  });

  return (
    <div className="trackerShadow mb-4">
      <Card
        isPressable
        onPress={() => console.log('pressed')}
        className="trackerCard w-full relative"
      >
        <CardHeader>
          <FeatureIcon
            icon={trackerDef?.icon}
            classes="size-10 text-primary-700 absolute left-1/2 -translate-x-1/2 top-1"
          />
          <h4 className="font-bold text-left">{label}</h4>
        </CardHeader>
        <CardBody className="pt-0">
          <TrackerDetails data={data} trackerId={trackerId} />
        </CardBody>
      </Card>
    </div>
  );
}
