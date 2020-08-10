import React, { Suspense, lazy } from 'react';
// import logo from './logo.svg';
import './styles/App.css';
// mock api
import { mockXHR } from './mockjs'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
if (process.env.NODE_ENV === 'development') {
  mockXHR()
}
const Login = lazy(() => import('./pages/login'))
function App() {
  return (
    <div id='app'>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/' component={Login}></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
