export const rootPaths = {
  root: '/',
  pagesRoot: '/',
  authRoot: '/authentication',
  errorRoot: '/error',
};

/**
 * Object containing various paths used in the application.
 */
const paths = {
  default: `${rootPaths.root}`,
  dashboard: `${rootPaths.pagesRoot}dashboard`,
  transactions: `${rootPaths.pagesRoot}transactions`,
  creditCards: `${rootPaths.pagesRoot}credit-cards`,
  investments: `${rootPaths.pagesRoot}investments`,
  loans: `${rootPaths.pagesRoot}loans`,
  accounts: `${rootPaths.pagesRoot}accounts`,
  payments: `${rootPaths.pagesRoot}payments`,
  collections: `${rootPaths.pagesRoot}collections`,
  accounting: `${rootPaths.pagesRoot}accounting`,
  gstTax: `${rootPaths.pagesRoot}gst-tax`,
  invoicing: `${rootPaths.pagesRoot}invoicing`,
  lending: `${rootPaths.pagesRoot}lending`,
  tradeSupplyChain: `${rootPaths.pagesRoot}trade-supply-chain`,
  payroll: `${rootPaths.pagesRoot}payroll`,
  insurance: `${rootPaths.pagesRoot}insurance`,
  marketplace: `${rootPaths.pagesRoot}marketplace`,
  reports: `${rootPaths.pagesRoot}reports`,
  compliance: `${rootPaths.pagesRoot}compliance`,
  settings: `${rootPaths.pagesRoot}settings`,
  aiAssistant: `${rootPaths.pagesRoot}ai-assistant`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  forgetPassword: `${rootPaths.authRoot}/forget-password`,
  resetPassword: `${rootPaths.authRoot}/reset-password`,
  notFound: `${rootPaths.errorRoot}/404`,
};

export default paths;
