/**
 * Monta App sobre el elemento root y carga la hoja de estilos activa.
 */
import React from 'react'; // [doc] Importa React desde react.
import ReactDOM from 'react-dom/client'; // [doc] Importa ReactDOM desde react-dom/client.
import App from './App'; // [doc] Importa App desde ./App.
import './style.css'; // [doc] Importa  desde ./style.css.

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
