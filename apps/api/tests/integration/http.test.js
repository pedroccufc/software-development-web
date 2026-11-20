const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const app = require('../../src/app');

// Exercise the real Express router over HTTP without contacting MongoDB.
// Model methods are restored after each test.
async function withServer(run) {
  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
      server.once('error', reject);
    });
    return await run('http://127.0.0.1:' + server.address().port);
  } finally {
    await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
}

// Access the existing model methods used by the controller, not a second router.
test('GET /breakfast/:id reaches the real Express controller', async () => {
  const Breakfast = mongoose.model('Breakfast');
  const previous = Breakfast.findById;
  const id = '507f1f77bcf86cd799439011';
  Breakfast.findById = async (value) => ({ _id: value, drinks: 'water' });
  try {
    await withServer(async (base) => {
      const response = await fetch(base + '/breakfast/' + id);
      assert.equal(response.status, 200);
      const data = await response.json();
      assert.equal(data._id, id);
      assert.equal(data.drinks, 'water');
    });
  } finally {
    Breakfast.findById = previous;
  }
});

test('GET /breakfast collection does not accidentally call the detail handler', async () => {
  const Breakfast = mongoose.model('Breakfast');
  const previous = Breakfast.paginate;
  Breakfast.paginate = async () => ({ docs: [], total: 0 });
  try {
    await withServer(async (base) => {
      const response = await fetch(base + '/breakfast');
      assert.equal(response.status, 200);
      const data = await response.json();
      assert.deepEqual(data.docs, []);
    });
  } finally {
    Breakfast.paginate = previous;
  }
});

test('PUT and DELETE /breakfast/:id invoke the intended model methods', async () => {
  const Breakfast = mongoose.model('Breakfast');
  const oldUpdate = Breakfast.findByIdAndUpdate;
  const oldRemove = Breakfast.findByIdAndDelete;
  const id = '507f1f77bcf86cd799439011';
  const called = [];
  Breakfast.findByIdAndUpdate = async (key, patch) => {
    called.push(['update', key, patch.drinks]);
    return { _id: key, drinks: patch.drinks };
  };
  Breakfast.findByIdAndDelete = async (key) => {
    called.push(['delete', key]);
    return { _id: key };
  };
  try {
    await withServer(async (base) => {
      const updated = await fetch(base + '/breakfast/' + id, {
        method: 'PUT', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ drinks: 'juice' })
      });
      assert.equal(updated.status, 200);
      assert.equal((await updated.json()).drinks, 'juice');
      const removed = await fetch(base + '/breakfast/' + id, { method: 'DELETE' });
      assert.equal(removed.status, 200);
      assert.deepEqual(called, [['update', id, 'juice'], ['delete', id]]);
    });
  } finally {
    Breakfast.findByIdAndUpdate = oldUpdate;
    Breakfast.findByIdAndDelete = oldRemove;
  }
});
