import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Maybe, Nullable } from '../utils/typeHelpers';
import type { Question } from '../utils/types/Questions';
import invariant from 'ts-invariant';

import { SDKClient } from './client';

const dbClient = new SDKClient({ base: '' });

export function listTrackers() {
  return {
    queryKey: [{ api: 'listTrackers' }],
    queryFn: async () => await dbClient.send({ api: '/api/listTrackers' }),
  };
}

export function getQuestionList({
  tracker,
  subtype,
}: {
  tracker: string;
  subtype?: Nullable<string>;
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
    }: QueryFunctionContext<typeof queryKey>) =>
      await dbClient.send({ api: '/api/listTrackers' }),
  };
}

export function getTrackerDefinition({
  tracker,
  subtype,
}: {
  tracker: string;
  subtype?: Nullable<string>;
}) {
  const queryKey = [
    {
      api: 'getTrackerDefinition',
      tracker,
      ...(subtype && { subtype }),
    },
  ] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ type, subtype }],
    }: QueryFunctionContext<typeof queryKey>) =>
      await dbClient.send({ api: '/api/listTrackers' }),
  };
}
