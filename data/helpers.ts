import { Nullable } from '@/lib/utils/typeHelpers';
import sqlite3 from 'sqlite3';

let db: Nullable<sqlite3.Database> = null;
export async function getDB() {
  console.log(db);
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await new sqlite3.Database(
      './collection.db',
      sqlite3.OPEN_READONLY,
      err => {
        if (err) {
          console.error('getDB Error:', err);
        }
      },
    );
    console.log('db', db);
  }
  return db;
}
