// Local development proxy server
// Run with: node server.dev.mjs
// This mimics what Vercel Edge Functions do in production

import { createServer } from "http";
import { config } from "dotenv";

config(); // Load .env

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.3;
const PORT = 3010;

const server = createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url !== "/api/chat" || req.method !== "POST") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY not found in .env");
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "API key not configured" }));
    return;
  }

  // Read request body
  let bodyStr = "";
  for await (const chunk of req) {
    bodyStr += chunk;
  }

  let body;
  try {
    body = JSON.parse(bodyStr);
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid JSON" }));
    return;
  }

  const { messages, system } = body;

  // Sanitize messages
  const sanitizedMessages = (messages || [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 2000),
    }));

  try {
    const anthropicResponse = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        system: system || "",
        messages: sanitizedMessages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        stream: true,
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error("Anthropic error:", anthropicResponse.status, errorText);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "AI service error" }));
      return;
    }

    // Stream the response
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const reader = anthropicResponse.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();
  } catch (error) {
    console.error("Proxy error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🔒 Chat proxy server running at http://localhost:${PORT}`);
  console.log(`   API key is safely stored server-side\n`);
});
