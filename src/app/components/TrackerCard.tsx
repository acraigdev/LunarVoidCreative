'use client';

import { TrackerDef, Trackers } from '@/lib/utils/questionList';
import { Tracker, TrackerType } from '@/lib/utils/types/Tracker';
import { Card, CardBody, CardHeader, Divider, Image } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import invariant from 'ts-invariant';

export function TrackerCard({ label, tracker, subtype }: Tracker) {
  const { data: trackerDef } = useQuery({
    queryKey: ['getTracker', tracker, subtype],
    queryFn: () =>
      tracker === TrackerType.project && subtype
        ? Trackers[subtype]
        : // @ts-expect-error will resolve once there's earlier questions
          Trackers[tracker],

    select: res => {
      invariant(res, 'Tracker definition not found');
      return res as TrackerDef;
    },
  });
  return (
    <div className="trackerShadow">
      <Card
        isPressable
        onPress={() => console.log('pressed')}
        className="trackerCard w-full relative"
      >
        <CardHeader>
          <Image
            src={trackerDef?.icon}
            fallbackSrc="/globe.svg"
            width="25"
            height="25"
            classNames={{ wrapper: 'absolute left-1/2 -translate-x-1/2 top-2' }}
          />
          <h4 className="font-semibold">{label}</h4>
        </CardHeader>
        <Divider />
        <CardBody>Idk some details</CardBody>
      </Card>
    </div>
  );
}
