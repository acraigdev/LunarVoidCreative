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

type BaseTracker = {
  questions: Array<string>;
  icon: string;
  label: string;
  description?: string;
};

export type TrackerDefinition =
  | BaseTracker
  | {
      label: string;
      description?: string;
      secondary: Record<string, BaseTracker>;
    };
