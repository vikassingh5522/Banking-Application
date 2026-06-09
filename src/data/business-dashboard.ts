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
  ['You can save up to Rs.1,20,000 in taxes by optimizing your expenses.', 'lucide:file-spreadsheet'],
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
