import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'reactjs-shared-ui';
import 'reactjs-shared-ui/styles.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
