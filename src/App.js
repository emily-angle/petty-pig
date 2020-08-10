import React, { Suspense, lazy } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
// mock api
import { mockXHR } from './mockjs'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}
const Login = lazy(() => import('./pages/login'))
const Home = lazy(() => import('./pages/home'))
const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]
function RouteWithSubRoutes(route) {
  return (
    <Route path={route.path} render={props => (
      <route.component {...props} routes={route.routes} />
    )} />
  )
}
function App() {
  return (
    <div id='app'>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            {/* <Route path='/' component={Login}></Route> */}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
