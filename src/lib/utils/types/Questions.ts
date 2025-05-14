import type {
  DatePickerProps,
  InputProps,
  NumberInputProps,
  SliderProps,
  TextAreaProps,
} from '@heroui/react';
import type { Nullable } from '../typeHelpers';

export interface InputQuestion {
  type: 'input';
  data?: Nullable<InputProps>;
}
export interface SliderQuestion {
  type: 'slider';
  allowManual?: boolean;
  data?: Nullable<SliderProps>;
}

export interface TextAreaQuestion {
  type: 'textarea';
  data?: Nullable<TextAreaProps>;
}

export interface DateQuestion {
  type: 'date';
  data?: Nullable<DatePickerProps>;
}

export interface NumberQuestion {
  type: 'number';
  data?: Nullable<NumberInputProps>;
}

export type Question = (
  | InputQuestion
  | SliderQuestion
  | TextAreaQuestion
  | DateQuestion
  | NumberQuestion
) & {
  id: number;
  label: string;
  preview?: boolean;
};

export const QuestionType = {
  autocomplete: 'autocomplete',
  date: 'date',
  input: 'input',
  slider: 'slider',
  textarea: 'textarea',
  number: 'number',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export type Option = {
  label?: Nullable<string>;
  key: string;
  defaultValue?: string;
};
