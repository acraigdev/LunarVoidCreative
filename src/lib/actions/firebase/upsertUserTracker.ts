'use server';

import * as firestore from '@/lib/firebase/firestore';
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';
import { questionToFirestore } from '@/lib/utils/firebaseConverters';
import type { Nullable } from '@/lib/utils/typeHelpers';
import type { Question } from '@/lib/utils/types/Questions';
import { getFirestore } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const convertQuestionData = (
  data: Record<string, FormDataEntryValue>,
  questionList: Question[],
) => {
  return Object.keys(data).reduce(
    (acc, q) => {
      const question = questionList?.find(
        question => question.id === Number(q),
      );
      if (!data[q] || !question) return acc;
      return {
        ...acc,
        [q]: questionToFirestore({ type: question.type, value: data[q] }),
      };
    },
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, any>,
  );
};

export const upsertUserTracker = async (
  questionList: Question[],
  trackerId: number,
  userTrackerId: Nullable<string>,
  e: FormData,
) => {
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);
  const uid = currentUser?.uid;
  const userTracker = userTrackerId
    ? await firestore.getUserTracker({ db, uid, userTracker: userTrackerId })
    : null;
  // TODO: validate data types, e.g. int !== float
  const data = Object.fromEntries(e);
  const converted = convertQuestionData(data, questionList);
  await firestore
    .upsertTracker({
      tracker: {
        id: userTracker ? userTracker.id : uuidv4(),
        created: userTracker ? userTracker.created : Date.now(),
        modified: Date.now(),
        trackerId,
        data: converted,
      },
      db,
      uid,
    })
    .then(() => {
      // TODO: toast
      // queryClient.invalidateQueries({ queryKey: ['getProjects'] });
      redirect('/');
    });
};
