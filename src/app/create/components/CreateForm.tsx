import { Button, Form, Spinner } from '@heroui/react';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from '../../../components/shared/SpaceBetween';
import { useQuery } from '@tanstack/react-query';
import { getTrackerQuestions } from '../../../lib/sdk/databaseQueries';
import { upsertTracker } from '../upsertTracker';

interface CreateFormProps {
  trackerId: number;
}

export function CreateForm({ trackerId }: CreateFormProps) {
  const { data: questionList, isLoading } = useQuery({
    ...getTrackerQuestions({ trackerId }),
  });

  if (isLoading) return <Spinner />;
  if (!questionList) return <>TODO Error</>;
  return (
    <Form
      className="w-full max-w-md"
      action={e => upsertTracker(e, questionList, trackerId)}
      onSubmit={e =>
        console.log(Object.fromEntries(new FormData(e.currentTarget)))
      }
    >
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {questionList.map(q => (
          <QuestionPicker question={q} name={String(q.id)} key={q.id} />
        ))}
        <Button color="primary" type="submit" size="lg">
          Create
        </Button>
      </SpaceBetween>
    </Form>
  );
}
