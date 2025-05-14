import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Nullable } from '../utils/typeHelpers';

import axios from 'axios';
import type { APIResponse } from './api';
import { processResponse } from './api';
import type { TrackerDefinition } from '../utils/types/Tracker';
import invariant from 'ts-invariant';
import type { Question } from '../utils/types/Questions';

export function listTrackerDefinitions({
  parentId,
}: {
  parentId?: Nullable<number>;
}) {
  const queryKey = [{ api: 'listTrackerDefinitions', parentId }] as const;
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

export function getTrackerDefinition({ id }: { id: number }) {
  const queryKey = [{ api: 'getTrackerDefinition', id }] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ id }],
    }: QueryFunctionContext<typeof queryKey>) => {
      let res: Nullable<APIResponse<TrackerDefinition>> = null;
      res = await axios
        .get(`/api/getTrackerDefinition?id=${id}`)
        .then(res => res.data);
      invariant(res, 'getTrackerDefinition undefined');
      return processResponse(res);
    },
  };
}

export function getTrackerQuestions({ trackerId }: { trackerId: number }) {
  const queryKey = [
    {
      api: 'getTrackerQuestions',
      trackerId,
    },
  ] as const;
  return {
    queryKey,
    queryFn: async ({
      queryKey: [{ trackerId }],
    }: QueryFunctionContext<typeof queryKey>) => {
      let res: Nullable<APIResponse<Question[]>> = null;
      res = await axios
        .get(`/api/getTrackerQuestions?trackerId=${trackerId}`)
        .then(res => res.data);
      invariant(res, 'getTrackerQuestions undefined');
      return processResponse(res);
    },
  };
}
