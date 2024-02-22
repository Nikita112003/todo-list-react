import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { store } from './slices/index';

const rootElement = document.getElementById('root');
if (rootElement){
  const root = ReactDOM.createRoot(rootElement);

  root.render(
      <Provider store={store}>
          <App />
      </Provider>
  );
}