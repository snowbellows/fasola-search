import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseURL = process.env.SONG_PARTS_API_URL;
  const url = new URL(baseURL!);
  const searchParams = request.nextUrl.searchParams;

  searchParams.entries().forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });
  console.log('Fetching from URL:', url.toString());
  const response = await fetch(url.toString(), {
    method: 'GET',
  });
  console.log('Response status:', response.status);
  const data = await response.json();
  return Response.json({ count: data.length, results: data });
}
