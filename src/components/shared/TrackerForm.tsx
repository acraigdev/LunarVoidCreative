'use server';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from './SpaceBetween';
import { upsertUserTracker } from '@/lib/actions/firebase/upsertUserTracker';
import type { Question } from '@/lib/utils/types/Questions';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { Icon } from './Icon';
import { deleteUserTracker } from '../../lib/actions/firebase/deleteUserTracker';
import { SubmitButton } from './SubmitButton';

interface TrackerFormProps {
  questionList: Question[];
  trackerId?: Nullable<number>;
  userTrackerId?: Nullable<string>;
}

export async function TrackerForm({
  questionList,
  trackerId,
  userTrackerId,
}: TrackerFormProps) {
  console.log(questionList);
  if (!questionList || !trackerId) return <>TODO Error</>;
  const upsert = upsertUserTracker.bind(
    null,
    questionList,
    trackerId,
    userTrackerId,
  );

  const deleteTracker = deleteUserTracker.bind(null, userTrackerId);
  return (
    <Form className="w-full max-w-md" action={upsert}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {questionList.map(q => (
          <QuestionPicker question={q} name={String(q.id)} key={q.id} />
        ))}
        <SubmitButton>{userTrackerId ? 'Update' : 'Create'}</SubmitButton>
        {userTrackerId && (
          <Button
            variant="light"
            type="submit"
            color="danger"
            formAction={deleteTracker}
            startContent={<Icon.Trash className="size-5" />}
          >
            Delete
          </Button>
        )}
      </SpaceBetween>
    </Form>
  );
}
