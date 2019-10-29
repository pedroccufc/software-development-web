import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Lunch from './pages/lunch';
import Breakfast from './pages/breakfast';
import Dinner from './pages/dinner';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/cardapio' component={Main} />
		</Switch>
	</BrowserRouter>
);

export default Routes;