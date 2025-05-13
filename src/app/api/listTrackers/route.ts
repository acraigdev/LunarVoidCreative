import { getDB } from '../../../../data/helpers';
import { TRACKERS } from '../../../../data/tables';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Nullable } from '@/lib/utils/typeHelpers';

let db: Nullable<Database> = null;

export async function GET() {
  const db = await getDB();
  // Check if the database instance has been initialized
  // if (!db) {
  //   // If the database instance is not initialized, open the database connection
  //   db = await open({
  //     filename: '../../../data/collection.db', // Specify the database file path
  //     driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
  //   });
  // }
  console.log('GET', db);

  const trackers = await db.all(`SELECT * FROM ${TRACKERS};`);

  console.log(trackers);
  // Return the items as a JSON response with status 200
  return new Response(JSON.stringify(trackers), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
