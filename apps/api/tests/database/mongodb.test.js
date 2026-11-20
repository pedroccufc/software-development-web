const test = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const app = require("../../src/app");
const { connectDatabase } = require("../../src/config/database");

const uri = process.env.TEST_MONGODB_URI;
if (!uri) {
  throw new Error("TEST_MONGODB_URI is required for database integration tests");
}
if (!/^mongodb:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/sigru_test(?:\?|$)/.test(uri)) {
  throw new Error("Database integration tests require local sigru_test database");
}

const fixtures = {
  breakfast: {
    model: "Breakfast",
    create: { drinks: "water", breads: "toast", fruits: "banana", special: "none", dateBreakfast: "2026-11-20" },
    change: { drinks: "juice" },
    field: "drinks"
  },
  lunch: {
    model: "Lunch",
    create: { main: "rice", vegetarian: "beans", salad: "lettuce", garrison: "potatoes", sideDish: "soup", juice: "orange", dessert: "fruit", dateLunch: "2026-11-20" },
    change: { main: "pasta" },
    field: "main"
  },
  dinner: {
    model: "Dinner",
    create: { main: "rice", vegetarian: "beans", salad: "lettuce", garrison: "potatoes", sideDish: "soup", juice: "orange", dessert: "fruit", dateDinner: "2026-11-20" },
    change: { main: "pasta" },
    field: "main"
  }
};

async function request(base, path, method = "GET", body) {
  const response = await fetch(base + path, {
    method,
    ...(body ? { headers: { "content-type": "application/json" }, body: JSON.stringify(body) } : {})
  });
  const text = await response.text();
  return { status: response.status, body: text ? JSON.parse(text) : null };
}

test("real MongoDB CRUD, pagination and operator rejection for all meal modules", async () => {
  await connectDatabase(uri);
  const server = app.listen(0, "127.0.0.1");
  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const base = "http://127.0.0.1:" + server.address().port;
    for (const [route, fixture] of Object.entries(fixtures)) {
      const model = mongoose.model(fixture.model);
      await model.deleteMany({});
      const created = await request(base, "/" + route, "POST", fixture.create);
      assert.equal(created.status, 200, route + " create");
      assert.equal(created.body[fixture.field], fixture.create[fixture.field]);
      const id = created.body._id;
      const detail = await request(base, "/" + route + "/" + id);
      assert.equal(detail.status, 200, route + " detail");
      assert.equal(detail.body._id, id);

      const second = await request(base, "/" + route, "POST", fixture.create);
      assert.equal(second.status, 200, route + " second create");
      const page1 = await request(base, "/" + route + "?page=1");
      const page2 = await request(base, "/" + route + "?page=2");
      assert.equal(page1.status, 200);
      assert.equal(page2.status, 200);
      assert.equal(page1.body.docs.length, 1);
      assert.equal(page2.body.docs.length, 1);
      assert.equal(page1.body.total, 2);
      assert.equal(page1.body.pages, 2);

      const invalid = await request(base, "/" + route + "/" + id, "PUT", { $where: "true" });
      assert.equal(invalid.status, 400, route + " operator rejection");
      const updated = await request(base, "/" + route + "/" + id, "PUT", fixture.change);
      assert.equal(updated.status, 200, route + " update");
      assert.equal(updated.body[fixture.field], fixture.change[fixture.field]);

      const deleted = await request(base, "/" + route + "/" + id, "DELETE");
      assert.equal(deleted.status, 200, route + " delete");
      const missing = await model.findById(id);
      assert.equal(missing, null);
      await model.deleteMany({});
    }
  } finally {
    await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
    await mongoose.disconnect();
  }
});
