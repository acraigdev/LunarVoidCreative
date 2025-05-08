import type { Nullable } from '../typeHelpers';
import type { Project, ProjectType } from './Projects';

export const TrackerType = {
  project: 'project',
  medication: 'medication',
} as const;

export type TrackerType = (typeof TrackerType)[keyof typeof TrackerType];

export type TrackerData = Project;

export type TrackerSubtype = ProjectType;

export type Tracker = {
  id: string;
  created?: Date;
  modified: Date;
  tracker: TrackerType;
  label: string;
  data: TrackerData;
  subtype?: Nullable<TrackerSubtype>;
};
