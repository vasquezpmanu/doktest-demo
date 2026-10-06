import { createServer } from "node:http";

const branch = "main";
const background = "#1d4ed8";
const message = "Doktest demo — main";
const port = Number(process.env.PORT ?? 3000);

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${message}</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: ${background};
        color: #172033;
        font-family: system-ui, sans-serif;
        line-height: 1.6;
      }
      main {
        width: min(100%, 640px);
        padding: clamp(24px, 6vw, 48px);
        border-radius: 20px;
        background: white;
      }
      .eyebrow { margin: 0 0 16px; color: #475569; font-size: 13px; }
      h1 { margin: 0 0 20px; font-size: clamp(28px, 5vw, 42px); line-height: 1.15; }
      p { margin: 12px 0; }
      .branch {
        display: inline-block;
        margin-top: 16px;
        padding: 6px 14px;
        border-radius: 999px;
        background: ${background};
        color: white;
        font-family: ui-monospace, monospace;
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">GIT BRANCH DEPLOYMENT DEMO</p>
      <h1>${message}</h1>
      <p>You are viewing code from the <strong>${branch}</strong> branch.</p>
      <p>Deploy the other branch to see a different message and background color.</p>
      <span class="branch">${branch}</span>
    </main>
  </body>
</html>`;

createServer((_request, response) => {
  response.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(page);
}).listen(port, "0.0.0.0", () => {
  console.log(`${message} listening on port ${port}`);
});
