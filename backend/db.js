import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./appointments.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      UNIQUE(date, time)
    )
  `);
});

export default db;