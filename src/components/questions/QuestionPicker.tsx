'use client';
import React from 'react';
import type { Question } from './Questions';
import {
  DatePicker,
  Input,
  NumberInput,
  Slider,
  Textarea,
} from '@heroui/react';

export type QuestionPickerProps = {
  question: Question;
};

export function QuestionPicker({ question }: QuestionPickerProps) {
  const Questions = {
    input: Input,
    slider: Slider, // TODO: renderValue input for custom value/manual entry
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
        name={question.id}
        type="text"
        className="shadow-none"
      />
    );
  }
  return <div>Unknown question type</div>;
}
