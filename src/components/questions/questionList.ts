import type { Question } from './Questions';
import { QuestionType } from './Questions';

export const Tracker = {
  crochet: 'crochet',
};

export type Tracker = (typeof Tracker)[keyof typeof Tracker];

export const questions: Record<Tracker, Array<Question>> = {
  crochet: [
    {
      id: '1',
      label: 'Title',
      type: QuestionType.input,
    },
    {
      id: '2',
      label: 'Pattern',
      type: QuestionType.input,
    },
    {
      id: '3',
      label: 'Current row',
      type: QuestionType.number,
    },
    {
      id: '4',
      label: 'Hook size',
      type: QuestionType.slider,
      defaultValue: 4,
      minValue: 0.25,
      maxValue: 10,
      step: 0.25,
      allowManual: true,
    },
    {
      id: '5',
      label: 'Yarn details',
      type: QuestionType.input,
    },
    {
      id: '6',
      label: 'Start date',
      type: QuestionType.date,
    },
    {
      id: '7',
      label: 'Finish date',
      type: QuestionType.date,
    },
    {
      id: '8',
      label: 'Notes',
      type: QuestionType.textarea,
    },
  ],
};
