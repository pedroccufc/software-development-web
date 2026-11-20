const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../../src/app");

test("each meal module registers its five HTTP operations", () => {
  const root = app._router.stack.find(layer => layer.name === "router");
  assert.ok(root, "Main application router was not mounted");

  const expected = [
    ["get", "/"], ["get", "/:id"], ["post", "/"],
    ["put", "/:id"], ["delete", "/:id"]
  ];
  const modules = ["breakfast", "lunch", "dinner"];
  assert.equal(root.handle.stack.length, modules.length);

  for (const [index, meal] of modules.entries()) {
    const mounted = root.handle.stack[index];
    assert.ok(mounted.handle && mounted.handle.stack, meal + " router missing");
    assert.ok(mounted.regexp.test("/" + meal + "/"), meal + " mount path missing");
    const actual = mounted.handle.stack
      .filter(layer => layer.route)
      .map(layer => [Object.keys(layer.route.methods)[0], layer.route.path]);
    assert.deepEqual(actual, expected, meal + " routes differ");
  }
});
