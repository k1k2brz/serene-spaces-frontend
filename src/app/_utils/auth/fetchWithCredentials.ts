// Import necessary modules and types
import { NextRequest } from 'next/server';

import { getUserCredentials } from './getUserCredentials';
import { saveUserTokens } from './saveUserTokens';

const MAX_TIME_REFRESH = 60 * 1000;

// Define the main function for making authenticated requests
export default async function fetchWithCredentials(path: string, init: RequestInit | undefined, req: NextRequest) {
  // Retrieve user credentials from the request
  const userCredentials = getUserCredentials(req);

  // If no user credentials are available, return an unauthorized response
  if (!userCredentials) {
    return { message: 'No credentials provided', statusCode: 401 };
  }

  // Create a function to make the fetch request with the appropriate credentials
  const requestToFetch = makeFetch(path, userCredentials.accessToken, init);

  // Check if the access token is about to expire, and refresh it if needed
  if (userCredentials.tokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0) {
    // Attempt to refresh the tokens
    const newTokens = await refresh(userCredentials.refreshToken);

    // If successful, save the new tokens and retry the original request
    if ('accessToken' in newTokens) {
      saveUserTokens(newTokens);
      return await requestToFetch(newTokens.accessToken);
    }

    // If token refresh fails, return the error response
    return newTokens;
  }

  // If the access token is still valid, proceed with the original request
  return requestToFetch();
}

// Function to refresh user tokens
async function refresh(rt: string) {
  return new Promise((resolve) => {
    // Make a POST request to the token refresh endpoint
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
}

// Function to create a fetch function with the specified credentials
function makeFetch(
  path: string,
  accessToken: string,
  init: RequestInit | undefined,
): (newAccessToken?: string) => Promise<any> {
  return async function (newAccessToken?: string) {
    // Make a fetch request to the specified path with the provided or refreshed access token
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${newAccessToken ?? accessToken}`,
      },
      ...init,
    }).then((res) => res.json());
  };
}
