import { Nullable } from '../typeHelpers';

export interface Reminder {
  reminder: string;
  data: Record<string, any>;
  id?: Nullable<string>;
}
