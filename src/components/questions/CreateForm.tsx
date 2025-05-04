import { Button, Form } from '@heroui/react';
import React from 'react';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from '../shared/SpaceBetween';
import { upsertTracker } from '../../lib/firebase/firestore';
import { Question, QuestionType } from './utils';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Tracker, TrackerType } from '@/lib/utils/types/Tracker';
import { ProjectType } from '@/lib/utils/types/Projects';
import { AvailableQuestions } from '@/lib/utils/questionList';

interface CreateProjectFormProps {
  questionList: Record<AvailableQuestions, Question>;
  trackerId?: string;
  type: 'project';
  subtype: ProjectType;
}

interface CreateFormProps {
  questionList: Record<AvailableQuestions, Question>;
  trackerId?: string;
  type: TrackerType;
  subtype?: never;
}

export function CreateForm({
  questionList,
  type,
  subtype,
  trackerId,
}: CreateFormProps | CreateProjectFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const convertQuestionData = (data: Record<string, FormDataEntryValue>) => {
    return (Object.keys(data) as AvailableQuestions[]).reduce(
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
        // TODO
      },
      {} as Record<AvailableQuestions, any>,
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
      tracker: type,
      label: label,
      data: converted,
      ...(subtype && { subtype }),
    });
  };
  return (
    <Form className="w-full max-w-md" onSubmit={onSubmit}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {(Object.keys(questionList) as AvailableQuestions[]).map(question => (
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
