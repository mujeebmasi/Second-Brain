const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export type ContentType = 'youtube' | 'twitter' | 'text';

export interface AuthPayload {
  username: string;
  email?: string;
  password: string;
}

export interface ContentPayload {
  title: string;
  link: string;
  description: string;
  type: ContentType;
}

export interface ContentItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  type?: ContentType;
  tags: string[];
  username: string;
}

export async function signup(payload: AuthPayload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Signup failed');
  }

  return data;
}

export async function signin(payload: Pick<AuthPayload, 'username' | 'password'>) {
  const formData = new URLSearchParams();
  formData.append('username', payload.username);
  formData.append('password', payload.password);

  const response = await fetch(`${API_BASE_URL}/api/v1/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Signin failed');
  }

  return data as { access_token: string; token_type: string };
}

export async function fetchContent(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/content`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to load content');
  }

  return data as { success: boolean; content: ContentItem[] };
}

export async function createContent(token: string, payload: ContentPayload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: payload.title,
      link: payload.link,
      description: payload.description,
      type: payload.type,
      tags: [payload.type],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to save content');
  }

  return data;
}

export async function createShareLink(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/brain/share`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to create share link');
  }

  return data as { shareLink: string };
}

export async function deleteContent(token: string, contentId: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/content/${contentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to delete content');
  }

  return data;
}