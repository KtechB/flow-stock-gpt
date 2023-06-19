import '../global.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
import { proxyStore } from '../app/proxyStore';
import Popup from './Popup';
import { ChakraProvider } from '@chakra-ui/react';

proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {/* <Provider store={proxyStore}> */}
      <ChakraProvider>
        <Popup />
      </ChakraProvider>
      {/* </Provider> */}
    </React.StrictMode>
  );
});
