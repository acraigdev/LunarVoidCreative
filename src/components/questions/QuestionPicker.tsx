import React from 'react';
import type { Question } from '@/lib/utils/types/Questions';
import {
  DatePicker,
  Input,
  NumberInput,
  Slider,
  Textarea,
} from '@heroui/react';
import type { AvailableQuestions } from '@/lib/utils/questionList';

export type QuestionPickerProps = {
  question: Question;
  name: AvailableQuestions;
};

export function QuestionPicker({ question, name }: QuestionPickerProps) {
  const Questions = {
    input: Input,
    slider: Slider, // TODO: renderValue input for custom value/manual entry, unknown option?
    textarea: Textarea,
    number: NumberInput,
    date: DatePicker,
  };

  const QuestionComponent = Questions[question.type] as React.ElementType;

  if (QuestionComponent) {
    return (
      <QuestionComponent
        {...question}
        variant="bordered"
        name={name}
        type="text"
        className="shadow-none"
      />
    );
  }
  return <div>Unknown question type</div>;
}
