import { QuestionType } from './types/Questions';

export const questionToFirestore = ({
  type,
  value,
}: {
  type: string;
  value: unknown;
}) => {
  return type === QuestionType.number ||
    type === QuestionType.slider ||
    type === QuestionType.date
    ? Number(value)
    : String(value);
};

export const firestoreToQuestion = ({
  type,
  value,
}: {
  type: string;
  value: unknown;
}) => {
  return type === QuestionType.number ||
    type === QuestionType.slider ||
    type === QuestionType.date
    ? Number(value)
    : String(value);
};
