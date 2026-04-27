// Parcela Backend - Node.js + Express
// Waitlist API with Google Sheets integration (with MongoDB fallback)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { z } = require('zod');
const { google } = require('googleapis');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json({ limit: '1mb' }));

// ----- MongoDB (fallback storage) -----
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'parcela';
let mongoClient = null;
let db = null;

async function getDb() {
  if (db) return db;
  if (!MONGO_URL) return null;
  mongoClient = new MongoClient(MONGO_URL);
  await mongoClient.connect();
  db = mongoClient.db(DB_NAME);
  return db;
}

// ----- Google Sheets integration -----
const SHEETS_CONFIGURED = !!(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
  process.env.GOOGLE_PRIVATE_KEY &&
  process.env.GOOGLE_SHEET_ID
);

async function appendToSheet({ email, timestamp, language, source }) {
  if (!SHEETS_CONFIGURED) {
    return { ok: false, reason: 'sheets_not_configured' };
  }
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'RAW',
    requestBody: { values: [[email, timestamp, language, source]] },
  });
  return { ok: true };
}

// ----- Validation -----
const waitlistSchema = z.object({
  email: z.string().email(),
  language: z.enum(['rw', 'en', 'fr', 'sw']),
});

// ----- Routes -----
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', sheetsConfigured: SHEETS_CONFIGURED });
});

app.post('/api/waitlist', async (req, res) => {
  const parsed = waitlistSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: 'invalid_input',
      details: parsed.error.flatten(),
    });
  }
  const { email, language } = parsed.data;
  const timestamp = new Date().toISOString();
  const source = 'Parcela Waiting List';
  const entry = { email, timestamp, language, source };

  // Always persist to MongoDB as a fallback / audit log.
  try {
    const database = await getDb();
    if (database) {
      await database.collection('waitlist').updateOne(
        { email },
        { $set: entry },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error('Mongo write failed:', err.message);
  }

  // Try Google Sheets append.
  let sheets_status = 'skipped';
  if (SHEETS_CONFIGURED) {
    try {
      await appendToSheet(entry);
      sheets_status = 'appended';
    } catch (err) {
      console.error('Google Sheets append failed:', err.message);
      sheets_status = 'failed';
    }
  }

  return res.json({ success: true, sheets_status });
});

// 404 for any other /api routes
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'not_found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Parcela backend listening on 0.0.0.0:${PORT} | sheetsConfigured=${SHEETS_CONFIGURED}`);
});
