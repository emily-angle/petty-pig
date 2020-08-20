//test
import React, { Suspense, lazy } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
// mock api
import { mockXHR } from './mockjs'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}
const routes = [
  {
    path: "/login",
    component: React.lazy(() => import('./pages/login'))
  },
  {
    path: "/home",
    component: React.lazy(() => import('./pages/home'))
  }
];
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
export default function App() {
  return (
    <div id='app'>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}