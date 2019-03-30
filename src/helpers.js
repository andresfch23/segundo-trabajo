const hbs = require('hbs');
const { registroUsuario, buscarUsuario, navegacion, clickeado } = require('./funciones');

hbs.registerHelper('registroUsuario', registroUsuario);
hbs.registerHelper('buscarUsuario', buscarUsuario);
hbs.registerHelper('navegacion', navegacion);
hbs.registerHelper('clickeado', clickeado);
