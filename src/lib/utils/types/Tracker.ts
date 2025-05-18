import type { Nullable } from '../typeHelpers';

export type UserTracker = {
  id: string;
  created?: number;
  modified: number;
  trackerId: number;
  data: Record<string, unknown>;
};

export type TrackerDefinition = {
  id: number;
  label: string;
  description?: Nullable<string>;
  icon?: Nullable<string>;
  parentId?: Nullable<number>;
};
