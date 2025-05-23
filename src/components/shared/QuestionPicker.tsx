'use client';
import React from 'react';
import type { Question } from '@/lib/utils/types/Questions';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { Input, Textarea } from '@heroui/input';
import { Slider } from '@heroui/slider';
import { NumberInput } from '@heroui/number-input';
import { DatePicker } from '@heroui/date-picker';
import { parseDate } from '@internationalized/date';

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
        {...(Boolean(question.defaultValue) && {
          defaultValue:
            question.defaultValue && question.type === 'date'
              ? parseDate(String(question.defaultValue))
              : question.defaultValue,
        })}
        variant="bordered"
        name={name}
        type="text"
        className="shadow-none"
      />
    );
  }
  return <div>Unknown question type</div>;
}
