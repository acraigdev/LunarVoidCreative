import React from 'react';
import type { Question } from '@/lib/utils/types/Questions';
import {
  DatePicker,
  Input,
  NumberInput,
  Slider,
  Textarea,
} from '@heroui/react';
import type { Nullable } from '@/lib/utils/typeHelpers';

const Questions = {
  input: Input,
  slider: Slider, // TODO: renderValue input for custom value/manual entry, unknown option?
  textarea: Textarea,
  number: NumberInput,
  date: DatePicker,
};

export type QuestionPickerProps = {
  question?: Nullable<Question>;
  name: string;
};

export function QuestionPicker({ question, name }: QuestionPickerProps) {
  if (!question) return <></>;

  const QuestionComponent = Questions[question.type] as React.ElementType;

  if (QuestionComponent) {
    return (
      <QuestionComponent
        {...question}
        {...question.data}
        variant="bordered"
        name={name}
        type="text"
        className="shadow-none"
      />
    );
  }
  return <div>Unknown question type</div>;
}
