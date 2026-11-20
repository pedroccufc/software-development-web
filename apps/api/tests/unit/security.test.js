const test = require("node:test");
const assert = require("node:assert/strict");
const validateMealPayload = require("../../src/middleware/validate-meal-payload");

function check(body) {
  let result = "next";
  const res = {
    status(code) { result = code; return this; },
    json() { return this; }
  };
  validateMealPayload({ body }, res, () => { result = "next"; });
  return result;
}

test("accepts existing scalar meal fields", () => {
  assert.equal(check({ drinks: "water", dateBreakfast: "2026-11-20" }), "next");
});

test("rejects MongoDB operators and dotted paths", () => {
  assert.equal(check({ $where: "this.isAdmin" }), 400);
  assert.equal(check({ "nested.$where": "test" }), 400);
  assert.equal(check(JSON.parse('{"__proto__":"value"}')), 400);
});

test("rejects nested objects and arrays", () => {
  assert.equal(check({ drinks: { $ne: "" } }), 400);
  assert.equal(check({ drinks: ["water"] }), 400);
});

test("rejects non-object bodies", () => {
  assert.equal(check(null), 400);
  assert.equal(check("water"), 400);
  assert.equal(check([]), 400);
});
