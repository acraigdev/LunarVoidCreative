import { useQuery } from '@tanstack/react-query';
import {
  getQuestionList,
  getTrackerQuestions,
} from '../../lib/sdk/databaseQueries';
import type { Nullable } from '../../lib/utils/typeHelpers';
import { isNonNullable } from '../../lib/utils/typeHelpers';
import type { ProjectType } from '../../lib/utils/types/Projects';
import type { TrackerData, TrackerType } from '../../lib/utils/types/Tracker';
import invariant from 'ts-invariant';
import type { AvailableQuestions } from '../../lib/utils/questionList';
import { timestampToDate } from '../../lib/utils/firebaseConverters';
import { Timestamp } from 'firebase/firestore';
import { Spinner } from '@heroui/react';

interface TrackerDetailsProps {
  data: TrackerData;
  trackerId: number;
}
export function TrackerDetails({ data, trackerId }: TrackerDetailsProps) {
  const { data: formattedData, isLoading } = useQuery({
    ...getTrackerQuestions({ trackerId }),
    select: questionList => {
      console.log(questionList);
      console.log(data);
      invariant(questionList, 'questionList for details is undefined');
      // return (Object.keys(questionList))
      //   .map(key =>
      //     !data[key] || !questionList[key].preview
      //       ? null
      //       : {
      //           key,
      //           label: questionList[key].label,
      //           value:
      //             questionList[key].type === 'date' &&
      //             data[key] instanceof Timestamp
      //               ? timestampToDate(data[key])
      //               : data[key],
      //         },
      //   )
      //   .filter(isNonNullable);
    },
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        formattedData?.map(data => (
          <div key={data.key}>
            <span className="font-semibold">{data.label}:</span>{' '}
            {String(data.value)}
          </div>
        ))
      )}
    </div>
  );
}
