import type { Nullable } from '../typeHelpers';

export interface Project {
  notes?: Nullable<string>;
  startDate?: Nullable<Date>;
  endDate?: Nullable<Date>;
  [k: string]: Nullable<string | number | Date>;
}
