import type { QueryFunctionContext } from '@tanstack/react-query';
import type { TrackerSubtype } from '../utils/types/Tracker';
import { TrackerType } from '../utils/types/Tracker';
import type { TrackerDef } from '../utils/questionList';
import { AvailableQuestions, Trackers } from '../utils/questionList';
import type { Maybe, Nullable } from '../utils/typeHelpers';
import type { Question } from '../utils/types/Questions';
import invariant from 'ts-invariant';

export function getQuestionList({
  tracker,
  subtype,
}: {
  tracker: TrackerType;
  subtype?: Nullable<TrackerSubtype>;
}) {
  const queryKey = [
    {
      api: 'getQuestionList',
      tracker,
      ...(subtype && { subtype }),
    },
  ] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ tracker, subtype }],
    }: QueryFunctionContext<typeof queryKey>) => {
      let formQuestions: Maybe<AvailableQuestions[]> = [];
      if (tracker === TrackerType.project) {
        invariant(subtype, 'getQuestionList subtype undefined');
        formQuestions = Trackers[subtype]?.questions;
      } else {
        formQuestions = Trackers[tracker]?.questions;
      }
      if (!formQuestions) return;
      return formQuestions.reduce(
        (acc, q) => ({ ...acc, [q]: AvailableQuestions[q] }),
        {} as Record<AvailableQuestions, Question>,
      );
    },
  };
}

export function getTrackerDefinition({
  type,
  subtype,
}: {
  type: TrackerType;
  subtype?: Nullable<TrackerSubtype>;
}) {
  const queryKey = [
    {
      api: 'getTrackerDefinition',
      type,
      ...(subtype && { subtype }),
    },
  ] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ type, subtype }],
    }: QueryFunctionContext<typeof queryKey>) => {
      let trackers: Maybe<TrackerDef> = undefined;
      if (type === TrackerType.project) {
        invariant(subtype, 'getTrackerDefinition subtype undefined');
        trackers = Trackers[subtype];
      } else {
        trackers = Trackers[type];
      }
      if (!trackers) return;
      return trackers as TrackerDef;
    },
  };
}
