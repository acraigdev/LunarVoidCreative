import { Timestamp } from 'firebase/firestore';
import { QuestionType } from './types/Questions';

export const dateToTimestamp = (date: string) =>
  Timestamp.fromDate(new Date(date));
export const timestampToDate = (date: Timestamp) =>
  date.toDate().toLocaleDateString('en-US');

export const questionToFirestore = ({
  type,
  value,
}: {
  type: string;
  value: unknown;
}) => {
  return type === QuestionType.date
    ? dateToTimestamp(value as string)
    : type === QuestionType.number || type === QuestionType.slider
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
  return type === QuestionType.date
    ? timestampToDate(value as Timestamp)
    : type === QuestionType.number || type === QuestionType.slider
      ? Number(value)
      : String(value);
};
