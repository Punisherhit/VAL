import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // API Status endpoint
  if (request.url === '/api/status' || request.url?.startsWith('/api/status')) {
    response.status(200).json({ status: 'online' });
    return;
  }

  // Default response for unknown API routes
  response.status(404).json({ error: 'Not found' });
}

