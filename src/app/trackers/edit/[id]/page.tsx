import React from 'react';
import { TrackerForm } from '@/components/shared/TrackerForm';
import { SpaceBetween } from '@/components/shared/SpaceBetween';
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';
import { getFirestore } from 'firebase/firestore';
import { getUserTracker } from '@/lib/firebase/firestore';
import type { Nullable } from '@/lib/utils/typeHelpers';
import type { Question } from '@/lib/utils/types/Questions';
import invariant from 'ts-invariant';
import { getTrackerQuestions } from '@/lib/actions/database/getTrackerQuestions';
import { firestoreToQuestion } from '@/lib/utils/firebaseConverters';

export default async function Edit({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);
  const uid = currentUser?.uid;
  const tracker = await getUserTracker({ db, uid, userTracker: id });
  invariant(tracker, 'Tracker undefined');
  const questionList = await getTrackerQuestions({
    trackerId: tracker?.trackerId,
  }).then(questions => {
    invariant(questions, 'Question list not found');
    const userData = tracker?.data;
    return questions.reduce(
      (acc, q) => {
        return {
          ...acc,
          ...(Boolean(q?.header && userData?.[q.id]) && {
            header: String(userData?.[q.id]),
          }),
          questions: [
            ...acc.questions,
            {
              ...q,
              ...(Boolean(userData?.[q.id]) && {
                defaultValue: firestoreToQuestion({
                  type: q.type,
                  value: userData?.[q.id],
                }),
              }),
            },
          ],
        };
      },
      { header: null, questions: [] } as {
        header?: Nullable<string>;
        questions: Question[];
      },
    );
  });
  return (
    <div className="m-auto rounded-lg shadow-sm p-4 md:p-15 bg-white">
      <div className="flex items-center flex-col">
        <h1 className="mb-10">{questionList.header}</h1>
        <SpaceBetween size="m" alignOverride="items-center" className="w-full">
          <TrackerForm
            questionList={questionList.questions}
            trackerId={tracker?.trackerId}
            userTrackerId={tracker?.id}
          />
        </SpaceBetween>
      </div>
    </div>
  );
}
