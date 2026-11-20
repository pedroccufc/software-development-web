const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('all meals expose one collection and one detail route per operation', () => {
  const calls = [];
  const router = {};
  for (const method of ['get', 'post', 'put', 'delete']) {
    router[method] = (url, handler) => calls.push({ method, url, handler });
  }
  const controllers = {};
  for (const meal of ['Breakfast', 'Lunch', 'Dinner']) {
    controllers[meal] = {};
    for (const action of ['index', 'show', 'store', 'update', 'destroy']) {
      controllers[meal][action] = meal + '.' + action;
    }
  }
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'routes.js'), 'utf8');
  const ctx = {
    module: { exports: {} },
    require(name) {
      if (name === 'express') return { Router: () => router };
      const match = /^\.\/controllers\/(Breakfast|Lunch|Dinner)Controller$/.exec(name);
      if (match) return controllers[match[1]];
      throw new Error('Unexpected dependency: ' + name);
    }
  };
  vm.runInNewContext(source, ctx, { filename: 'routes.js' });
  assert.equal(ctx.module.exports, router);
  for (const meal of ['breakfast', 'lunch', 'dinner']) {
    const model = meal[0].toUpperCase() + meal.slice(1);
    const expected = [
      ['get', '/' + meal, 'index'],
      ['get', '/' + meal + '/:id', 'show'],
      ['post', '/' + meal, 'store'],
      ['put', '/' + meal + '/:id', 'update'],
      ['delete', '/' + meal + '/:id', 'destroy']
    ];
    for (const [method, url, action] of expected) {
      assert.equal(
        calls.filter(c => c.method === method && c.url === url && c.handler === model + '.' + action).length,
        1,
        'Expected one ' + method.toUpperCase() + ' ' + url + ' for ' + model + '.' + action
      );
    }
  }
  assert.equal(calls.length, 15, 'Unexpected duplicate or missing routes');
});
