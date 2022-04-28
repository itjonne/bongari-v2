import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './store/store';
import { Provider } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
