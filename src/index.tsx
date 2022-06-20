import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {createApi} from './api';
import App from './components/app/app';
import rootReducer from './store/reducer';


const api = createApi();

const store = configureStore<unknown>({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)],
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
