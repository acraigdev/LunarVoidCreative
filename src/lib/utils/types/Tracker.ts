import type { Nullable } from '../typeHelpers';

export type Tracker = {
  id: string;
  created?: Date;
  modified: Date;
  tracker: string;
  label: string;
  data: Record<string, unknown>;
  subtype?: Nullable<string>;
};

export type TrackerDefinition = {
  id: number;
  label: string;
  description?: Nullable<string>;
  icon?: Nullable<string>;
  parentId?: Nullable<number>;
};
