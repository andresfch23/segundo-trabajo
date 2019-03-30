const init = () => {
  const express = require('express');
  const app = express();
  const path = require('path');
  const bodyParser = require('body-parser');
  const hbs = require('hbs');
  const rutas = require('./rutas');

  require('./helpers');
  require('./funciones');
  const funciones = require('./funciones');

  const directorioPublico = path.join(__dirname, '../public');
  const directorioPartials = path.join(__dirname, '../partials');

  app.use(express.static(directorioPublico));

  hbs.registerPartials(directorioPartials);

  app.use(bodyParser.urlencoded({ extended: false }));

  app.set('view engine', 'hbs');

  rutas(app);

  app.listen(3000);
  
  return app;
}

init();