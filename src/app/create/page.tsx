'use client';
import React from 'react';
import { CreateForm } from '../../components/questions/CreateForm';
import { AvailableQuestions, Trackers } from '../../lib/utils/questionList';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import { TrackerType } from '@/lib/utils/types/Tracker';
import { Maybe } from '@/lib/utils/typeHelpers';
import { ProjectType } from '@/lib/utils/types/Projects';
import { Question } from '@/components/questions/utils';

export default function Create() {
  const type = TrackerType.project;
  const subtype = ProjectType.crochet;

  const { data: questionList, isLoading } = useQuery({
    queryKey: ['getQuestions', type, subtype],
    queryFn: () => {
      const formQuestions: Maybe<AvailableQuestions[]> =
        type === TrackerType.project
          ? Trackers[subtype]?.questions
          : // @ts-expect-error will resolve once there's earlier questions
            Trackers[type]?.questions;
      if (!formQuestions) return;
      return formQuestions.reduce(
        (acc, q) => ({ ...acc, [q]: AvailableQuestions[q] }),
        {} as Record<AvailableQuestions, Question>,
      );
    },
  });

  return (
    <div className="flex items-center flex-col">
      <h1 className="mb-5">Create crochet tracker</h1>
      {isLoading ? (
        <Spinner />
      ) : !questionList ? (
        'TODO: Do this'
      ) : (
        <CreateForm
          questionList={questionList}
          type={TrackerType.project}
          subtype={ProjectType.crochet}
        />
      )}
    </div>
  );
}
