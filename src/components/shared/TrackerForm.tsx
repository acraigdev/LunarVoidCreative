import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from './SpaceBetween';
import { upsertTracker } from '@/lib/actions/firebase/upsertTracker';
import type { Question } from '@/lib/utils/types/Questions';
import type { Nullable } from '@/lib/utils/typeHelpers';

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
  // if (isLoading) return <Spinner />;
  console.log(questionList);
  if (!questionList || !trackerId) return <>TODO Error</>;
  const upsert = upsertTracker.bind(
    null,
    questionList,
    trackerId,
    userTrackerId,
  );
  return (
    <Form className="w-full max-w-md" action={upsert}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {questionList.map(q => (
          <QuestionPicker question={q} name={String(q.id)} key={q.id} />
        ))}
        <Button color="primary" type="submit" size="lg">
          {userTrackerId ? 'Update' : 'Create'}
        </Button>
      </SpaceBetween>
    </Form>
  );
}
