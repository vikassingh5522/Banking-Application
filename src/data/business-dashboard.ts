export interface BusinessModule {
  title: string;
  path: string;
  icon: string;
  description: string;
}

export const businessModules: BusinessModule[] = [
  {
    title: 'Accounts & Banking',
    path: '/accounts',
    icon: 'lucide:landmark',
    description: 'Manage connected accounts, balances, statements, and cash positions.',
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: 'lucide:send',
    description: 'Create vendor payments, bulk transfers, and scheduled payouts.',
  },
  {
    title: 'Collections',
    path: '/collections',
    icon: 'lucide:download',
    description: 'Track customer collections, incoming payments, and settlement status.',
  },
  {
    title: 'Accounting',
    path: '/accounting',
    icon: 'lucide:calculator',
    description: 'Reconcile expenses, ledgers, journal entries, and bookkeeping workflows.',
  },
  {
    title: 'GST & Tax',
    path: '/gst-tax',
    icon: 'lucide:file-check-2',
    description: 'Monitor GST returns, tax dues, compliance reminders, and filing tasks.',
  },
  {
    title: 'Invoicing',
    path: '/invoicing',
    icon: 'lucide:file-text',
    description: 'Create invoices, track receivables, and follow up on overdue bills.',
  },
  {
    title: 'Lending',
    path: '/lending',
    icon: 'lucide:badge-indian-rupee',
    description: 'Review working capital offers, credit limits, and loan repayments.',
  },
  {
    title: 'Trade & Supply Chain',
    path: '/trade-supply-chain',
    icon: 'lucide:truck',
    description: 'Coordinate trade finance, supplier payments, and logistics documents.',
  },
  {
    title: 'Payroll & HR',
    path: '/payroll',
    icon: 'lucide:users',
    description: 'Run payroll, reimbursements, benefits, and employee banking tasks.',
  },
  {
    title: 'Insurance',
    path: '/insurance',
    icon: 'lucide:shield-check',
    description: 'Manage business insurance policies, claims, and renewal reminders.',
  },
  {
    title: 'Marketplace',
    path: '/marketplace',
    icon: 'lucide:store',
    description: 'Discover banking, SaaS, and partner services for your business.',
  },
  {
    title: 'Reports & Analytics',
    path: '/reports',
    icon: 'lucide:bar-chart-3',
    description: 'Analyze cash flow, collections, spend, and financial performance.',
  },
  {
    title: 'Compliance',
    path: '/compliance',
    icon: 'lucide:clipboard-check',
    description: 'Track statutory obligations, audit items, and regulatory documents.',
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: 'lucide:settings',
    description: 'Configure users, approval rules, account preferences, and security.',
  },
  {
    title: 'AI Business Assistant',
    path: '/ai-assistant',
    icon: 'lucide:sparkles',
    description: 'Ask questions about cash flow, tax savings, payments, and business health.',
  },
];

export type ModuleChartType = 'bar' | 'line' | 'donut' | 'timeline';

export interface ModuleKpi {
  label: string;
  value: string;
  caption: string;
  icon: string;
  tone: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ModulePanelData {
  path: string;
  eyebrow: string;
  primaryAction: string;
  kpis: ModuleKpi[];
  chart: {
    title: string;
    type: ModuleChartType;
    labels: string[];
    values: number[];
    colors?: string[];
  };
  actions: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  records: Array<{
    name: string;
    meta: string;
    amount: string;
    status: string;
  }>;
  insights: string[];
}

const modulePanelMap: Record<string, Omit<ModulePanelData, 'path'>> = {
  '/accounts': {
    eyebrow: 'Cash Position',
    primaryAction: 'Connect Account',
    kpis: [
      {
        label: 'Available Balance',
        value: 'Rs.2.46 Cr',
        caption: 'Across 6 bank accounts',
        icon: 'lucide:wallet',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'OD Utilized',
        value: '36.8%',
        caption: 'Rs.18.4L of Rs.50L',
        icon: 'lucide:gauge',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Unreconciled Items',
        value: '24',
        caption: 'Rs.7.8L pending review',
        icon: 'lucide:refresh-cw',
        tone: '#FEECEF',
        trend: 'down',
      },
      {
        label: 'Statement Sync',
        value: '98%',
        caption: 'Last synced 12 minutes ago',
        icon: 'lucide:cloud-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Daily Closing Balance',
      type: 'line',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      values: [212, 226, 218, 239, 245, 246],
    },
    actions: [
      {
        title: 'Download Statements',
        description: 'Export account statements for the selected period.',
        icon: 'lucide:file-down',
      },
      {
        title: 'Reconcile Bank Feed',
        description: 'Match deposits, charges, and transfers with ledger entries.',
        icon: 'lucide:git-compare',
      },
      {
        title: 'Cash Position Report',
        description: 'Review runway, idle cash, and overdraft exposure.',
        icon: 'lucide:line-chart',
      },
    ],
    records: [
      {
        name: 'ConnectBank Current A/c',
        meta: 'A/c ...1234',
        amount: 'Rs.1.25 Cr',
        status: 'Synced',
      },
      { name: 'HDFC Bank A/c', meta: 'A/c ...3456', amount: 'Rs.45.15L', status: 'Synced' },
      { name: 'ConnectBank OD A/c', meta: 'A/c ...5678', amount: '-Rs.18.40L', status: 'Review' },
    ],
    insights: [
      'Move Rs.12L from idle current balance to overnight sweep for better yield.',
      'Two bank charges need ledger category confirmation.',
      'OD utilization is below your internal 45% threshold.',
    ],
  },
  '/payments': {
    eyebrow: 'Outgoing Money',
    primaryAction: 'Create Payment',
    kpis: [
      {
        label: 'Scheduled Today',
        value: 'Rs.7.85L',
        caption: '18 vendor payouts',
        icon: 'lucide:send',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
      {
        label: 'Awaiting Approval',
        value: '11',
        caption: 'Rs.12.4L value',
        icon: 'lucide:stamp',
        tone: '#FFF4E5',
        trend: 'down',
      },
      {
        label: 'Bulk Transfers',
        value: '4 files',
        caption: '2 processed, 2 queued',
        icon: 'lucide:files',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Failed Payments',
        value: '2',
        caption: 'Beneficiary validation failed',
        icon: 'lucide:circle-alert',
        tone: '#FEECEF',
        trend: 'down',
      },
    ],
    chart: {
      title: 'Payment Mix',
      type: 'bar',
      labels: ['Vendors', 'Salary', 'Tax', 'Utilities', 'Rent'],
      values: [38, 24, 16, 9, 13],
    },
    actions: [
      {
        title: 'Vendor Payment',
        description: 'Pay one vendor using saved beneficiary and approval rules.',
        icon: 'lucide:user-check',
      },
      {
        title: 'Bulk Upload',
        description: 'Upload CSV/XLSX payout file with validation.',
        icon: 'lucide:upload',
      },
      {
        title: 'Schedule Payout',
        description: 'Create future-dated payments with reminders.',
        icon: 'lucide:calendar-clock',
      },
    ],
    records: [
      { name: 'Steel India Ltd', meta: 'Vendor payout', amount: 'Rs.2.40L', status: 'Approved' },
      { name: 'Machine Tools Inc', meta: 'NEFT scheduled', amount: 'Rs.1.65L', status: 'Queued' },
      { name: 'Transport Co.', meta: 'Beneficiary check', amount: 'Rs.72,000', status: 'Failed' },
    ],
    insights: [
      'Approving the 11 pending payments before 4 PM prevents next-day settlement.',
      'Two vendors are missing GSTIN details in beneficiary master.',
      'Bulk transfer file has duplicate invoice references for review.',
    ],
  },
  '/collections': {
    eyebrow: 'Incoming Money',
    primaryAction: 'Collect Payment',
    kpis: [
      {
        label: 'Collected Today',
        value: 'Rs.18.75L',
        caption: '+12.5% vs yesterday',
        icon: 'lucide:download',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Pending Links',
        value: '32',
        caption: 'Rs.41.2L outstanding',
        icon: 'lucide:link',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
      {
        label: 'Overdue',
        value: 'Rs.4.75L',
        caption: '2 invoices overdue',
        icon: 'lucide:clock',
        tone: '#FEECEF',
        trend: 'down',
      },
      {
        label: 'Settlement Success',
        value: '99.1%',
        caption: 'UPI, cards, bank transfer',
        icon: 'lucide:badge-check',
        tone: '#EEF2FF',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Collection Channels',
      type: 'donut',
      labels: ['UPI', 'Bank Transfer', 'Cards', 'Cash'],
      values: [46, 32, 15, 7],
      colors: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'],
    },
    actions: [
      {
        title: 'Payment Link',
        description: 'Generate a branded link with expiry and reminders.',
        icon: 'lucide:link-2',
      },
      {
        title: 'Auto Reminder',
        description: 'Send WhatsApp and email nudges for pending dues.',
        icon: 'lucide:bell-ring',
      },
      {
        title: 'Settlement Match',
        description: 'Match received funds with invoice and customer.',
        icon: 'lucide:list-checks',
      },
    ],
    records: [
      { name: 'ABC Enterprises', meta: 'Invoice INV-1023', amount: 'Rs.2.50L', status: 'Received' },
      { name: 'Global Supplies', meta: 'Payment link', amount: 'Rs.1.25L', status: 'Pending' },
      { name: 'Sharma Traders', meta: 'Invoice INV-0988', amount: 'Rs.2.25L', status: 'Overdue' },
    ],
    insights: [
      'UPI collections are settling 22 minutes faster than bank transfers.',
      'Two high-value invoices need follow-up today.',
      'Enable auto-reminders for customers with more than 7-day delay.',
    ],
  },
  '/accounting': {
    eyebrow: 'Books & Ledger',
    primaryAction: 'Add Journal',
    kpis: [
      {
        label: 'Ledger Balance',
        value: 'Rs.2.29 Cr',
        caption: 'Matched with bank 94%',
        icon: 'lucide:book-open',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Unposted Entries',
        value: '17',
        caption: 'Need accountant review',
        icon: 'lucide:file-pen-line',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Expense Claims',
        value: 'Rs.3.18L',
        caption: '42 receipts captured',
        icon: 'lucide:receipt',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Mismatch Value',
        value: 'Rs.1.12L',
        caption: 'Down 18% this week',
        icon: 'lucide:triangle-alert',
        tone: '#FEECEF',
        trend: 'down',
      },
    ],
    chart: {
      title: 'Expense Categories',
      type: 'bar',
      labels: ['COGS', 'Payroll', 'Rent', 'Marketing', 'Travel'],
      values: [42, 28, 11, 9, 10],
    },
    actions: [
      {
        title: 'Bank Reconciliation',
        description: 'Clear unmatched transactions with suggested ledger entries.',
        icon: 'lucide:refresh-cw',
      },
      {
        title: 'Capture Expense',
        description: 'Upload receipts and auto-read vendor, tax, and amount.',
        icon: 'lucide:scan-line',
      },
      {
        title: 'Trial Balance',
        description: 'Generate ledger summary for accountant review.',
        icon: 'lucide:scale',
      },
    ],
    records: [
      { name: 'Purchase Ledger', meta: 'May 2026', amount: 'Rs.81.5L', status: 'Posted' },
      { name: 'Travel Expenses', meta: '42 receipts', amount: 'Rs.2.10L', status: 'Review' },
      { name: 'Bank Charges', meta: 'Auto categorized', amount: 'Rs.18,400', status: 'Posted' },
    ],
    insights: [
      'Purchase ledger is the biggest spend category this month.',
      'Three receipts have unreadable GST details.',
      'Auto-posting can clear 11 low-risk entries.',
    ],
  },
  '/gst-tax': {
    eyebrow: 'Compliance Calendar',
    primaryAction: 'Prepare Return',
    kpis: [
      {
        label: 'GST Payable',
        value: 'Rs.8.42L',
        caption: 'Due in 5 days',
        icon: 'lucide:file-check-2',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Input Credit',
        value: 'Rs.5.10L',
        caption: '92 invoices matched',
        icon: 'lucide:badge-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Mismatches',
        value: '9',
        caption: 'Rs.76,000 tax impact',
        icon: 'lucide:git-pull-request',
        tone: '#FEECEF',
        trend: 'down',
      },
      {
        label: 'TDS Due',
        value: 'Rs.1.36L',
        caption: 'Next filing cycle',
        icon: 'lucide:landmark',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Tax Liability Trend',
      type: 'line',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [6.4, 7.2, 6.9, 8.1, 8.4, 7.8],
    },
    actions: [
      {
        title: 'GSTR-3B Summary',
        description: 'Review tax payable, ITC, and challan value.',
        icon: 'lucide:file-spreadsheet',
      },
      {
        title: 'Match GSTR-2B',
        description: 'Compare supplier invoices with portal data.',
        icon: 'lucide:shuffle',
      },
      {
        title: 'Tax Calendar',
        description: 'Track GST, TDS, and advance-tax deadlines.',
        icon: 'lucide:calendar-days',
      },
    ],
    records: [
      { name: 'GSTR-3B Apr 2026', meta: 'Due 20 May', amount: 'Rs.8.42L', status: 'Draft' },
      { name: 'ITC Mismatch', meta: '9 invoices', amount: 'Rs.76,000', status: 'Review' },
      { name: 'TDS Payable', meta: 'Q1 estimate', amount: 'Rs.1.36L', status: 'Scheduled' },
    ],
    insights: [
      'Resolve ITC mismatches before filing to avoid cash outflow.',
      'Three suppliers have not uploaded invoices to 2B.',
      'Current tax provision is trending 9% above last quarter.',
    ],
  },
  '/invoicing': {
    eyebrow: 'Sales Billing',
    primaryAction: 'Create Invoice',
    kpis: [
      {
        label: 'Invoice Value',
        value: 'Rs.38.75L',
        caption: '42 invoices this month',
        icon: 'lucide:file-text',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Paid',
        value: 'Rs.21.9L',
        caption: '56.5% collection ratio',
        icon: 'lucide:badge-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Overdue',
        value: 'Rs.4.75L',
        caption: '2 invoices need action',
        icon: 'lucide:clock',
        tone: '#FEECEF',
        trend: 'down',
      },
      {
        label: 'Drafts',
        value: '7',
        caption: 'Rs.6.1L pending send',
        icon: 'lucide:file-pen',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Invoice Status',
      type: 'donut',
      labels: ['Paid', 'Pending', 'Overdue', 'Draft'],
      values: [56, 25, 12, 7],
      colors: ['#10B981', '#2563EB', '#EF4444', '#F59E0B'],
    },
    actions: [
      {
        title: 'New GST Invoice',
        description: 'Create compliant invoice with tax split and payment link.',
        icon: 'lucide:file-plus-2',
      },
      {
        title: 'Send Reminder',
        description: 'Send customer reminders for unpaid invoices.',
        icon: 'lucide:mail-check',
      },
      {
        title: 'Recurring Invoice',
        description: 'Automate monthly billing for repeat customers.',
        icon: 'lucide:repeat',
      },
    ],
    records: [
      {
        name: 'INV-1023 ABC Enterprises',
        meta: 'Due today',
        amount: 'Rs.2.50L',
        status: 'Pending',
      },
      { name: 'INV-1017 Delta Corp', meta: 'Paid by UPI', amount: 'Rs.1.80L', status: 'Paid' },
      {
        name: 'INV-0988 Sharma Traders',
        meta: '11 days late',
        amount: 'Rs.2.25L',
        status: 'Overdue',
      },
    ],
    insights: [
      'Adding payment links to drafts may improve collection speed.',
      'Two invoices crossed your 7-day follow-up rule.',
      'ABC Enterprises has paid 5 of last 6 invoices on time.',
    ],
  },
  '/lending': {
    eyebrow: 'Credit & Funding',
    primaryAction: 'Apply for Limit',
    kpis: [
      {
        label: 'Eligible Limit',
        value: 'Rs.50L',
        caption: 'Pre-approved working capital',
        icon: 'lucide:badge-indian-rupee',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Utilized',
        value: 'Rs.18.4L',
        caption: '36.8% of limit',
        icon: 'lucide:gauge',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Next EMI',
        value: 'Rs.1.24L',
        caption: 'Due 7 Jul',
        icon: 'lucide:calendar-clock',
        tone: '#FEECEF',
        trend: 'neutral',
      },
      {
        label: 'Credit Score',
        value: '782',
        caption: 'Excellent range',
        icon: 'lucide:shield-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Limit Utilization',
      type: 'bar',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [22, 30, 26, 34, 36.8, 31],
    },
    actions: [
      {
        title: 'Draw Down',
        description: 'Use approved credit for short-term cash needs.',
        icon: 'lucide:download',
      },
      {
        title: 'Repayment Plan',
        description: 'View EMI schedule and early repayment options.',
        icon: 'lucide:calendar-range',
      },
      {
        title: 'Limit Enhancement',
        description: 'Submit fresh bank and GST data for higher limit.',
        icon: 'lucide:trending-up',
      },
    ],
    records: [
      { name: 'Working Capital Line', meta: 'Active facility', amount: 'Rs.50L', status: 'Active' },
      {
        name: 'Invoice Financing',
        meta: 'Based on receivables',
        amount: 'Rs.12L',
        status: 'Eligible',
      },
      { name: 'Term Loan EMI', meta: 'Due 7 Jul', amount: 'Rs.1.24L', status: 'Scheduled' },
    ],
    insights: [
      'You can safely draw Rs.8L while staying below 55% utilization.',
      'Collections from ABC Enterprises can reduce interest outgo.',
      'GST filing consistency supports a higher credit line.',
    ],
  },
  '/trade-supply-chain': {
    eyebrow: 'Trade Operations',
    primaryAction: 'Create LC Request',
    kpis: [
      {
        label: 'Open POs',
        value: '28',
        caption: 'Rs.1.18 Cr committed',
        icon: 'lucide:clipboard-list',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
      {
        label: 'In Transit',
        value: '12',
        caption: 'Shipments expected this week',
        icon: 'lucide:truck',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Documents Pending',
        value: '6',
        caption: 'LC, invoice, e-way bill',
        icon: 'lucide:file-warning',
        tone: '#FFF4E5',
        trend: 'down',
      },
      {
        label: 'Supplier Advances',
        value: 'Rs.14.2L',
        caption: '3 suppliers',
        icon: 'lucide:send',
        tone: '#EEF2FF',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Shipment Timeline',
      type: 'timeline',
      labels: ['PO', 'Advance', 'Dispatch', 'Customs', 'Delivery'],
      values: [100, 85, 64, 42, 28],
    },
    actions: [
      {
        title: 'Supplier Payment',
        description: 'Release advance or milestone payment with documents.',
        icon: 'lucide:send-horizontal',
      },
      {
        title: 'Track Shipment',
        description: 'Monitor logistics stages and document gaps.',
        icon: 'lucide:map-pinned',
      },
      {
        title: 'Trade Finance',
        description: 'Request LC, BG, or invoice discounting support.',
        icon: 'lucide:badge-indian-rupee',
      },
    ],
    records: [
      { name: 'PO-7842 Steel India', meta: 'Dispatch pending', amount: 'Rs.22.5L', status: 'Open' },
      {
        name: 'Shipment BL-4431',
        meta: 'Arriving 14 Jun',
        amount: 'Rs.18.8L',
        status: 'In transit',
      },
      { name: 'LC Request LC-102', meta: 'Documents pending', amount: 'Rs.35L', status: 'Review' },
    ],
    insights: [
      'Six documents are blocking trade finance processing.',
      'Advance payment terms can be renegotiated for two repeat suppliers.',
      'Shipment delay risk is highest for BL-4431.',
    ],
  },
  '/payroll': {
    eyebrow: 'People Payments',
    primaryAction: 'Run Payroll',
    kpis: [
      {
        label: 'Payroll Due',
        value: 'Rs.18.6L',
        caption: '86 employees',
        icon: 'lucide:users',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
      {
        label: 'Reimbursements',
        value: 'Rs.1.14L',
        caption: '24 claims pending',
        icon: 'lucide:receipt',
        tone: '#FFF4E5',
        trend: 'down',
      },
      {
        label: 'PF/ESI',
        value: 'Rs.2.32L',
        caption: 'Due this cycle',
        icon: 'lucide:shield',
        tone: '#E7F9F1',
        trend: 'neutral',
      },
      {
        label: 'New Joiners',
        value: '5',
        caption: 'Bank details required',
        icon: 'lucide:user-plus',
        tone: '#EEF2FF',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Payroll Cost Split',
      type: 'donut',
      labels: ['Salary', 'Benefits', 'Tax', 'Reimbursements'],
      values: [72, 10, 12, 6],
      colors: ['#2563EB', '#10B981', '#F59E0B', '#7C3AED'],
    },
    actions: [
      {
        title: 'Salary Payout',
        description: 'Run salary payment file with approval and audit trail.',
        icon: 'lucide:banknote',
      },
      {
        title: 'Approve Claims',
        description: 'Review reimbursement receipts and policy exceptions.',
        icon: 'lucide:receipt-text',
      },
      {
        title: 'Employee Banking',
        description: 'Collect missing account details for new employees.',
        icon: 'lucide:user-round-check',
      },
    ],
    records: [
      { name: 'June Salary Run', meta: '86 employees', amount: 'Rs.18.6L', status: 'Draft' },
      { name: 'Travel Claims', meta: '24 claims', amount: 'Rs.1.14L', status: 'Review' },
      {
        name: 'PF Contribution',
        meta: 'Statutory payment',
        amount: 'Rs.1.48L',
        status: 'Scheduled',
      },
    ],
    insights: [
      'Five new joiners need account verification before payroll lock.',
      'Travel claims are 14% above last month.',
      'Payroll approval should finish by 27 Jun for on-time payout.',
    ],
  },
  '/insurance': {
    eyebrow: 'Risk Cover',
    primaryAction: 'Renew Policy',
    kpis: [
      {
        label: 'Active Policies',
        value: '7',
        caption: 'Business, asset, health',
        icon: 'lucide:shield-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Coverage',
        value: 'Rs.3.2 Cr',
        caption: 'Across locations',
        icon: 'lucide:umbrella',
        tone: '#EAF2FF',
        trend: 'neutral',
      },
      {
        label: 'Renewals Due',
        value: '2',
        caption: 'Within 30 days',
        icon: 'lucide:calendar-alert',
        tone: '#FFF4E5',
        trend: 'down',
      },
      {
        label: 'Open Claims',
        value: '1',
        caption: 'Rs.3.4L under review',
        icon: 'lucide:file-heart',
        tone: '#FEECEF',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Coverage Allocation',
      type: 'bar',
      labels: ['Property', 'Stock', 'Health', 'Vehicle', 'Cyber'],
      values: [42, 26, 14, 10, 8],
    },
    actions: [
      {
        title: 'Policy Review',
        description: 'Compare current coverage with asset and revenue changes.',
        icon: 'lucide:search-check',
      },
      {
        title: 'File Claim',
        description: 'Submit claim documents and track insurer response.',
        icon: 'lucide:file-plus',
      },
      {
        title: 'Compare Quotes',
        description: 'Find better coverage and premium options.',
        icon: 'lucide:scale',
      },
    ],
    records: [
      {
        name: 'Property Insurance',
        meta: 'Renewal in 18 days',
        amount: 'Rs.1.2 Cr',
        status: 'Due',
      },
      { name: 'Group Health', meta: '86 employees', amount: 'Rs.80L', status: 'Active' },
      { name: 'Machine Claim', meta: 'Survey completed', amount: 'Rs.3.4L', status: 'Review' },
    ],
    insights: [
      'Stock coverage is below latest inventory valuation by Rs.18L.',
      'Cyber policy quote is available at 11% lower premium.',
      'Renew property policy before the grace period starts.',
    ],
  },
  '/marketplace': {
    eyebrow: 'Partner Apps',
    primaryAction: 'Browse Offers',
    kpis: [
      {
        label: 'Connected Apps',
        value: '6',
        caption: 'Tally, GST, payroll, CRM',
        icon: 'lucide:plug',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Recommended',
        value: '12',
        caption: 'Based on your business',
        icon: 'lucide:sparkles',
        tone: '#EEF2FF',
        trend: 'up',
      },
      {
        label: 'Savings Found',
        value: 'Rs.74K',
        caption: 'Annual SaaS offers',
        icon: 'lucide:badge-percent',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Pending Setups',
        value: '3',
        caption: 'Need admin approval',
        icon: 'lucide:settings-2',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Marketplace Categories',
      type: 'donut',
      labels: ['Accounting', 'Lending', 'Payroll', 'Compliance'],
      values: [34, 26, 18, 22],
      colors: ['#2563EB', '#10B981', '#F59E0B', '#7C3AED'],
    },
    actions: [
      {
        title: 'Connect App',
        description: 'Add accounting, GST, payroll, or CRM integrations.',
        icon: 'lucide:plug-zap',
      },
      {
        title: 'Compare Plans',
        description: 'Review pricing and benefits for partner tools.',
        icon: 'lucide:columns-3',
      },
      {
        title: 'Activate Offer',
        description: 'Claim eligible discounts and bundled services.',
        icon: 'lucide:ticket-percent',
      },
    ],
    records: [
      { name: 'Tally Connector', meta: 'Ledger sync', amount: 'Free', status: 'Connected' },
      { name: 'Zoho Payroll', meta: 'Partner offer', amount: '20% off', status: 'Recommended' },
      {
        name: 'GST Filing Pro',
        meta: 'Compliance add-on',
        amount: 'Rs.999/mo',
        status: 'Available',
      },
    ],
    insights: [
      'Tally sync can automate 68% of manual ledger posting.',
      'Payroll add-on is recommended before headcount crosses 100.',
      'GST filing tool can reduce mismatch review time.',
    ],
  },
  '/reports': {
    eyebrow: 'Performance Analytics',
    primaryAction: 'Create Report',
    kpis: [
      {
        label: 'Revenue MTD',
        value: 'Rs.64.2L',
        caption: '+8.4% vs last month',
        icon: 'lucide:trending-up',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Gross Margin',
        value: '31.2%',
        caption: '+1.8 pts improved',
        icon: 'lucide:pie-chart',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Cash Runway',
        value: '94 days',
        caption: 'Based on current burn',
        icon: 'lucide:timer',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Reports Ready',
        value: '9',
        caption: 'Board, MIS, lender packs',
        icon: 'lucide:file-bar-chart',
        tone: '#EEF2FF',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Revenue vs Spend',
      type: 'line',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [48, 52, 57, 55, 61, 64],
    },
    actions: [
      {
        title: 'MIS Pack',
        description: 'Generate monthly business performance report.',
        icon: 'lucide:files',
      },
      {
        title: 'Cash Flow Forecast',
        description: 'Project inflow, outflow, and funding gap.',
        icon: 'lucide:area-chart',
      },
      {
        title: 'Board Report',
        description: 'Export KPIs, charts, and commentary in one pack.',
        icon: 'lucide:presentation',
      },
    ],
    records: [
      {
        name: 'May MIS Report',
        meta: 'Revenue, margin, cash',
        amount: '9 charts',
        status: 'Ready',
      },
      { name: 'Lender Pack', meta: 'Bank statements + GST', amount: '12 docs', status: 'Draft' },
      { name: 'Expense Analysis', meta: 'Department split', amount: '5 views', status: 'Ready' },
    ],
    insights: [
      'Gross margin improved because purchase cost dropped 3.1%.',
      'Revenue is on track to cross Rs.70L next month.',
      'Cash runway falls to 71 days if overdue collections slip by 15 days.',
    ],
  },
  '/compliance': {
    eyebrow: 'Controls & Audit',
    primaryAction: 'Add Obligation',
    kpis: [
      {
        label: 'Open Tasks',
        value: '14',
        caption: '5 high priority',
        icon: 'lucide:clipboard-check',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
      {
        label: 'Completed',
        value: '86%',
        caption: 'This quarter',
        icon: 'lucide:check-circle',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Audit Findings',
        value: '3',
        caption: 'All medium severity',
        icon: 'lucide:search-x',
        tone: '#FEECEF',
        trend: 'down',
      },
      {
        label: 'Documents',
        value: '128',
        caption: 'Stored securely',
        icon: 'lucide:folder-lock',
        tone: '#EAF2FF',
        trend: 'up',
      },
    ],
    chart: {
      title: 'Compliance Status',
      type: 'bar',
      labels: ['GST', 'TDS', 'ROC', 'Labor', 'Audit'],
      values: [92, 84, 76, 88, 69],
    },
    actions: [
      {
        title: 'Task Tracker',
        description: 'Assign and monitor statutory compliance actions.',
        icon: 'lucide:list-todo',
      },
      {
        title: 'Document Vault',
        description: 'Store filings, challans, and audit evidence.',
        icon: 'lucide:folder-lock',
      },
      {
        title: 'Audit Trail',
        description: 'Review approvals, payments, and access logs.',
        icon: 'lucide:history',
      },
    ],
    records: [
      { name: 'GST Filing Evidence', meta: 'Apr 2026', amount: '8 docs', status: 'Filed' },
      { name: 'ROC Annual Return', meta: 'Due in 41 days', amount: '4 tasks', status: 'Open' },
      { name: 'Payment Approval Audit', meta: 'Q1 sample', amount: '3 findings', status: 'Review' },
    ],
    insights: [
      'ROC tasks need owner assignment this week.',
      'Payment approval audit found missing remarks in three cases.',
      'Document vault coverage improved to 96%.',
    ],
  },
  '/settings': {
    eyebrow: 'Configuration',
    primaryAction: 'Invite User',
    kpis: [
      {
        label: 'Active Users',
        value: '18',
        caption: '4 admins, 14 operators',
        icon: 'lucide:users',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Approval Rules',
        value: '7',
        caption: 'Payments, payroll, lending',
        icon: 'lucide:route',
        tone: '#EEF2FF',
        trend: 'neutral',
      },
      {
        label: 'Security Score',
        value: '91%',
        caption: '2FA enabled for admins',
        icon: 'lucide:shield-check',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Pending Invites',
        value: '3',
        caption: 'Expire in 48 hours',
        icon: 'lucide:user-plus',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'User Access Split',
      type: 'donut',
      labels: ['Admin', 'Finance', 'Sales', 'Viewer'],
      values: [22, 39, 22, 17],
      colors: ['#2563EB', '#10B981', '#F59E0B', '#7C3AED'],
    },
    actions: [
      {
        title: 'Approval Workflow',
        description: 'Configure amount limits and multi-level approvals.',
        icon: 'lucide:workflow',
      },
      {
        title: 'Security Settings',
        description: 'Manage password policy, 2FA, sessions, and devices.',
        icon: 'lucide:lock-keyhole',
      },
      {
        title: 'Notification Rules',
        description: 'Set alerts for cash, payments, tax, and compliance.',
        icon: 'lucide:bell',
      },
    ],
    records: [
      {
        name: 'Payment Approval Rule',
        meta: 'Above Rs.5L',
        amount: '2 approvers',
        status: 'Active',
      },
      { name: 'Admin 2FA', meta: '4 users', amount: '100%', status: 'Enabled' },
      {
        name: 'Invite: accountant@demo.in',
        meta: 'Sent yesterday',
        amount: '1 invite',
        status: 'Pending',
      },
    ],
    insights: [
      'Enable 2FA for finance operators handling payouts.',
      'Three invites should be re-sent before expiry.',
      'Payment approval rules cover 94% of transaction value.',
    ],
  },
  '/ai-assistant': {
    eyebrow: 'Beta',
    primaryAction: 'Ask AI',
    kpis: [
      {
        label: 'Questions Answered',
        value: '248',
        caption: 'This month',
        icon: 'lucide:messages-square',
        tone: '#EEF2FF',
        trend: 'up',
      },
      {
        label: 'Cash Insights',
        value: '18',
        caption: '7 acted on',
        icon: 'lucide:sparkles',
        tone: '#EAF2FF',
        trend: 'up',
      },
      {
        label: 'Savings Found',
        value: 'Rs.1.2L',
        caption: 'Tax and vendor terms',
        icon: 'lucide:badge-percent',
        tone: '#E7F9F1',
        trend: 'up',
      },
      {
        label: 'Alerts Raised',
        value: '11',
        caption: 'Payments, GST, cash flow',
        icon: 'lucide:bell-ring',
        tone: '#FFF4E5',
        trend: 'neutral',
      },
    ],
    chart: {
      title: 'Assistant Topics',
      type: 'bar',
      labels: ['Cash', 'Tax', 'Payments', 'Credit', 'Reports'],
      values: [34, 21, 18, 14, 13],
    },
    actions: [
      {
        title: 'Ask About Cash',
        description: 'Find runway, expected inflows, and payment pressure.',
        icon: 'lucide:wallet-cards',
      },
      {
        title: 'Tax Optimizer',
        description: 'Review expenses and credits for possible savings.',
        icon: 'lucide:file-search',
      },
      {
        title: 'Explain Variance',
        description: 'Ask why revenue, margin, or spend changed.',
        icon: 'lucide:message-circle-question',
      },
    ],
    records: [
      { name: 'Cash runway question', meta: 'Answered today', amount: '94 days', status: 'Saved' },
      { name: 'GST mismatch summary', meta: '9 invoices', amount: 'Rs.76,000', status: 'Ready' },
      {
        name: 'Funding eligibility',
        meta: 'Based on bank data',
        amount: 'Rs.50L',
        status: 'Eligible',
      },
    ],
    insights: [
      'Ask: Which customers should I follow up with today?',
      'Ask: Can I safely approve all scheduled vendor payments?',
      'Ask: What changed in gross margin this month?',
    ],
  },
};

export const modulePanels: ModulePanelData[] = businessModules.map((module) => ({
  path: module.path,
  ...modulePanelMap[module.path],
}));

export const getModulePanel = (path: string) => modulePanels.find((panel) => panel.path === path);

export const kpiCards = [
  {
    label: 'Total Balance',
    value: 24575000.5,
    caption: 'Across 6 accounts',
    icon: 'lucide:landmark',
    tone: '#EEF2FF',
  },
  {
    label: "Today's Collections",
    value: 1875000,
    caption: '+12.5% vs yesterday',
    icon: 'lucide:download',
    tone: '#E7F9F1',
    positive: true,
  },
  {
    label: "Today's Payments",
    value: 785000,
    caption: '-8.3% vs yesterday',
    icon: 'lucide:upload',
    tone: '#FFECEF',
    positive: false,
  },
  {
    label: 'Working Capital Limit',
    value: 5000000,
    caption: 'Utilized Rs.18,40,000 (36.8%)',
    icon: 'lucide:wallet',
    tone: '#EEF6FF',
    progress: 36.8,
  },
];

export const cashFlow = [
  { label: '1 May', inflow: 6800000, outflow: 3900000 },
  { label: '5 May', inflow: 5400000, outflow: 2400000 },
  { label: '8 May', inflow: 6800000, outflow: 2800000 },
  { label: '12 May', inflow: 4600000, outflow: 3500000 },
  { label: '15 May', inflow: 6400000, outflow: 3000000 },
  { label: '22 May', inflow: 4200000, outflow: 3600000 },
  { label: '25 May', inflow: 5200000, outflow: 2200000 },
  { label: '29 May', inflow: 4500000, outflow: 2800000 },
];

export const accounts = [
  { bank: 'ConnectBank Current A/c', masked: '1234', balance: 12540000 },
  { bank: 'ConnectBank OD A/c', masked: '5678', balance: -1840000 },
  { bank: 'ConnectBank Cash Credit', masked: '9012', balance: 3260000 },
  { bank: 'HDFC Bank A/c', masked: '3456', balance: 4515000.5 },
  { bank: 'ICICI Bank A/c', masked: '7890', balance: 6000000 },
  { bank: 'Axis Bank A/c', masked: '2468', balance: 8300000 },
];

export const quickActions = [
  ['New Payment', 'lucide:send'],
  ['Collect Payment', 'lucide:download'],
  ['Create Invoice', 'lucide:file-plus-2'],
  ['Bulk Payments', 'lucide:send-to-back'],
  ['Pay Vendor', 'lucide:users'],
  ['Add Expense', 'lucide:receipt'],
  ['Payroll', 'lucide:briefcase'],
  ['Reconcile', 'lucide:refresh-cw'],
];

export const alerts = [
  ['GST Return for Apr 2024 is due in 5 days', 'Due Date: 20 May 2024', 'lucide:triangle-alert'],
  ['2 invoices overdue', 'Total Amount: Rs.4,75,000', 'lucide:clock'],
  ['Payment of Rs.2,50,000 received from ABC Enterprises', '', 'lucide:check-circle'],
  ['Your working capital limit utilization is 36.8%', '', 'lucide:info'],
];

export const receivables = [
  { name: 'ABC Enterprises', value: 1250000, color: '#2563EB' },
  { name: 'Global Supplies', value: 920000, color: '#7C3AED' },
  { name: 'Sharma Traders', value: 775000, color: '#EF4444' },
  { name: 'Delta Corp', value: 530000, color: '#F59E0B' },
  { name: 'Others', value: 400000, color: '#22C55E' },
];

export const payables = [
  { name: 'Steel India Ltd', value: 780000, color: '#2563EB' },
  { name: 'Global Supplies', value: 625000, color: '#7C3AED' },
  { name: 'Machine Tools Inc', value: 560000, color: '#EF4444' },
  { name: 'Transport Co.', value: 320000, color: '#F59E0B' },
  { name: 'Others', value: 300000, color: '#22C55E' },
];

export const aiInsights = [
  ['Your collections have improved by 12.5% this month. Keep it up!', 'lucide:calendar-check'],
  [
    'You can save up to Rs.1,20,000 in taxes by optimizing your expenses.',
    'lucide:file-spreadsheet',
  ],
  ['Your business is eligible for higher credit limit. Check now.', 'lucide:badge-indian-rupee'],
];

export const integrations = [
  ['Tally', 'lucide:book-open'],
  ['Zoho Books', 'lucide:contact'],
  ['Busy', 'lucide:calendar-days'],
  ['Marg ERP', 'lucide:line-chart'],
  ['GST Portal', 'lucide:badge-check'],
  ['Bank Statement', 'lucide:landmark'],
];
