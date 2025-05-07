import { Timestamp } from 'firebase/firestore';

export const dateToTimestamp = (date: string) =>
  Timestamp.fromDate(new Date(date));
export const timestampToDate = (date: Timestamp) =>
  date.toDate().toLocaleDateString('en-US');
