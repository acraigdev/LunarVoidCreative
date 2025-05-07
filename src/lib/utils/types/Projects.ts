import type { Nullable } from '../typeHelpers';

export const ProjectType = {
  crochet: 'crochet',
  knit: 'knit',
} as const;

export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];

export interface Project {
  notes?: Nullable<string>;
  startDate?: Nullable<Date>;
  endDate?: Nullable<Date>;
  [k: string]: Nullable<string | number | Date>;
}
