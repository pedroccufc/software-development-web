const express = require("express");
const routes = express.Router();

const LunchController = require("./controllers/LunchController");
const BreakfastController = require('./controllers/BreakfastController');
const DinnerController = require('./controllers/DinnerController');

routes.get("/lunch", LunchController.index);
routes.get("/lunch/:id", LunchController.show);
routes.post("/lunch", LunchController.store);
routes.put("/lunch/:id", LunchController.update);
routes.delete("/lunch/:id", LunchController.destroy);

routes.get('/breakfast', BreakfastController.index);
routes.get('/breakfast', BreakfastController.show);
routes.post('/breakfast', BreakfastController.store);
routes.put('/breakfast', BreakfastController.update);
routes.delete('/breakfast', BreakfastController.destroy);

routes.get('/dinner', DinnerController.index);
routes.get('/dinner/:id', DinnerController.show);
routes.post('/dinner', DinnerController.store);
routes.put('/dinner', DinnerController.update);
routes.delete('/dinner', DinnerController.destroy);

module.exports = routes;
