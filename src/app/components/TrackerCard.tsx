'use client';

import type { TrackerDef } from '@/lib/utils/questionList';
import type { Tracker } from '@/lib/utils/types/Tracker';
import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import invariant from 'ts-invariant';
import { getTrackerDefinition } from '../../lib/sdk/databaseQueries';
import { TrackerDetails } from './TrackerDetails';

export function TrackerCard({ label, tracker, subtype, data }: Tracker) {
  const { data: trackerDef } = useQuery({
    ...getTrackerDefinition({ type: tracker, subtype }),
    select: res => {
      invariant(res, 'Tracker definition not found');
      return res as TrackerDef;
    },
  });

  return (
    <div className="trackerShadow mb-4">
      <Card
        isPressable
        onPress={() => console.log('pressed')}
        className="trackerCard w-full relative"
      >
        <CardHeader>
          <Image
            src={trackerDef?.icon}
            fallbackSrc="/globe.svg"
            width="40"
            height="40"
            classNames={{
              wrapper: 'absolute left-1/2 -translate-x-1/2 top-1',
            }}
            alt=""
          />
          <h4 className="font-bold text-left">{label}</h4>
        </CardHeader>
        <CardBody className="pt-0">
          <TrackerDetails data={data} tracker={tracker} subtype={subtype} />
        </CardBody>
      </Card>
    </div>
  );
}
