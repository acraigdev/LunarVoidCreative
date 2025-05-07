'use client';
import React from 'react';
import { CreateForm } from '../../components/questions/CreateForm';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import { TrackerType } from '@/lib/utils/types/Tracker';
import { ProjectType } from '@/lib/utils/types/Projects';
import { getQuestionList } from '../../lib/api/firebaseQueries';

export default function Create() {
  const type = TrackerType.project;
  const subtype = ProjectType.crochet;

  const { data: questionList, isLoading } = useQuery({
    ...getQuestionList({ type, subtype }),
  });

  return (
    <div className="m-auto bg-white rounded-lg shadow-sm p-4 md:p-15">
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
    </div>
  );
}
