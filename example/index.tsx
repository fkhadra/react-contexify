import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { App } from './components/App';

import './index.css';
import '../scss/main.scss';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
