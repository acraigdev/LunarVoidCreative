import sqlite3 from 'sqlite3';
import { QUESTIONS } from '../tables';

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
  // db.run(`DROP TABLE questions`);
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS ${QUESTIONS} (
        id INTEGER PRIMARY KEY,
        label TEXT NOT NULL,
        type TEXT NOT NULL,
        header BOOLEAN NOT NULL CHECK (header IN (0, 1)),
        preview BOOLEAN NOT NULL CHECK (preview IN (0, 1)),
        data TEXT
      )`,
    err => {
      if (err) {
        return console.error('create', err.message);
      }
      console.log(`Created ${QUESTIONS} table.`);

      // Clear the existing data in the products table
      db.run(`DELETE FROM ${QUESTIONS}`, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`All rows deleted from ${QUESTIONS}`);

        const insertSql = `INSERT INTO ${QUESTIONS}(label, type, preview, header, data) VALUES 
        ('Title', 'input', false, true, null),
        ('Start date', 'date', true, false, null),
        ('End date', 'date', true, false, null),
        ('Notes', 'textarea', false, false, null),
        ('Pattern', 'input', false, false, null),
        ('Current row', 'number', true, false, null),
        ('Hook size', 'slider', true, false, '{"minValue":0.25,"maxValue":10,"step":0.25,"allowManual":true}'),
        ('Yarn details', 'input', false, false, null),
        ('Medication name', 'input', true, true, null)`;

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
