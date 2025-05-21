import { QuestionType } from './types/Questions';

export const questionToFirestore = ({
  type,
  value,
}: {
  type: string;
  value: unknown;
}) => {
  return type === QuestionType.number || type === QuestionType.slider
    ? Number(value)
    : type === QuestionType.date
      ? +new Date(String(value))
      : String(value);
};

export const firestoreToQuestion = ({
  type,
  value,
}: {
  type: string;
  value: unknown;
}) => {
  return type === QuestionType.number || type === QuestionType.slider
    ? Number(value)
    : type === QuestionType.date
      ? new Date(Number(value)).toISOString().split('T')[0]
      : String(value);
};
