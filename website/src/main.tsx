import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ChakraWrap } from './components/chakraWrap';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraWrap>
      <App />
    </ChakraWrap>
  </React.StrictMode>
);
