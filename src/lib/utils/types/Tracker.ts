import { Nullable } from '../typeHelpers';
import { Project, ProjectType } from './Projects';

export const TrackerType = {
  project: 'project',
  medication: 'medication',
} as const;

export type TrackerType = (typeof TrackerType)[keyof typeof TrackerType];

export type Tracker = {
  id: string;
  created?: Date;
  modified: Date;
  tracker: TrackerType;
  label: string;
  data: Project;
  subtype?: Nullable<ProjectType>;
};
