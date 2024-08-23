'use client';

export const fetchWithAuth = async (url: string, options: any = {}) => {
  const token = document.cookie.split('; ').find((row) => row.startsWith('access_token='));
  const accessToken = token ? token.split('=')[1] : null;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return fetch(url, { ...options, headers });
};
