'use client';
import { Button, Form, Spinner } from '@heroui/react';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from '../shared/SpaceBetween';
import { upsertTracker } from '../../lib/firebase/firestore';
import { QuestionType } from '@/lib/utils/types/Questions';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { Tracker } from '@/lib/utils/types/Tracker';
import { getQuestionList } from '../../lib/sdk/databaseQueries';
import type { Nullable } from '../../lib/utils/typeHelpers';

interface CreateFormProps {
  trackerId?: string;
  tracker: string;
  subtype?: Nullable<string>;
}

export function CreateForm({ tracker, subtype, trackerId }: CreateFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: questionList, isLoading } = useQuery({
    ...getQuestionList({ tracker, subtype }),
  });
  const convertQuestionData = (data: Record<string, FormDataEntryValue>) => {
    return Object.keys(data).reduce(
      (acc, q) => {
        const question = questionList?.[q];
        if (!data[q] || !question) return acc;
        const type = question.type;

        return {
          ...acc,
          [q]:
            type === QuestionType.date
              ? Timestamp.fromDate(new Date(data[q] as string))
              : type === QuestionType.number || type === QuestionType.slider
                ? Number(data[q])
                : data[q],
        };
      },
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as Record<string, any>,
    );
  };

  const { mutateAsync: upsertForm } = useMutation({
    mutationFn: async (tracker: Tracker) => {
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
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const { label, ...converted } = convertQuestionData(data);
    await upsertForm({
      id: trackerId ? trackerId : uuidv4(),
      ...(!trackerId && { created: new Date() }),
      modified: new Date(),
      tracker,
      label: label,
      data: converted,
      ...(subtype && { subtype }),
    });
  };
  if (isLoading) return <Spinner />;
  if (!questionList) return <>TODO Error</>;
  return (
    <Form className="w-full max-w-md" onSubmit={onSubmit}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {Object.keys(questionList).map(question => (
          <QuestionPicker
            question={questionList[question]}
            name={question}
            key={question}
          />
        ))}
        <Button color="primary" type="submit" size="lg">
          Create
        </Button>
      </SpaceBetween>
    </Form>
  );
}
