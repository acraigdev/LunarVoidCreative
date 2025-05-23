import sqlite3 from 'sqlite3';
import { TRACKERS, QUESTIONS, TRACKER_QUESTIONS } from '../tables.js';

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  '../../collection.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  },
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // db.run(`DROP TABLE ${TRACKER_QUESTIONS}`);
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS ${TRACKER_QUESTIONS} (
        id INTEGER PRIMARY KEY,
        trackerId INTEGER NOT NULL REFERENCES ${TRACKERS},
        questionId INTEGER NOT NULL REFERENCES ${QUESTIONS},
        rank INTEGER
      )`,
    err => {
      if (err) {
        return console.error('create', err.message);
      }
      console.log(`Created ${TRACKER_QUESTIONS} table.`);

      // Clear the existing data in the products table
      db.run(`DELETE FROM ${TRACKER_QUESTIONS}`, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`All rows deleted from ${TRACKER_QUESTIONS}`);

        const insertSql = `INSERT INTO ${TRACKER_QUESTIONS}(trackerId, questionId, rank) VALUES
            (2,9,1),
            (2,2,2),
            (2,3,3),
            (2,11,4),
            (2,10,5),
            (3,1,1),
            (3,5,2),
            (3,6,3),
            (3,7,4),
            (3,8,5),
            (3,2,6),
            (3,3,7),
            (3,4,8),
            (4,1,1),
            (4,5,2),
            (4,6,3),
            (4,7,4),
            (4,8,5),
            (4,2,6),
            (4,3,7),
            (4,4,8)`;

        db.run(insertSql, function (err) {
          if (err) {
            return console.error(err.message);
          }
        });

        //   Close the database connection after all insertions are done
        db.close(err => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Closed the database connection.');
        });
      });
    },
  );
});
