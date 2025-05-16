import 'server-only';
import sqlite3 from 'sqlite3';
import type { Nullable } from '@/lib/utils/typeHelpers';
import { fetchAll } from '../../../../database/helpers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { APIResponse } from '../../../lib/sdk/api';
import type { Question } from '../../../lib/utils/types/Questions';

interface DBQuestion extends Omit<Question, 'data'> {
  data: string;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const trackerId = params.get('trackerId');
  let questions: Nullable<Question[]> = null;
  const db = new sqlite3.Database('collection.db', sqlite3.OPEN_READONLY);

  const sql = `WITH tq AS (SELECT rank, questionId FROM tracker_questions WHERE trackerId = ${trackerId})
SELECT q.*, tq.rank FROM questions q
inner join tq on q.id = tq.questionId
WHERE q.id IN (SELECT questionId FROM tq)
ORDER BY rank;`;

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
      new APIResponse<Question[]>({
        success: true,
        data: questions,
      }),
    );
  }

  // TODO: error processor for error, empty, etc
  return NextResponse.json(new APIResponse({ success: false }));
}
