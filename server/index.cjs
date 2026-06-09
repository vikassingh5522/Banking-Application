const path = require('node:path');
const process = require('node:process');

const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

dotenv.config({ quiet: true });

const app = express();
const port = Number(process.env.API_PORT || 5000);
const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET;
const cookieName = 'bankdash_token';
const databaseUrl = process.env.DATABASE_URL;
const mistralApiKey = process.env.MISTRAL_API_KEY;
const mistralModel = process.env.MISTRAL_MODEL || 'mistral-small-latest';

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required. Add it to your .env file.');
}

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required. Add your Supabase Postgres connection string to .env.',
  );
}

const pool = new Pool({
  connectionString: databaseUrl,
  max: Number(process.env.DB_CONNECTION_LIMIT || 10),
  ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
});

const corsOrigin = process.env.CORS_ORIGIN;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (corsOrigin) {
    res.header('Access-Control-Allow-Origin', corsOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

const userSelect = `
  id,
  name,
  email,
  company_name AS "companyName",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

const businessPanelSeedData = [
  {
    path: '/accounts',
    title: 'Accounts & Banking',
    category: 'Cash Position',
    summary: 'Manage connected accounts, balances, statements, and cash positions.',
    metrics: [
      { label: 'Available Balance', value: 'Rs.2.46 Cr' },
      { label: 'OD Utilized', value: '36.8%' },
      { label: 'Unreconciled Items', value: '24' },
      { label: 'Statement Sync', value: '98%' },
    ],
    records: [
      { name: 'ConnectBank Current A/c', amount: 'Rs.1.25 Cr', status: 'Synced' },
      { name: 'HDFC Bank A/c', amount: 'Rs.45.15L', status: 'Synced' },
      { name: 'ConnectBank OD A/c', amount: '-Rs.18.40L', status: 'Review' },
    ],
  },
  {
    path: '/payments',
    title: 'Payments',
    category: 'Outgoing Money',
    summary: 'Create vendor payments, bulk transfers, and scheduled payouts.',
    metrics: [
      { label: 'Scheduled Today', value: 'Rs.7.85L' },
      { label: 'Awaiting Approval', value: '11' },
      { label: 'Bulk Transfers', value: '4 files' },
      { label: 'Failed Payments', value: '2' },
    ],
    records: [
      { name: 'Steel India Ltd', amount: 'Rs.2.40L', status: 'Approved' },
      { name: 'Machine Tools Inc', amount: 'Rs.1.65L', status: 'Queued' },
      { name: 'Transport Co.', amount: 'Rs.72,000', status: 'Failed' },
    ],
  },
  {
    path: '/collections',
    title: 'Collections',
    category: 'Incoming Money',
    summary: 'Track customer collections, incoming payments, and settlement status.',
    metrics: [
      { label: 'Collected Today', value: 'Rs.18.75L' },
      { label: 'Pending Links', value: '32' },
      { label: 'Overdue', value: 'Rs.4.75L' },
      { label: 'Settlement Success', value: '99.1%' },
    ],
    records: [
      { name: 'ABC Enterprises', amount: 'Rs.2.50L', status: 'Received' },
      { name: 'Global Supplies', amount: 'Rs.1.25L', status: 'Pending' },
      { name: 'Sharma Traders', amount: 'Rs.2.25L', status: 'Overdue' },
    ],
  },
  {
    path: '/accounting',
    title: 'Accounting',
    category: 'Books & Ledger',
    summary: 'Reconcile expenses, ledgers, journal entries, and bookkeeping workflows.',
    metrics: [
      { label: 'Ledger Balance', value: 'Rs.2.29 Cr' },
      { label: 'Unposted Entries', value: '17' },
      { label: 'Expense Claims', value: 'Rs.3.18L' },
      { label: 'Mismatch Value', value: 'Rs.1.12L' },
    ],
    records: [
      { name: 'Purchase Ledger', amount: 'Rs.81.5L', status: 'Posted' },
      { name: 'Travel Expenses', amount: 'Rs.2.10L', status: 'Review' },
      { name: 'Bank Charges', amount: 'Rs.18,400', status: 'Posted' },
    ],
  },
  {
    path: '/gst-tax',
    title: 'GST & Tax',
    category: 'Compliance Calendar',
    summary: 'Monitor GST returns, tax dues, compliance reminders, and filing tasks.',
    metrics: [
      { label: 'GST Payable', value: 'Rs.8.42L' },
      { label: 'Input Credit', value: 'Rs.5.10L' },
      { label: 'Mismatches', value: '9' },
      { label: 'TDS Due', value: 'Rs.1.36L' },
    ],
    records: [
      { name: 'GSTR-3B Apr 2026', amount: 'Rs.8.42L', status: 'Draft' },
      { name: 'ITC Mismatch', amount: 'Rs.76,000', status: 'Review' },
      { name: 'TDS Payable', amount: 'Rs.1.36L', status: 'Scheduled' },
    ],
  },
  {
    path: '/invoicing',
    title: 'Invoicing',
    category: 'Sales Billing',
    summary: 'Create invoices, track receivables, and follow up on overdue bills.',
    metrics: [
      { label: 'Invoice Value', value: 'Rs.38.75L' },
      { label: 'Paid', value: 'Rs.21.9L' },
      { label: 'Overdue', value: 'Rs.4.75L' },
      { label: 'Drafts', value: '7' },
    ],
    records: [
      { name: 'INV-1023 ABC Enterprises', amount: 'Rs.2.50L', status: 'Pending' },
      { name: 'INV-1017 Delta Corp', amount: 'Rs.1.80L', status: 'Paid' },
      { name: 'INV-0988 Sharma Traders', amount: 'Rs.2.25L', status: 'Overdue' },
    ],
  },
  {
    path: '/lending',
    title: 'Lending',
    category: 'Credit & Funding',
    summary: 'Review working capital offers, credit limits, and loan repayments.',
    metrics: [
      { label: 'Eligible Limit', value: 'Rs.50L' },
      { label: 'Utilized', value: 'Rs.18.4L' },
      { label: 'Next EMI', value: 'Rs.1.24L' },
      { label: 'Credit Score', value: '782' },
    ],
    records: [
      { name: 'Working Capital Line', amount: 'Rs.50L', status: 'Active' },
      { name: 'Invoice Financing', amount: 'Rs.12L', status: 'Eligible' },
      { name: 'Term Loan EMI', amount: 'Rs.1.24L', status: 'Scheduled' },
    ],
  },
  {
    path: '/trade-supply-chain',
    title: 'Trade & Supply Chain',
    category: 'Trade Operations',
    summary: 'Coordinate trade finance, supplier payments, and logistics documents.',
    metrics: [
      { label: 'Open POs', value: '28' },
      { label: 'In Transit', value: '12' },
      { label: 'Documents Pending', value: '6' },
      { label: 'Supplier Advances', value: 'Rs.14.2L' },
    ],
    records: [
      { name: 'PO-7842 Steel India', amount: 'Rs.22.5L', status: 'Open' },
      { name: 'Shipment BL-4431', amount: 'Rs.18.8L', status: 'In transit' },
      { name: 'LC Request LC-102', amount: 'Rs.35L', status: 'Review' },
    ],
  },
  {
    path: '/payroll',
    title: 'Payroll & HR',
    category: 'People Payments',
    summary: 'Run payroll, reimbursements, benefits, and employee banking tasks.',
    metrics: [
      { label: 'Payroll Due', value: 'Rs.18.6L' },
      { label: 'Reimbursements', value: 'Rs.1.14L' },
      { label: 'PF/ESI', value: 'Rs.2.32L' },
      { label: 'New Joiners', value: '5' },
    ],
    records: [
      { name: 'June Salary Run', amount: 'Rs.18.6L', status: 'Draft' },
      { name: 'Travel Claims', amount: 'Rs.1.14L', status: 'Review' },
      { name: 'PF Contribution', amount: 'Rs.1.48L', status: 'Scheduled' },
    ],
  },
  {
    path: '/insurance',
    title: 'Insurance',
    category: 'Risk Cover',
    summary: 'Manage business insurance policies, claims, and renewal reminders.',
    metrics: [
      { label: 'Active Policies', value: '7' },
      { label: 'Coverage', value: 'Rs.3.2 Cr' },
      { label: 'Renewals Due', value: '2' },
      { label: 'Open Claims', value: '1' },
    ],
    records: [
      { name: 'Property Insurance', amount: 'Rs.1.2 Cr', status: 'Due' },
      { name: 'Group Health', amount: 'Rs.80L', status: 'Active' },
      { name: 'Machine Claim', amount: 'Rs.3.4L', status: 'Review' },
    ],
  },
  {
    path: '/marketplace',
    title: 'Marketplace',
    category: 'Partner Apps',
    summary: 'Discover banking, SaaS, and partner services for your business.',
    metrics: [
      { label: 'Connected Apps', value: '6' },
      { label: 'Recommended', value: '12' },
      { label: 'Savings Found', value: 'Rs.74K' },
      { label: 'Pending Setups', value: '3' },
    ],
    records: [
      { name: 'Tally Connector', amount: 'Free', status: 'Connected' },
      { name: 'Zoho Payroll', amount: '20% off', status: 'Recommended' },
      { name: 'GST Filing Pro', amount: 'Rs.999/mo', status: 'Available' },
    ],
  },
  {
    path: '/reports',
    title: 'Reports & Analytics',
    category: 'Performance Analytics',
    summary: 'Analyze cash flow, collections, spend, and financial performance.',
    metrics: [
      { label: 'Revenue MTD', value: 'Rs.64.2L' },
      { label: 'Gross Margin', value: '31.2%' },
      { label: 'Cash Runway', value: '94 days' },
      { label: 'Reports Ready', value: '9' },
    ],
    records: [
      { name: 'May MIS Report', amount: '9 charts', status: 'Ready' },
      { name: 'Lender Pack', amount: '12 docs', status: 'Draft' },
      { name: 'Expense Analysis', amount: '5 views', status: 'Ready' },
    ],
  },
  {
    path: '/compliance',
    title: 'Compliance',
    category: 'Controls & Audit',
    summary: 'Track statutory obligations, audit items, and regulatory documents.',
    metrics: [
      { label: 'Open Tasks', value: '14' },
      { label: 'Completed', value: '86%' },
      { label: 'Audit Findings', value: '3' },
      { label: 'Documents', value: '128' },
    ],
    records: [
      { name: 'GST Filing Evidence', amount: '8 docs', status: 'Filed' },
      { name: 'ROC Annual Return', amount: '4 tasks', status: 'Open' },
      { name: 'Payment Approval Audit', amount: '3 findings', status: 'Review' },
    ],
  },
  {
    path: '/settings',
    title: 'Settings',
    category: 'Configuration',
    summary: 'Configure users, approval rules, account preferences, and security.',
    metrics: [
      { label: 'Active Users', value: '18' },
      { label: 'Approval Rules', value: '7' },
      { label: 'Security Score', value: '91%' },
      { label: 'Pending Invites', value: '3' },
    ],
    records: [
      { name: 'Payment Approval Rule', amount: '2 approvers', status: 'Active' },
      { name: 'Admin 2FA', amount: '100%', status: 'Enabled' },
      { name: 'Invite: accountant@demo.in', amount: '1 invite', status: 'Pending' },
    ],
  },
  {
    path: '/ai-assistant',
    title: 'AI Business Assistant',
    category: 'Beta',
    summary: 'Ask questions about cash flow, tax savings, payments, and business health.',
    metrics: [
      { label: 'Questions Answered', value: '248' },
      { label: 'Cash Insights', value: '18' },
      { label: 'Savings Found', value: 'Rs.1.2L' },
      { label: 'Alerts Raised', value: '11' },
    ],
    records: [
      { name: 'Cash runway question', amount: '94 days', status: 'Saved' },
      { name: 'GST mismatch summary', amount: 'Rs.76,000', status: 'Ready' },
      { name: 'Funding eligibility', amount: 'Rs.50L', status: 'Eligible' },
    ],
  },
];

function normalizeUserInput(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    companyName: user.companyName,
  };
}

function setAuthCookie(res, user) {
  const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '8h' });

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });
}

function sanitizeAssistantHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item) => item?.role === 'user' || item?.role === 'assistant')
    .map((item) => ({
      role: item.role,
      content: normalizeUserInput(item.content).slice(0, 1200),
    }))
    .filter((item) => item.content)
    .slice(-8);
}

function readMistralContent(content) {
  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }

        if (typeof part?.text === 'string') {
          return part.text;
        }

        return '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

function createAssistantSystemPrompt(user, panels) {
  const businessContext = panels.map((panel) => ({
    module: panel.title,
    path: panel.path,
    category: panel.category,
    summary: panel.summary,
    metrics: panel.metrics,
    records: panel.records,
  }));

  return [
    'You are ConnectBank AI Business Assistant for an Indian SME banking dashboard.',
    'Answer only business banking, cash flow, collections, payments, GST, accounting, lending, payroll, compliance, reports, and dashboard workflow questions.',
    'Use the supplied dashboard context as the source of truth. If data is missing, say what is missing and suggest where to check in the dashboard.',
    'Keep answers concise, practical, and action-oriented. Use INR formatting when mentioning money.',
    'Do not claim that you completed payments, invoices, transfers, filings, or account changes. Recommend next steps and relevant dashboard sections instead.',
    `Current user: ${user.name || 'Business user'} from ${user.companyName || 'their company'}.`,
    `Dashboard context JSON: ${JSON.stringify(businessContext)}`,
  ].join('\n');
}

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies[cookieName];

    if (!token) {
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    const payload = jwt.verify(token, jwtSecret);
    const { rows } = await pool.query(`SELECT ${userSelect} FROM users WHERE id = $1 LIMIT 1`, [
      payload.sub,
    ]);

    if (!rows.length) {
      clearAuthCookie(res);
      res.status(401).json({ message: 'User no longer exists.' });
      return;
    }

    req.user = publicUser(rows[0]);
    next();
  } catch {
    clearAuthCookie(res);
    res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

async function addColumnIfMissing(columnName, definition) {
  const { rows } = await pool.query(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'users' AND column_name = $1
     LIMIT 1`,
    [columnName],
  );

  if (!rows.length) {
    await pool.query(`ALTER TABLE users ADD COLUMN ${definition}`);
  }
}

async function dropUserColumnIfExists(columnName) {
  const { rows } = await pool.query(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'users' AND column_name = $1
     LIMIT 1`,
    [columnName],
  );

  if (rows.length) {
    await pool.query(`ALTER TABLE users DROP COLUMN ${columnName}`);
  }
}

async function initializeDatabase() {
  await pool.query('SELECT 1');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      company_name VARCHAR(160) NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT users_email_unique UNIQUE (email)
    )
  `);

  await addColumnIfMissing('company_name', "company_name VARCHAR(160) NOT NULL DEFAULT ''");

  for (const columnName of ['note', 'role', 'title', 'business_type', 'phone', 'gstin', 'avatar_url']) {
    await dropUserColumnIfExists(columnName);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS business_panel_data (
      path VARCHAR(120) PRIMARY KEY,
      title VARCHAR(120) NOT NULL,
      category VARCHAR(120) NOT NULL,
      summary TEXT NOT NULL,
      metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
      records JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  for (const panel of businessPanelSeedData) {
    await pool.query(
      `INSERT INTO business_panel_data (path, title, category, summary, metrics, records)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
       ON CONFLICT (path) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         summary = EXCLUDED.summary,
         metrics = EXCLUDED.metrics,
         records = EXCLUDED.records,
         updated_at = NOW()`,
      [
        panel.path,
        panel.title,
        panel.category,
        panel.summary,
        JSON.stringify(panel.metrics),
        JSON.stringify(panel.records),
      ],
    );
  }

  const seedEmail = process.env.AUTH_SEED_EMAIL || 'info@dashbank.com';
  const seedPassword = process.env.AUTH_SEED_PASSWORD;

  if (!seedPassword) {
    console.warn('AUTH_SEED_PASSWORD is not set. Skipping default user seed.');
    return;
  }

  const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [
    seedEmail,
  ]);

  if (existing.length) {
    return;
  }

  const passwordHash = await bcrypt.hash(seedPassword, 12);

  await pool.query(
    `INSERT INTO users (
       name, email, password_hash, company_name
     )
     VALUES ($1, $2, $3, $4)`,
    [
      process.env.AUTH_SEED_NAME || 'Charlene Reed',
      seedEmail,
      passwordHash,
      process.env.AUTH_SEED_COMPANY_NAME || 'DashBank',
    ],
  );

  console.log(`Seeded default user: ${seedEmail}`);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/business-panels', requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT path, title, category, summary, metrics, records, updated_at AS "updatedAt"
       FROM business_panel_data
       ORDER BY path`,
    );

    res.json({ panels: rows });
  } catch (error) {
    next(error);
  }
});

app.get('/api/business-panels/:slug', requireAuth, async (req, res, next) => {
  try {
    const panelPath = `/${req.params.slug}`;
    const { rows } = await pool.query(
      `SELECT path, title, category, summary, metrics, records, updated_at AS "updatedAt"
       FROM business_panel_data
       WHERE path = $1
       LIMIT 1`,
      [panelPath],
    );

    if (!rows.length) {
      res.status(404).json({ message: 'Panel data not found.' });
      return;
    }

    res.json({ panel: rows[0] });
  } catch (error) {
    next(error);
  }
});

app.post('/api/ai-assistant/chat', requireAuth, async (req, res, next) => {
  try {
    const message = normalizeUserInput(req.body?.message);
    const history = sanitizeAssistantHistory(req.body?.history);

    if (!message) {
      res.status(400).json({ message: 'Message is required.' });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({ message: 'Message must be 2,000 characters or less.' });
      return;
    }

    if (!mistralApiKey) {
      res.status(503).json({
        message: 'Mistral API key is not configured. Add MISTRAL_API_KEY to your .env file.',
      });
      return;
    }

    const { rows: panels } = await pool.query(
      `SELECT path, title, category, summary, metrics, records
       FROM business_panel_data
       ORDER BY path`,
    );

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let response;

    try {
      response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${mistralApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: mistralModel,
          temperature: 0.25,
          max_tokens: 700,
          messages: [
            {
              role: 'system',
              content: createAssistantSystemPrompt(req.user, panels),
            },
            ...history,
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });
    } finally {
      clearTimeout(timeout);
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      res.status(502).json({
        message: data?.message || data?.error?.message || 'Mistral AI request failed.',
      });
      return;
    }

    const answer = readMistralContent(data?.choices?.[0]?.message?.content);

    if (!answer) {
      res.status(502).json({ message: 'Mistral AI returned an empty response.' });
      return;
    }

    res.json({
      answer,
      model: data?.model || mistralModel,
    });
  } catch (error) {
    if (error?.name === 'AbortError') {
      res.status(504).json({ message: 'Mistral AI request timed out.' });
      return;
    }

    next(error);
  }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const name = normalizeUserInput(req.body?.name);
    const email = normalizeUserInput(req.body?.email).toLowerCase();
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    const companyName = normalizeUserInput(req.body?.companyName);

    if (!name || !companyName || !email || !password) {
      res.status(400).json({ message: 'Name, company name, email, and password are required.' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'Password must be at least 8 characters.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { rows } = await pool.query(
      `INSERT INTO users (
         name, email, password_hash, company_name
       )
       VALUES ($1, $2, $3, $4)
       RETURNING ${userSelect}`,
      [name, email, passwordHash, companyName],
    );

    const user = rows[0];
    setAuthCookie(res, user);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error?.code === '23505') {
      res.status(409).json({ message: 'An account with this email already exists.' });
      return;
    }

    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = normalizeUserInput(req.body?.email).toLowerCase();
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const { rows } = await pool.query(
      `SELECT ${userSelect}, password_hash AS "passwordHash" FROM users WHERE email = $1 LIMIT 1`,
      [email],
    );

    const user = rows[0];
    const isValid = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!isValid) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    setAuthCookie(res, user);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));
app.use('/bankdash', express.static(distPath));

app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error.' });
});

const ready = initializeDatabase();

if (require.main === module) {
  ready
    .then(() => {
      app.listen(port, () => {
        console.log(`BankDash API running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error('Failed to initialize Supabase Postgres connection.', error);
      process.exit(1);
    });
}

module.exports = {
  app,
  ready,
};
