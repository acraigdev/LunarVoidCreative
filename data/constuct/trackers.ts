import sqlite3 from 'sqlite3';
import { TRACKERS } from '../tables';

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  '../collection.db',
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
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS ${TRACKERS} (
        id INTEGER NOT NULL PRIMARY KEY,
        label TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        parentId INTEGER REFERENCES ${TRACKERS}(id)
      )`,
    err => {
      if (err) {
        return console.error('create', err.message);
      }
      console.log(`Created ${TRACKERS} table.`);

      // Clear the existing data in the products table
      db.run(`DELETE FROM ${TRACKERS}`, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`All rows deleted from ${TRACKERS}`);

        const insertSql = `INSERT INTO ${TRACKERS}(label, description, icon, parentId) VALUES
        ('Project', 'Hobby projects', null, null),
        ('Medication', 'Track medications, symptoms, start and end dates', 'medication.svg', null),
        ('Crochet', null, 'crochet.svg', 1),
        ('Knit', null, 'knit.svg', 1)`;

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
