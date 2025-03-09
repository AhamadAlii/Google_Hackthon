interface ApiError {
  code?: string;
  message: string;
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export const handleApiError = (error: ApiError) => {
  if (error.code === 'rate-limited') {
    throw new RateLimitError('Rate limit reached. Please wait before trying again.');
  }
  throw new Error(error.message || 'An unexpected error occurred');
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (error instanceof RateLimitError) {
        const delay = Math.min(baseDelay * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError!;
};