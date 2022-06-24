import Root from './views';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from './context/Auth.context';
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';



const theme = extendTheme({ 
  colors: {
    "purpleC": {
      "50": "#F1EFF6",
      "100": "#D7D2E5",
      "200": "#BEB5D4",
      "300": "#A498C3",
      "400": "#8B7BB2",
      "500": "#715EA1",
      "600": "#5A4B81",
      "700": "#443861",
      "800": "#2D2541",
      "900": "#171320"
    }
  }, 
  textStyles: {
    Th: {
      fontWeight: '300'
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </React.StrictMode>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
