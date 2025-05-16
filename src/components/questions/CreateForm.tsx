'use client';
import { Button, Form, Spinner } from '@heroui/react';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from '../shared/SpaceBetween';
import { upsertTracker } from '../../lib/firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { UserTracker } from '@/lib/utils/types/Tracker';
import { getTrackerQuestions } from '../../lib/sdk/databaseQueries';
import { questionToFirestore } from '@/lib/utils/firebaseConverters';

interface CreateFormProps {
  trackerId: number;
}

export function CreateForm({ trackerId }: CreateFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: questionList, isLoading } = useQuery({
    ...getTrackerQuestions({ trackerId }),
  });
  const convertQuestionData = (data: Record<string, FormDataEntryValue>) => {
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

  const { mutateAsync: upsertForm } = useMutation({
    mutationFn: async (tracker: UserTracker) => {
      return await upsertTracker(tracker);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjects'] });
      router.push('/');
    },
    onError: () => {
      // TODO
      console.error('Error in upsertForm');
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: validate data types, e.g. int !== float
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const converted = convertQuestionData(data);
    await upsertForm({
      id: uuidv4(),
      // ...(!editId && { created: new Date() }),
      created: new Date(),
      modified: new Date(),
      trackerId,
      data: converted,
    });
  };
  if (isLoading) return <Spinner />;
  if (!questionList) return <>TODO Error</>;
  return (
    <Form className="w-full max-w-md" onSubmit={onSubmit}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {Object.keys(questionList).map(q => (
          <QuestionPicker
            question={questionList[Number(q)]}
            name={String(q)}
            key={q}
          />
        ))}
        <Button color="primary" type="submit" size="lg">
          Create
        </Button>
      </SpaceBetween>
    </Form>
  );
}
