const rutas = (app) => {
  const renderizarPaginaDeInicio = (req, res) => res.render('home')
  app.get('/', renderizarPaginaDeInicio);
  
  const renderizarPaginaDeFormulario = (req, res) => res.render('formulario');
  app.get('/inscribirme', renderizarPaginaDeFormulario);
  
  const renderizarPaginaPrincipal = (req, res) => res.render('inicio');
  app.get('/inicio', renderizarPaginaPrincipal);
  
  const renderizarPaginaLogin = (req, res) => res.render('login');
  app.get('/login', renderizarPaginaLogin);
  
  const recibirInfoUsuario = ({ body: { ...informacion }}, res) => {
    res.render('inscrito', { informacion });
  };
  app.post('/inscrito', recibirInfoUsuario);
  
  const recibirNombreDeUsuario = ({ body: { usuario } }, res) => {
    res.render('usuario', { usuario });
  }
  app.post('/usuario', recibirNombreDeUsuario);
};

module.exports = rutas;