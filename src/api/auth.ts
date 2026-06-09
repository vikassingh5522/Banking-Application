export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  title: string;
  companyName?: string;
  businessType?: string;
  phone?: string;
  gstin?: string;
  avatarUrl?: string | null;
}

interface AuthResponse {
  user: AuthUser;
}

export interface RegisterPayload {
  name: string;
  companyName: string;
  email: string;
  password: string;
  role?: string;
  title?: string;
  avatarUrl?: string;
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
    throw new Error('API server is not reachable. Start it with npm run server.');
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}.`);
  }

  return data as T;
}

export async function register(payload: RegisterPayload) {
  return request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(email: string, password: string) {
  return request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getCurrentUser() {
  return request<AuthResponse>('/api/auth/me');
}

export async function logout() {
  return request<{ ok: boolean }>('/api/auth/logout', {
    method: 'POST',
  });
}
