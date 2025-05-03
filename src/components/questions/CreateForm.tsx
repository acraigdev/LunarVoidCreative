'use client';
import { Button, Form } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { questions } from './questionList';
import { QuestionPicker } from './QuestionPicker';
import { SpaceBetween } from '../shared/SpaceBetween';
import { upsertReminder } from '../../lib/firebase/firestore';

interface CreateFormProps {
  type: string;
}

export function CreateForm({ type }: CreateFormProps) {
  const { data: questionList } = useQuery({
    queryKey: ['getQuestions', type],
    queryFn: () => questions[type],
  });

  // console.log(questionForm);
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Process form data so everything isn't just a string
    // Also need to figure out how to process the type of data so it's not just "any"...
    // Idk how to dynamically build that, we can maybe use the question type to assume the
    // type but I don't think you can build types like that?
    // I suspect the questions can't be defined quite as dynamically as they currently are
    // and the type will have to be defined for each item... Unsure htough
    console.log(data);
    upsertReminder({ reminder: type, data });
    // setSubmitted(data);
  };
  return (
    <Form className="w-full max-w-md" onSubmit={onSubmit}>
      <SpaceBetween size="m" alignOverride="items-center" className="w-full">
        {questionList?.map(question => (
          <QuestionPicker question={question} key={question.id} />
        ))}
        <Button color="primary" type="submit" size="lg">
          Create
        </Button>
        {submitted && (
          <div className="text-small text-default-500">
            You submitted: <code>{JSON.stringify(submitted)}</code>
          </div>
        )}
      </SpaceBetween>
    </Form>
  );
}
