export interface AssistantHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantChatResponse {
  answer: string;
  model: string;
}

async function request<T>(path: string, options: RequestInit = {}) {
  let response: Response;

  try {
    response = await fetch(path, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('API server is not reachable. Start it with npm run dev.');
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}.`);
  }

  return data as T;
}

export async function sendAssistantMessage(message: string, history: AssistantHistoryItem[]) {
  return request<AssistantChatResponse>('/api/ai-assistant/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  });
}
