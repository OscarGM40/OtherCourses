import React from 'react';
import ReactDOM from 'react-dom';
/* imports para i18next */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
/* plugin para deteccion del idioma del browser */
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';


/* los relative imports siempre debajo asinto */
import App from './App';

/* react me traigo el core i18n */
i18n
  // le paso el adapter para react
  .use(initReactI18next)
  // le paso el plugin para detectar el idioma del navegador
  .use(LanguageDetector)
  // le paso el backend para que se conecte con el servidor
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'es', 'fr','ar'],
    /* en resources van las traducciones, mejor moverlas */
    // puedo hardcodear el lng o detectarlo
    detection: {
      order: ["cookie","htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"], 
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json"
    },
    react: {
      useSuspense: false  // no uso suspense
    }

  });


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
