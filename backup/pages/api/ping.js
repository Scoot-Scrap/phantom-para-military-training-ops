// File: pages/api/ping.js

export const runtime = 'edge';                             // Use the lightweight Edge Runtime :contentReference[oaicite:2]{index=2} :contentReference[oaicite:3]{index=3}

export async function GET(request) {
  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}