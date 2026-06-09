import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import {
  accounts,
  aiInsights,
  alerts,
  cashFlow,
  integrations,
  kpiCards,
  payables,
  quickActions,
  receivables,
} from 'data/business-dashboard';
import { useAuth } from 'providers/AuthProvider';
import type { ReactNode } from 'react';

interface PieItem {
  name: string;
  value: number;
  color: string;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);
const formatCompactCurrency = (value: number) => compactCurrencyFormatter.format(value);

const getConicGradient = (items: PieItem[]) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let current = 0;

  return items
    .map((item) => {
      const start = current;
      const end = current + (item.value / total) * 100;
      current = end;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(', ');
};

const SectionCard = ({
  children,
  title,
  action,
}: {
  children: ReactNode;
  title: string;
  action?: string;
}) => (
  <Card sx={{ height: 1, borderRadius: 3 }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, height: 1 }}>
      <Stack spacing={2} height={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography fontWeight={700} color="primary.darker">
            {title}
          </Typography>
          {action ? (
            <Button size="small" sx={{ minWidth: 'auto', px: 0.5 }}>
              {action}
            </Button>
          ) : null}
        </Stack>
        {children}
      </Stack>
    </CardContent>
  </Card>
);

const KpiCard = ({ card }: { card: (typeof kpiCards)[number] }) => (
  <Card sx={{ height: 1, borderRadius: 3 }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Stack spacing={1}>
          <Typography fontWeight={700} fontSize={13} color="primary.darker">
            {card.label}
          </Typography>
          <Typography fontWeight={800} fontSize={{ xs: 20, xl: 22 }} color="primary.darker">
            {formatCurrency(card.value)}
          </Typography>
          <Typography
            color={
              card.positive === true
                ? 'success.dark'
                : card.positive === false
                  ? 'error.main'
                  : 'primary.light'
            }
            fontSize={12}
          >
            {card.caption}
          </Typography>
          {card.progress ? (
            <LinearProgress
              variant="determinate"
              value={card.progress}
              sx={{ width: 120, height: 6, borderRadius: 2 }}
            />
          ) : null}
        </Stack>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 3,
            display: 'grid',
            placeItems: 'center',
            bgcolor: card.tone,
            color: 'primary.main',
          }}
        >
          <IconifyIcon icon={card.icon} width={24} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const CashFlowOverview = () => (
  <SectionCard title="Cash Flow Overview" action="This Month">
    <Stack direction="row" gap={3} alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
        <Typography fontSize={12}>Inflow</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
        <Typography fontSize={12}>Outflow</Typography>
      </Stack>
    </Stack>
    <Stack direction="row" gap={3}>
      <Typography color="success.dark" fontWeight={800}>
        {formatCompactCurrency(14260000)}
      </Typography>
      <Typography color="error.main" fontWeight={800}>
        {formatCompactCurrency(9540000)}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="end" gap={{ xs: 1, sm: 2 }} height={180} pt={1}>
      {cashFlow.map((item) => (
        <Stack
          key={item.label}
          alignItems="center"
          justifyContent="end"
          gap={1}
          flex={1}
          height={1}
        >
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="center"
            gap={0.75}
            height={140}
            width={1}
          >
            <Box
              sx={{
                width: 10,
                borderRadius: 4,
                bgcolor: '#10B981',
                height: `${(item.inflow / 8000000) * 100}%`,
                minHeight: 16,
              }}
            />
            <Box
              sx={{
                width: 10,
                borderRadius: 4,
                bgcolor: '#EF4444',
                height: `${(item.outflow / 8000000) * 100}%`,
                minHeight: 16,
              }}
            />
          </Stack>
          <Typography color="primary.light" fontSize={11} noWrap>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </SectionCard>
);

const AccountSummary = () => (
  <SectionCard title="Account Summary" action="View All Accounts">
    <Stack spacing={1.5}>
      {accounts.map((account) => (
        <Stack key={account.masked} direction="row" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: account.balance < 0 ? alpha('#EF4444', 0.12) : '#061B3A',
              color: account.balance < 0 ? 'error.main' : 'common.white',
            }}
          >
            <IconifyIcon icon="lucide:landmark" width={15} />
          </Box>
          <Typography flex={1} fontSize={13} color="primary.darker">
            {account.bank}
          </Typography>
          <Typography color="primary.light" fontSize={12}>
            ... {account.masked}
          </Typography>
          <Typography
            minWidth={116}
            textAlign="right"
            fontWeight={700}
            fontSize={13}
            color={account.balance < 0 ? 'error.main' : 'primary.darker'}
          >
            {formatCurrency(account.balance)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </SectionCard>
);

const QuickActions = () => (
  <SectionCard title="Quick Actions">
    <Grid container spacing={1.25}>
      {quickActions.map(([label, icon]) => (
        <Grid item xs={6} sm={3} md={6} xl={3} key={label}>
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={0.75}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              minHeight: 68,
              p: 1,
            }}
          >
            <IconifyIcon icon={icon} width={20} color="primary.main" />
            <Typography textAlign="center" fontSize={11} color="primary.darker" lineHeight={1.2}>
              {label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
    <Button size="small" endIcon={<IconifyIcon icon="lucide:arrow-right" width={16} />}>
      View All Actions
    </Button>
  </SectionCard>
);

const Alerts = () => (
  <SectionCard title="Alerts & Notifications" action="View All">
    <Stack spacing={1.6}>
      {alerts.map(([title, subtitle, icon], index) => (
        <Stack direction="row" gap={1.25} key={title}>
          <IconifyIcon
            icon={icon}
            width={17}
            color={
              index === 0
                ? '#EF4444'
                : index === 1
                  ? '#F59E0B'
                  : index === 2
                    ? '#10B981'
                    : '#2563EB'
            }
          />
          <Box>
            <Typography fontSize={12} fontWeight={700} color="primary.darker">
              {title}
            </Typography>
            {subtitle ? (
              <Typography fontSize={11} color="primary.light">
                {subtitle}
              </Typography>
            ) : null}
          </Box>
        </Stack>
      ))}
    </Stack>
  </SectionCard>
);

const DonutSummary = ({
  title,
  total,
  items,
}: {
  title: string;
  total: number;
  items: PieItem[];
}) => (
  <SectionCard title={title} action="View All">
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
      <Box
        sx={{
          width: 112,
          height: 112,
          borderRadius: '50%',
          background: `conic-gradient(${getConicGradient(items)})`,
          position: 'relative',
          flexShrink: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 18,
            borderRadius: '50%',
            bgcolor: 'background.default',
          },
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <Typography fontSize={11} color="primary.light">
            Total
          </Typography>
          <Typography fontSize={13} fontWeight={800} color="primary.darker">
            {formatCompactCurrency(total)}
          </Typography>
        </Stack>
      </Box>
      <Stack spacing={1} flex={1} width={1}>
        {items.map((item) => (
          <Stack direction="row" alignItems="center" gap={1} key={item.name}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: item.color }} />
            <Typography fontSize={12} flex={1} color="primary.darker">
              {item.name}
            </Typography>
            <Typography fontSize={12} color="primary.darker">
              {formatCompactCurrency(item.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  </SectionCard>
);

const BusinessHealth = () => (
  <SectionCard title="Business Health Score">
    <Stack alignItems="center" justifyContent="center" height={1} gap={1.5}>
      <Box
        sx={{
          width: 150,
          height: 90,
          borderRadius: '150px 150px 0 0',
          background:
            'conic-gradient(from 270deg at 50% 100%, #FACC15 0deg, #22C55E 140deg, #E5E7EB 140deg 180deg)',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 22,
            right: 22,
            bottom: 0,
            height: 68,
            borderRadius: '120px 120px 0 0',
            bgcolor: 'background.default',
          },
        }}
      >
        <Stack alignItems="center" sx={{ position: 'absolute', inset: 0, zIndex: 1, pt: 4 }}>
          <Typography fontSize={32} lineHeight={1} fontWeight={800} color="primary.darker">
            78
            <Typography component="span" fontSize={13} color="primary.light">
              /100
            </Typography>
          </Typography>
          <Typography color="success.dark" fontWeight={700} fontSize={13}>
            Good
          </Typography>
        </Stack>
      </Box>
      <Typography textAlign="center" fontSize={12} color="primary.light">
        Great! Your business is financially healthy.
      </Typography>
      <Button size="small" endIcon={<IconifyIcon icon="lucide:arrow-right" width={15} />}>
        View Full Report
      </Button>
    </Stack>
  </SectionCard>
);

const FundingCard = () => (
  <Card sx={{ borderRadius: 3, bgcolor: '#061B3A', color: 'common.white', overflow: 'hidden' }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Stack spacing={1.25}>
        <Typography fontWeight={800}>Need Business Funding?</Typography>
        <Typography fontSize={12} color="rgba(255,255,255,0.72)">
          You are pre-approved for
        </Typography>
        <Typography fontSize={24} fontWeight={900}>
          {formatCompactCurrency(3500000)}
        </Typography>
        <Typography fontSize={12} color="rgba(255,255,255,0.72)">
          Get funds in 24 hours
        </Typography>
        <Button size="small" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Explore Now
        </Button>
      </Stack>
    </CardContent>
  </Card>
);

const AiInsights = () => (
  <SectionCard title="AI Business Insights" action="Beta">
    <Grid container spacing={2}>
      {aiInsights.map(([text, icon]) => (
        <Grid item xs={12} md={4} key={text}>
          <Stack direction="row" gap={1.5} alignItems="flex-start">
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'neutral.light', color: 'primary.main' }}>
              <IconifyIcon icon={icon} width={18} />
            </Box>
            <Box>
              <Typography fontSize={12} color="primary.darker">
                {text}
              </Typography>
              <Button
                size="small"
                sx={{ px: 0 }}
                endIcon={<IconifyIcon icon="lucide:arrow-right" width={14} />}
              >
                View Details
              </Button>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </SectionCard>
);

const Integrations = () => (
  <SectionCard title="Shortcuts & Integrations" action="Manage">
    <Grid container spacing={1.25}>
      {integrations.map(([label, icon]) => (
        <Grid item xs={6} sm={4} lg={2} key={label}>
          <Stack
            alignItems="center"
            gap={1}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1.25 }}
          >
            <IconifyIcon icon={icon} width={22} color="primary.main" />
            <Typography fontSize={12} color="primary.darker" textAlign="center">
              {label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </SectionCard>
);

const Dashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name?.trim();

  return (
    <Stack spacing={2.5} mb={3} pt={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h2" color="primary.darker" mb={0.5}>
            Good morning{displayName ? `, ${displayName}` : ''}
          </Typography>
          <Typography color="primary.light">
            Here is what is happening with your business today.
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<IconifyIcon icon="lucide:settings-2" width={16} />}>
          Customize Dashboard
        </Button>
      </Stack>

      <Grid container spacing={2.5}>
        {kpiCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.label}>
            <KpiCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} xl={9}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} lg={7}>
              <CashFlowOverview />
            </Grid>
            <Grid item xs={12} lg={5}>
              <AccountSummary />
            </Grid>
            <Grid item xs={12} md={6}>
              <DonutSummary title="Top Receivables" total={3875000} items={receivables} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DonutSummary title="Top Payables" total={2585000} items={payables} />
            </Grid>
            <Grid item xs={12} md={5}>
              <BusinessHealth />
            </Grid>
            <Grid item xs={12} md={7}>
              <AiInsights />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} xl={3}>
          <Stack spacing={2.5}>
            <QuickActions />
            <Alerts />
            <FundingCard />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ display: { xs: 'block', xl: 'none' } }} />
          <Integrations />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
