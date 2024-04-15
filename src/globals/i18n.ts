import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      episodes: 'Episodes',
      locations: 'Locations',
      characters: 'Characters',
      residents: 'Residents',
      settings: 'Settings',
      comments: 'Comments',
      search: 'Search',
      language: 'Language',
      theme: 'Theme',
      default: 'Default',
      light: 'Light',
      dark: 'Dark',
      name: 'Name',
      email: 'Email',
      comment: 'Comment',
      send: 'Send',
      sending: 'Sending',
      commentSuccess: 'Your comment was successfully sent. Thanks.',
      commentError:
        'There was a problem sending your comment. Please try again.',
    },
  },
  es: {
    translation: {
      home: 'Inicio',
      episodes: 'Episodios',
      locations: 'Localizaciones',
      characters: 'Personajes',
      residents: 'Habitantes',
      settings: 'Ajustes',
      comments: 'Comentarios',
      search: 'Buscar',
      language: 'Idioma',
      theme: 'Tema',
      default: 'Por defecto',
      light: 'Claro',
      dark: 'Oscuro',
      name: 'Nombre',
      email: 'Email',
      comment: 'Comentario',
      send: 'Enviar',
      sending: 'Enviando',
      commentSuccess: 'Tu comentario se ha enviado con éxito. Gracias.',
      commentError:
        'Ha ocurrido un error. Vuelve a enviar tu comentario de nuevo por favor.',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'es', // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
