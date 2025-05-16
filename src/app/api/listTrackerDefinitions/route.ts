import 'server-only';
import { TRACKERS } from '../../../../database/tables';
import sqlite3 from 'sqlite3';
import type { Nullable } from '@/lib/utils/typeHelpers';
import type { TrackerDefinition } from '../../../lib/utils/types/Tracker';
import { fetchAll } from '../../../../database/helpers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { APIResponse } from '../../../lib/sdk/api';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const parentId = params.get('parentId');
  let trackers: Nullable<TrackerDefinition[]> = null;
  const db = new sqlite3.Database('collection.db', sqlite3.OPEN_READONLY);
  const sql = parentId
    ? `SELECT * FROM ${TRACKERS} WHERE parentId = ${parentId}`
    : `SELECT * FROM ${TRACKERS} WHERE parentId IS null;`;

  try {
    trackers = await fetchAll(db, sql);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }

  if (trackers)
    return NextResponse.json(
      new APIResponse<TrackerDefinition[]>({ success: true, data: trackers }),
    );
  // TODO: error processor for error, empty, etc
  return NextResponse.json(
    new APIResponse<TrackerDefinition[]>({ success: false }),
  );
}
