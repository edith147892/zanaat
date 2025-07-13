// login.js mejorado con SweetAlert2 y validaciones modernas

function abrirRegistroModal() {
  document.getElementById("registroModal").style.display = "block";
}

function cerrarRegistroModal() {
  document.getElementById("registroModal").style.display = "none";
}

function abrirLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

function cerrarLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

function abrirPerfilModal() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo) {
    Swal.fire("Acceso denegado", "Debes iniciar sesión primero.", "warning");
    return;
  }
  document.getElementById("perfilNombre").value = usuarioActivo.username;
  document.getElementById("perfilCorreo").value = usuarioActivo.email;
  document.getElementById("perfilTelefono").value = usuarioActivo.telefono || "";
  document.getElementById("perfilDireccion").value = usuarioActivo.direccion || "";
  document.getElementById("perfilPais").value = usuarioActivo.pais || "";
  document.getElementById("perfilModal").style.display = "block";
}

function cerrarPerfilModal() {
  document.getElementById("perfilModal").style.display = "none";
}

function cambiarAIniciarSesion() {
  cerrarRegistroModal();
  abrirLoginModal();
}

function cambiarARegistro() {
  cerrarLoginModal();
  abrirRegistroModal();
}

// Registro de cuenta
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const pais = document.getElementById("pais").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.some(u => u.email === email);

  if (existe) {
    Swal.fire("Error", "Este correo ya está registrado.", "error");
    return;
  }

  const nuevoUsuario = { username, email, password, telefono, direccion, pais };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  Swal.fire("Cuenta creada", "Tu cuenta ha sido registrada con éxito.", "success").then(() => {
    document.getElementById("registroForm").reset();
    cerrarRegistroModal();
    abrirLoginModal();
  });
});

// Inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    Swal.fire("Bienvenido", `Hola ${usuario.username}`, "success");
    cerrarLoginModal();
    document.querySelector(".icono-perfil").style.display = "block";
  } else {
    Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
  }
});

// Guardar cambios al perfil
document.getElementById("perfilForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("perfilNombre").value;
  const correo = document.getElementById("perfilCorreo").value;
  const telefono = document.getElementById("perfilTelefono").value;
  const direccion = document.getElementById("perfilDireccion").value;
  const pais = document.getElementById("perfilPais").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  usuarios = usuarios.map(u => u.email === usuarioActivo.email ?
    { username: nombre, email: correo, password: u.password, telefono, direccion, pais } : u);

  const usuarioActualizado = { username: nombre, email: correo, password: usuarioActivo.password, telefono, direccion, pais };
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

  Swal.fire("Actualizado", "Perfil actualizado con éxito.", "success");
  cerrarPerfilModal();
});

window.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo) {
    document.querySelector(".icono-perfil").style.display = "block";
  }
});
