import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import {
  ModuleChartType,
  ModulePanelData,
  businessModules,
  getModulePanel,
} from 'data/business-dashboard';
import { Navigate, useLocation } from 'react-router-dom';

const statusColor = (status: string) => {
  const normalized = status.toLowerCase();

  if (
    [
      'active',
      'approved',
      'connected',
      'enabled',
      'filed',
      'paid',
      'ready',
      'received',
      'saved',
      'synced',
    ].some((item) => normalized.includes(item))
  ) {
    return 'success';
  }

  if (['failed', 'overdue', 'review', 'due'].some((item) => normalized.includes(item))) {
    return 'error';
  }

  return 'warning';
};

const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
  if (trend === 'up') return 'success.dark';
  if (trend === 'down') return 'error.main';
  return 'primary.light';
};

const MiniChart = ({ chart }: { chart: ModulePanelData['chart'] }) => {
  if (chart.type === 'donut') {
    const total = chart.values.reduce((sum, value) => sum + value, 0);
    let current = 0;
    const colors = chart.colors || ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#7C3AED'];
    const gradient = chart.values
      .map((value, index) => {
        const start = current;
        const end = current + (value / total) * 100;
        current = end;
        return `${colors[index % colors.length]} ${start}% ${end}%`;
      })
      .join(', ');

    return (
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" gap={3} minHeight={260}>
        <Box
          sx={{
            width: 170,
            height: 170,
            borderRadius: '50%',
            background: `conic-gradient(${gradient})`,
            position: 'relative',
            flexShrink: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 28,
              borderRadius: '50%',
              bgcolor: 'background.paper',
            },
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            <Typography color="primary.light" fontSize={12}>
              Total
            </Typography>
            <Typography color="primary.darker" fontWeight={900} fontSize={28}>
              {total}%
            </Typography>
          </Stack>
        </Box>
        <Stack spacing={1.25} width={1}>
          {chart.labels.map((label, index) => (
            <Stack key={label} direction="row" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: colors[index % colors.length],
                }}
              />
              <Typography flex={1} color="primary.darker" fontSize={13}>
                {label}
              </Typography>
              <Typography color="primary.darker" fontWeight={800} fontSize={13}>
                {chart.values[index]}%
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  }

  if (chart.type === 'timeline') {
    return (
      <Stack spacing={2.5} minHeight={260} justifyContent="center">
        {chart.labels.map((label, index) => (
          <Stack key={label} direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                color: 'common.white',
                bgcolor: index <= 2 ? 'primary.main' : 'warning.main',
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {index + 1}
            </Box>
            <Box flex={1}>
              <Stack direction="row" justifyContent="space-between" mb={0.75}>
                <Typography color="primary.darker" fontWeight={700}>
                  {label}
                </Typography>
                <Typography color="primary.light" fontSize={12}>
                  {chart.values[index]}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={chart.values[index]}
                sx={{ height: 8, borderRadius: 3 }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
    );
  }

  const max = Math.max(...chart.values);

  if (chart.type === 'line') {
    const points = chart.values.map((value, index) => {
      const x = (index / (chart.values.length - 1)) * 100;
      const y = 100 - (value / max) * 84;
      return `${x},${y}`;
    });

    return (
      <Stack minHeight={260} justifyContent="end" spacing={2}>
        <Box sx={{ height: 190, position: 'relative', px: 1 }}>
          <Box
            component="svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            sx={{ position: 'absolute', inset: 0, width: 1, height: 1 }}
          >
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points.join(' ')}
            />
          </Box>
          {chart.values.map((value, index) => (
            <Box
              key={chart.labels[index]}
              sx={{
                position: 'absolute',
                left: `${(index / (chart.values.length - 1)) * 100}%`,
                bottom: `${(value / max) * 84}%`,
                transform: 'translate(-50%, 50%)',
                width: 11,
                height: 11,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                border: '2px solid',
                borderColor: 'background.paper',
              }}
            />
          ))}
        </Box>
        <Stack direction="row" justifyContent="space-between">
          {chart.labels.map((label) => (
            <Typography key={label} color="primary.light" fontSize={12}>
              {label}
            </Typography>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="end" gap={2} minHeight={260} pt={2}>
      {chart.labels.map((label, index) => (
        <Stack key={label} flex={1} alignItems="center" gap={1.25} height={1} justifyContent="end">
          <Typography color="primary.darker" fontWeight={800} fontSize={12}>
            {chart.values[index]}%
          </Typography>
          <Box
            sx={{
              width: 1,
              maxWidth: 44,
              minHeight: 30,
              height: `${Math.max((chart.values[index] / max) * 170, 26)}px`,
              borderRadius: '12px 12px 4px 4px',
              bgcolor: index % 2 === 0 ? 'primary.main' : 'primary.light',
            }}
          />
          <Typography color="primary.light" fontSize={12} textAlign="center">
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const ChartTitle = ({ type }: { type: ModuleChartType }) => {
  const label = type === 'donut' ? 'Distribution' : type === 'timeline' ? 'Progress' : 'Trend';

  return (
    <Chip
      size="small"
      label={label}
      sx={{ bgcolor: 'neutral.light', color: 'primary.main', fontWeight: 700 }}
    />
  );
};

const BusinessModulePage = () => {
  const { pathname } = useLocation();
  const module = businessModules.find((item) => item.path === pathname);
  const panel = getModulePanel(pathname);

  if (!module || !panel) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Stack spacing={2.5} mb={3} pt={2}>
      <Card sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 }, '&:last-child': { pb: { xs: 3, md: 4 } } }}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            alignItems={{ xs: 'flex-start', lg: 'center' }}
            justifyContent="space-between"
            gap={3}
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 3,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'primary.main',
                  bgcolor: 'neutral.light',
                  flexShrink: 0,
                }}
              >
                <IconifyIcon icon={module.icon} width={29} />
              </Box>
              <Box>
                <Typography color="primary.main" fontWeight={800} fontSize={12} mb={0.5}>
                  {panel.eyebrow}
                </Typography>
                <Typography variant="h2" color="primary.darker" mb={0.75}>
                  {module.title}
                </Typography>
                <Typography color="primary.light" maxWidth={720}>
                  {module.description}
                </Typography>
              </Box>
            </Stack>
            <Button variant="contained" startIcon={<IconifyIcon icon="lucide:plus" />}>
              {panel.primaryAction}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        {panel.kpis.map((kpi) => (
          <Grid item xs={12} sm={6} xl={3} key={kpi.label}>
            <Card sx={{ height: 1 }}>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" justifyContent="space-between" gap={2}>
                  <Stack spacing={1}>
                    <Typography color="primary.light" fontSize={12} fontWeight={700}>
                      {kpi.label}
                    </Typography>
                    <Typography color="primary.darker" fontSize={24} fontWeight={900}>
                      {kpi.value}
                    </Typography>
                    <Typography color={getTrendColor(kpi.trend)} fontSize={12}>
                      {kpi.caption}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 3,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: kpi.tone,
                      color: 'primary.main',
                      flexShrink: 0,
                    }}
                  >
                    <IconifyIcon icon={kpi.icon} width={23} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: 1 }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, height: 1 }}>
              <Stack spacing={2} height={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                  <Typography color="primary.darker" fontWeight={800}>
                    {panel.chart.title}
                  </Typography>
                  <ChartTitle type={panel.chart.type} />
                </Stack>
                <MiniChart chart={panel.chart} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ height: 1 }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, height: 1 }}>
              <Stack spacing={2}>
                <Typography color="primary.darker" fontWeight={800}>
                  Priority Workflows
                </Typography>
                {panel.actions.map((action) => (
                  <Stack
                    key={action.title}
                    direction="row"
                    gap={1.5}
                    sx={{
                      p: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'neutral.light',
                        color: 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <IconifyIcon icon={action.icon} width={20} />
                    </Box>
                    <Box>
                      <Typography color="primary.darker" fontWeight={800} fontSize={13}>
                        {action.title}
                      </Typography>
                      <Typography color="primary.light" fontSize={12}>
                        {action.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography color="primary.darker" fontWeight={800}>
                    Recent Records
                  </Typography>
                  <Button size="small">View All</Button>
                </Stack>
                <Stack spacing={1.25}>
                  {panel.records.map((record) => (
                    <Stack
                      key={`${record.name}-${record.meta}`}
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      justifyContent="space-between"
                      gap={1.5}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                      }}
                    >
                      <Box>
                        <Typography color="primary.darker" fontWeight={800} fontSize={13}>
                          {record.name}
                        </Typography>
                        <Typography color="primary.light" fontSize={12}>
                          {record.meta}
                        </Typography>
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography color="primary.darker" fontWeight={800} fontSize={13}>
                          {record.amount}
                        </Typography>
                        <Chip
                          size="small"
                          color={statusColor(record.status)}
                          label={record.status}
                          sx={{ minWidth: 78, fontWeight: 700 }}
                        />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ height: 1 }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, height: 1 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography color="primary.darker" fontWeight={800}>
                    AI Business Assistant
                  </Typography>
                  <Chip size="small" label="Beta" color="primary" />
                </Stack>
                {panel.insights.map((insight) => (
                  <Stack direction="row" spacing={1.25} key={insight}>
                    <IconifyIcon icon="lucide:sparkles" width={17} color="#2563EB" />
                    <Typography color="primary.light" fontSize={13}>
                      {insight}
                    </Typography>
                  </Stack>
                ))}
                <Button
                  variant="outlined"
                  endIcon={<IconifyIcon icon="lucide:arrow-right" width={16} />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Ask about {module.title}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BusinessModulePage;
