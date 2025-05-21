import 'server-only';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { APIResponse } from '../../../lib/sdk/api';
import type { Question } from '../../../lib/utils/types/Questions';
import { getTrackerQuestions } from '@/lib/actions/database/getTrackerQuestions';

// TODO: Get rid of this and use server action
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const trackerId = params.get('trackerId');
  const questions = await getTrackerQuestions({
    trackerId: trackerId ? Number(trackerId) : null,
  });

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
