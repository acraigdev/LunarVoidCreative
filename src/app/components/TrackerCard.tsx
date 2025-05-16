'use client';

import type { UserTracker } from '@/lib/utils/types/Tracker';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import {
  getTrackerDefinition,
  getTrackerQuestions,
} from '../../lib/sdk/databaseQueries';
import { FeatureIcon } from '../../components/shared/FeatureIcon';
import invariant from 'ts-invariant';
import { Nullable } from '@/lib/utils/typeHelpers';
import { firestoreToQuestion } from '@/lib/utils/firebaseConverters';

export function TrackerCard({ trackerId, data }: UserTracker) {
  const { data: trackerDef } = useQuery({
    ...getTrackerDefinition({ id: trackerId }),
  });

  const { data: formattedData } = useQuery({
    ...getTrackerQuestions({ trackerId }),
    select: questionList => {
      invariant(questionList, 'questionList for details is undefined');
      return Object.keys(data).reduce(
        (acc, i) => {
          const id = Number(i);
          const question = questionList.find(q => q.id === id);
          if (!question) return acc;
          return question.header
            ? { ...acc, header: String(data[i]) }
            : question.preview
              ? {
                  ...acc,
                  display: [
                    ...acc.display,
                    {
                      id: question.id,
                      label: question.label,
                      value: firestoreToQuestion({
                        type: question.type,
                        value: data[i],
                      }),
                    },
                  ],
                }
              : acc;
        },
        { header: null, display: [] } as {
          header: Nullable<string>;
          display: Array<{
            id: number;
            label: string;
            value: unknown;
          }>;
        },
      );
    },
  });
  console.log(formattedData);

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
          <h4 className="font-bold text-left">{formattedData?.header}</h4>
        </CardHeader>
        <CardBody className="pt-0">
          {formattedData?.display?.map(data => (
            <div key={data.id}>
              <span className="font-semibold">{data.label}:</span>{' '}
              {String(data.value)}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
