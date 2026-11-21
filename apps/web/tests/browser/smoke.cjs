const assert = require("node:assert/strict");
const http = require("node:http");
const { spawn } = require("node:child_process");
const { chromium } = require(process.env.PLAYWRIGHT_PATH);

const fixtures = {
  breakfast: { drinks: "water", breads: "toast", fruits: "banana", special: "none", dateBreakfast: "2026-11-20" },
  lunch: { main: "rice", vegetarian: "beans", salad: "lettuce", garrison: "potatoes", sideDish: "soup", juice: "orange", dessert: "fruit", dateLunch: "2026-11-20" },
  dinner: { main: "rice", vegetarian: "beans", salad: "lettuce", garrison: "potatoes", sideDish: "soup", juice: "orange", dessert: "fruit", dateDinner: "2026-11-20" }
};

const api = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3001");
  const kind = url.pathname.split("/")[1];
  const data = fixtures[kind];
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  if (!data) {
    res.writeHead(404).end(JSON.stringify({ error: "not found" }));
    return;
  }
  const page = Number(url.searchParams.get("page") || "1");
  res.end(JSON.stringify({
    docs: [{ _id: kind + page, ...data, ...(kind === "breakfast" ? { drinks: page === 1 ? "water" : "juice" } : {}) }],
    total: 2,
    pages: 2,
    page
  }));
});

async function listen(server, port) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

async function awaitPreview(preview) {
  for (let i = 0; i < 60; i++) {
    if (preview.exitCode !== null) throw new Error("Vite preview exited early");
    try {
      const response = await fetch("http://127.0.0.1:4173/");
      if (response.ok) return;
    } catch (_) {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error("Vite preview did not start");
}

(async () => {
  let preview;
  let browser;
  try {
    await listen(api, 3001);
    preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
      cwd: process.cwd(),
      stdio: "inherit"
    });
    await awaitPreview(preview);

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const browserErrors = [];
    page.on("pageerror", error => browserErrors.push(error.message));
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    assert.equal(await page.getByText("Bem-vindo ao SIGRU").count(), 1);
    await page.locator("#inputMatricula").fill("123456");
    await page.locator("#inputSenha").fill("test-only");
    await page.getByRole("button", { name: "Entrar" }).click();

    for (const label of ["Café da Manhã:", "Almoço:", "Jantar:"]) {
      await page.getByRole("heading", { name: new RegExp(label) }).waitFor({ timeout: 10000 });
    }
    assert.equal(await page.getByText("Bebidas:").count(), 1);
    assert.equal(await page.locator(".breakfast-list article").count(), 1);
    await page.locator(".breakfast-list").getByRole("button", { name: "Próximo" }).click();
    await page.locator(".breakfast-list article p").filter({ hasText: "juice" }).waitFor();
    assert.equal(new URL(page.url()).pathname, "/", "Pagination must not reload/navigate");
    await page.locator(".breakfast-list").getByRole("button", { name: "Anterior" }).click();
    await page.locator(".breakfast-list article p").filter({ hasText: "water" }).waitFor();
    assert.deepEqual(browserErrors, [], "Browser runtime must not throw uncaught errors");
    console.log("Browser smoke passed: login screen, meal sections, API data and pagination.");
  } finally {
    if (browser) await browser.close();
    if (preview && preview.exitCode === null) preview.kill("SIGTERM");
    await new Promise(resolve => api.close(resolve));
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
