/**
 * PDF Renderer Service — Cloud Run placeholder
 *
 * This service will be deployed as a separate Cloud Run container.
 * It receives agreement/quote data and generates final PDF documents.
 *
 * TODO: PDF generation implementation:
 *   - Accept agreement snapshot + terms content via HTTP POST
 *   - Render PDF using a headless rendering engine (e.g., Puppeteer, Playwright)
 *   - Upload generated PDF to Cloud Storage
 *   - Return storage path to caller
 *   - Support both draft preview and final locked PDF modes
 *
 * This service intentionally runs outside Cloud Functions to avoid
 * memory/timeout constraints of serverless functions for PDF generation.
 */

import { createServer, IncomingMessage, ServerResponse } from "http";

const PORT = parseInt(process.env.PORT ?? "8081", 10);

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "twg-pdf-renderer" }));
    return;
  }

  if (req.method === "POST" && req.url === "/render") {
    // TODO: implement PDF rendering
    res.writeHead(501, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "not_implemented",
        message: "PDF rendering is not yet implemented. This is a Phase 0 placeholder.",
      })
    );
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(PORT, () => {
  console.log(`TWG PDF Renderer listening on port ${PORT}`);
});
