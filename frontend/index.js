import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
// import { Login } from './loginPage/Login';



// createRoot(document.querySelector('#App')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = createRoot(document.getElementById('App'));

root.render(
  <App />
);