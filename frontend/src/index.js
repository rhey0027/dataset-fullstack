import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BucketsContextProvider } from './context/BucketContext';
import { AuthContextProvider } from './context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
        <AuthContextProvider>
          <BucketsContextProvider>
               <App />
          </BucketsContextProvider>
        </AuthContextProvider>
      </React.StrictMode>
);

