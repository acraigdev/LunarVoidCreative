import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Nullable } from '../utils/typeHelpers';

import axios from 'axios';
import type { APIResponse } from './api';
import { processResponse } from './api';
import type { TrackerDefinition } from '../utils/types/Tracker';
import invariant from 'ts-invariant';

export function listTrackerDefinitions({
  parentId,
}: {
  parentId?: Nullable<number>;
}) {
  const queryKey = [
    { api: 'listTrackerDefinitions', ...(parentId && { parentId }) },
  ] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ parentId }],
    }: QueryFunctionContext<typeof queryKey>) => {
      const query = parentId ? `?parentId=${parentId}` : '';
      let res: Nullable<APIResponse<TrackerDefinition[]>> = null;
      res = await axios
        .get(`/api/listTrackerDefinitions${query}`)
        .then(res => res.data);
      invariant(res, 'listTrackerDefinitions undefined');
      return processResponse(res);
    },
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
      await axios.get('/api/listTrackers'),
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
      await axios.get('/api/listTrackers'),
  };
}
