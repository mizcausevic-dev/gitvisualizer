import { GithubUser, GithubRepo } from '../types';

const BASE_URL = 'https://api.github.com';

class GitHubError extends Error {
  status: number;
  rateLimitRemaining?: number;
  rateLimitResetAt?: Date;

  constructor(message: string, status: number, rateLimitRemaining?: number, rateLimitResetAt?: Date) {
    super(message);
    this.name = 'GitHubError';
    this.status = status;
    this.rateLimitRemaining = rateLimitRemaining;
    this.rateLimitResetAt = rateLimitResetAt;
  }
}

function readRateLimit(response: Response) {
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');
  return {
    remaining: remaining ? parseInt(remaining, 10) : undefined,
    resetAt: reset ? new Date(parseInt(reset, 10) * 1000) : undefined,
  };
}

async function fetchOrThrow<T>(url: string, what: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });

  const rl = readRateLimit(response);

  if (!response.ok) {
    if (response.status === 403 && rl.remaining === 0) {
      throw new GitHubError(
        `GitHub API rate limit exceeded. Resets at ${rl.resetAt?.toLocaleTimeString() ?? 'soon'}.`,
        403,
        rl.remaining,
        rl.resetAt,
      );
    }
    if (response.status === 404) {
      throw new GitHubError(`${what} not found (404)`, 404);
    }
    throw new GitHubError(`Failed to fetch ${what.toLowerCase()}: ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  return fetchOrThrow<GithubUser>(`${BASE_URL}/users/${encodeURIComponent(username)}`, `User "${username}"`);
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  return fetchOrThrow<GithubRepo[]>(
    `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    `Repositories for "${username}"`,
  );
}

export { GitHubError };
