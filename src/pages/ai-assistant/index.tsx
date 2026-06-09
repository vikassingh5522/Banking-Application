import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { AssistantHistoryItem, sendAssistantMessage } from 'api/aiAssistant';
import { FormEvent, useMemo, useRef, useState } from 'react';

interface ChatMessage extends AssistantHistoryItem {
  id: number;
}

const suggestedPrompts = [
  'Summarize my business today.',
  'Which payments or invoices need attention?',
  'How can I improve cash flow this week?',
  'What GST or tax actions are pending?',
  'Show my top risks and next actions.',
];

const insightCards = [
  {
    title: 'Cash Flow',
    description: 'Ask about runway, inflow, outflow, collections, and payment timing.',
    icon: 'lucide:activity',
  },
  {
    title: 'GST & Tax',
    description: 'Explain due dates, mismatches, savings, and filing preparation.',
    icon: 'lucide:file-check-2',
  },
  {
    title: 'Payments',
    description: 'Review vendor payments, failed transfers, approvals, and scheduling.',
    icon: 'lucide:send',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hi, I am your ConnectBank AI Business Assistant. Ask me about cash flow, payments, collections, GST, reports, lending, or business health.',
  },
];

const AiAssistantPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const nextId = useRef(2);

  const history = useMemo<AssistantHistoryItem[]>(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages],
  );

  const sendMessage = async (message: string) => {
    const trimmed = message.trim();

    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextId.current,
      role: 'user',
      content: trimmed,
    };
    nextId.current += 1;

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await sendAssistantMessage(trimmed, history.slice(-8));
      setMessages((current) => [
        ...current,
        {
          id: nextId.current,
          role: 'assistant',
          content: response.answer,
        },
      ]);
      nextId.current += 1;
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to get AI response.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

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
                <IconifyIcon icon="lucide:sparkles" width={29} />
              </Box>
              <Box>
                <Stack direction="row" gap={1} alignItems="center" mb={0.75}>
                  <Typography color="primary.main" fontWeight={800} fontSize={12}>
                    Mistral AI powered
                  </Typography>
                  <Chip size="small" label="Beta" color="primary" />
                </Stack>
                <Typography variant="h2" color="primary.darker" mb={0.75}>
                  AI Business Assistant
                </Typography>
                <Typography color="primary.light" maxWidth={760}>
                  Ask finance questions, summarize business performance, find risks, and get
                  practical next actions based on your dashboard data.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        <Grid item xs={12} xl={8}>
          <Card sx={{ height: 1 }}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, height: 1 }}>
              <Stack height={1} minHeight={620}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Box>
                    <Typography color="primary.darker" fontWeight={900}>
                      Business Chat
                    </Typography>
                    <Typography color="primary.light" fontSize={12}>
                      Answers use dashboard context and do not execute transactions.
                    </Typography>
                  </Box>
                  {isSending ? <CircularProgress size={22} /> : null}
                </Stack>

                <Stack spacing={2} sx={{ flex: 1, p: 2.5, overflowY: 'auto' }}>
                  {messages.map((message) => {
                    const isUser = message.role === 'user';

                    return (
                      <Stack
                        key={message.id}
                        direction="row"
                        justifyContent={isUser ? 'flex-end' : 'flex-start'}
                      >
                        <Box
                          sx={{
                            maxWidth: { xs: 1, md: '78%' },
                            px: 2,
                            py: 1.5,
                            borderRadius: 3,
                            bgcolor: isUser ? 'primary.main' : 'background.paper',
                            color: isUser ? 'common.white' : 'primary.darker',
                            border: isUser ? 0 : '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Typography whiteSpace="pre-line" fontSize={14} lineHeight={1.7}>
                            {message.content}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}

                  {error ? <Alert severity="error">{error}</Alert> : null}
                </Stack>

                <Divider />
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 2.5 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask about cash flow, GST, payments, invoices, lending..."
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!input.trim() || isSending}
                      endIcon={<IconifyIcon icon="lucide:send" width={17} />}
                      sx={{ minWidth: 120 }}
                    >
                      Send
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={4}>
          <Stack spacing={2.5}>
            <Card>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography color="primary.darker" fontWeight={900} mb={2}>
                  Suggested Questions
                </Typography>
                <Stack spacing={1}>
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outlined"
                      disabled={isSending}
                      onClick={() => sendMessage(prompt)}
                      sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              {insightCards.map((card) => (
                <Grid item xs={12} md={4} xl={12} key={card.title}>
                  <Card sx={{ height: 1 }}>
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                      <Stack direction="row" gap={1.5}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: 'neutral.light',
                            color: 'primary.main',
                            flexShrink: 0,
                          }}
                        >
                          <IconifyIcon icon={card.icon} width={21} />
                        </Box>
                        <Box>
                          <Typography color="primary.darker" fontWeight={900}>
                            {card.title}
                          </Typography>
                          <Typography color="primary.light" fontSize={13} mt={0.5}>
                            {card.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AiAssistantPage;
