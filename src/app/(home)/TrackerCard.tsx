'use client';
import type { UserTracker } from '@/lib/utils/types/Tracker';
import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import {
  getTrackerDefinition,
  getTrackerQuestions,
} from '../../lib/sdk/databaseQueries';
import { FeatureIcon } from '../../components/shared/FeatureIcon';
import invariant from 'ts-invariant';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { firestoreToQuestion } from '@/lib/utils/firebaseConverters';
import { useRouter } from 'next/navigation';

export function TrackerCard({ trackerId, data, id }: UserTracker) {
  const router = useRouter();
  const { data: trackerDef, isLoading: isTrackerDefLoading } = useQuery({
    ...getTrackerDefinition({ id: trackerId }),
  });

  const { data: formattedData, isLoading: isFormattedDataLoading } = useQuery({
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

  return (
    <div className="trackerShadow">
      <Skeleton
        className="trackerCard !pt-0"
        isLoaded={!isTrackerDefLoading && !isFormattedDataLoading}
      >
        <Card
          isPressable
          onPress={() => router.push(`/edit/${id}`)}
          className="trackerCard w-full relative"
        >
          <CardHeader>
            <FeatureIcon
              icon={trackerDef?.icon}
              classes="size-10 text-primary-700 absolute left-1/2 -translate-x-1/2 top-1"
            />
            <h4 className="font-bold text-left">{formattedData?.header}</h4>
          </CardHeader>
          <CardBody className="pt-0 w-full">
            {formattedData?.display?.map(data => (
              <div key={data.id}>
                <span className="font-semibold">{data.label}:</span>{' '}
                {String(data.value)}
              </div>
            ))}
          </CardBody>
        </Card>
      </Skeleton>
    </div>
  );
}
