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
    "purple": {
      "50": "#F2F0F4",
      "100": "#D9D6E1",
      "200": "#C1BBCD",
      "300": "#A9A1BA",
      "400": "#9186A7",
      "500": "#796C93",
      "600": "#615676",
      "700": "#494158",
      "800": "#302B3B",
      "900": "#18161D"
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
