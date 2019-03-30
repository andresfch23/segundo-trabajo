const fs = require('fs');
const hbs = require('hbs');
hbs.handlebars === require('handlebars');
let listaUsuarios = [];
let usuarioActual = [];

const registroUsuario = estudiante => {
  const { nombre, identificacion, correo, telefono } = estudiante;
  listarUsuarios();

  const nuevoEstudiante = {
    nombre,
    identificacion,
    correo,
    telefono,
    rol: "aspirante"
  }

  const duplicado = listaUsuarios.find(est => est.identificacion === identificacion);

  if(!duplicado) {
    listaUsuarios.push(nuevoEstudiante);
    guardar();
    
    const inscrito = `Señor@ ${nombre}, ha sido registrado exitosamente`;

    return new hbs.handlebars.SafeString(`
      <span>${inscrito}</span>
      <a href="/aspirante">Ir a la pagina de cursos</a>
    `); 
  } else {
    const existente = `El usuario con el numero de identificacion ${identificacion}, ya se encuentra registrado`;

    return new hbs.handlebars.SafeString(`
      <span>${existente}</span>
      <a href="/formulario">Volver</a>
    `); 
  }
}

const buscarUsuario = (identificacion) => {
  listarUsuarios();

  const usuario = listaUsuarios.find(usu => usu.identificacion === identificacion);


  if(usuario) {
    usuarioActual = [usuario];
    guardarUsuario();
    return new hbs.handlebars.SafeString(`
      <span>Bienvenido ${usuario.nombre} </span>
      <a href="/inicio">Ir a la pagina principal</a>
    `);
  } 

  return new hbs.handlebars.SafeString(`
    <span>El usuario con la identificacion ${identificacion} no se encuenra registrado </span>
    <a href="/">Volver</a>
  `); 
}

const guardarUsuario = () => {
  const datos = JSON.stringify(usuarioActual);
  fs.writeFile(`${__dirname}/../usuarioActual.json`, datos, (err) => {
    if (err) throw(err)
  })
}

const guardar = () => {
  const datos = JSON.stringify(listaUsuarios);
  fs.writeFile(`${__dirname}/../usuarios.json`, datos, (err) => {
    if (err) throw(err)
  })
}

const listarUsuarios = () => {
  try {
    listaUsuarios = require("../usuarios.json");
  } catch {
    listaUsuarios;
  }
}

const listarUsuarioActual = () => {
  try {
    usuarioActual = require("../usuarioActual.json");
  } catch {
    usuarioActual;
  }
}

const rolActual = () => {
  listarUsuarioActual();
  if(usuarioActual.length > 0) {
    return usuarioActual[0].rol
  }
}

const navegacion = () => {
  const rol = rolActual();
  if(rol === "aspirante") {
    return new hbs.handlebars.SafeString(`
      <a href="/inscribir">INSCRIBIR</a>
    `); 
  } else if (rol === "coordinador") {
    return new hbs.handlebars.SafeString(`
      <a href="/inscritos">VER INSCRITOS</a>
    `);
  }
}

const clickeado = () => {
  console.log(global);
}

module.exports = {
  registroUsuario,
  buscarUsuario,
  navegacion,
  clickeado
}