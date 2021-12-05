import React from 'react';
import ReactDOM from 'react-dom';
/* imports para i18next */
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
/* plugin para deteccion del idioma del browser */
import LanguageDetector from "i18next-browser-languagedetector";





/* los relative imports siempre debajo asinto */
import './index.css';
// import App from './App';

/* de react me traigo i18n */
i18n
  // le paso el adapter para react
  .use(initReactI18next)
  // le paso el plugin para detectar el idioma del navegador
  .use(LanguageDetector)
  .init({
    /* en resources van las traducciones, mejor moverlas a un json o incluso traerlas de una URI */
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next",
        },
      },
    es: {
      translation: {
        "Welcome to React": "Bienvenido a React y react-i18next",
      },
    },
    fr: {
      translation: {
        "Welcome to React": "Bienvenue à React et react-i18next",
      },
     },
    }, // fin resources
    /* puedo hardcodear el lng o cogerlo de la etiqueta html */
    // lng: document.querySelector("html").lang, 
    fallbackLng: "en", // fallback to this language if none is detected
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"], 
    }
  });

function App() {
  const { t } = useTranslation();
  return <h2>{t("Welcome to React")}</h2>;
}

/* sss */
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
