import { QuestionType } from './types/Questions';
import { ProjectType } from './types/Projects';
import { TrackerType } from './types/Tracker';
/**
 * Current data structure:
 * All questions by id
 * trackers have an ordered list of question ids
 */

export const AvailableQuestions = {
  label: {
    label: 'Title',
    type: QuestionType.input,
  },
  startDate: {
    label: 'Start date',
    type: QuestionType.date,
    preview: true,
  },
  endDate: {
    label: 'Finish date',
    type: QuestionType.date,
    preview: true,
  },
  notes: {
    label: 'Notes',
    type: QuestionType.textarea,
  },
  pattern: {
    label: 'Pattern',
    type: QuestionType.input,
  },
  currentRow: {
    label: 'Current row',
    type: QuestionType.number,
    preview: true,
  },
  hook: {
    label: 'Hook size',
    type: QuestionType.slider,
    defaultValue: 4,
    minValue: 0.25,
    maxValue: 10,
    step: 0.25,
    allowManual: true,
    preview: true,
  },
  yarn: {
    label: 'Yarn details',
    type: QuestionType.input,
  },
} as const;
export type AvailableQuestions = keyof typeof AvailableQuestions;

export type TrackerDef = {
  questions: Array<AvailableQuestions>;
  label?: string;
  icon?: string;
};

export type TrackerMap = Record<
  ProjectType | Exclude<TrackerType, 'project'>,
  TrackerDef
>;

export const Trackers: TrackerMap = {
  [ProjectType.crochet]: {
    icon: '/crochet.svg',
    questions: [
      'label',
      'pattern',
      'currentRow',
      'hook',
      'yarn',
      'startDate',
      'endDate',
      'notes',
    ],
  },
  [ProjectType.knit]: {
    icon: '/knit.svg',
    questions: [
      'label',
      'pattern',
      'currentRow',
      'hook',
      'yarn',
      'startDate',
      'endDate',
      'notes',
    ],
  },
  [TrackerType.medication]: {
    questions: [],
  },
};
