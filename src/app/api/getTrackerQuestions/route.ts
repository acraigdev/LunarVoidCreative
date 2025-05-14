import 'server-only';
import sqlite3 from 'sqlite3';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { fetchAll } from '../../../../database/helpers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { APIResponse } from '../../../lib/sdk/api';
import type { Question } from '../../../lib/utils/types/Questions';
import { QUESTIONS, TRACKER_QUESTIONS } from '../../../../database/tables';

interface DBQuestion extends Omit<Question, 'data'> {
  data: string;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const trackerId = params.get('trackerId');
  let questions: Nullable<Question[]> = null;
  const db = new sqlite3.Database('collection.db', sqlite3.OPEN_READONLY);
  const sql = `WITH tq AS (SELECT questionId FROM ${TRACKER_QUESTIONS} WHERE trackerId = ${trackerId})
SELECT * FROM ${QUESTIONS} q
WHERE q.id IN tq;`;

  try {
    const res: DBQuestion[] = await fetchAll(db, sql);
    questions = res.map(q => ({
      ...q,
      data: q.data ? JSON.parse(q.data) : null,
    }));
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }

  if (questions) {
    return NextResponse.json(
      new APIResponse<Question[]>({ success: true, data: questions }),
    );
  }

  // TODO: error processor for error, empty, etc
  return NextResponse.json(new APIResponse<Question[]>({ success: false }));
}
