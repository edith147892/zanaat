// Seleccionar elementos del carrusel
const carrusel = document.getElementById('carrusel');
let slides = carrusel.querySelectorAll('img');
let index = 0;

// Clonar la primera imagen y agregarla al final
const firstClone = slides[0].cloneNode(true);
carrusel.appendChild(firstClone);

// Actualizar los slides después de clonar
slides = carrusel.querySelectorAll('img');

// Asegurar que las imágenes tengan el tamaño correcto
slides.forEach(img => {
  img.style.width = '100%';
});

// Función para actualizar el carrusel
function updateCarousel() {
  carrusel.style.transition = 'transform 0.5s ease-in-out';
  carrusel.style.transform = `translateX(-${index * 100}vw)`;
}

// Función para avanzar al siguiente slide
function nextSlide() {
  index++;
  updateCarousel();

  if (index === slides.length - 1) {
    // Reiniciar el carrusel
    setTimeout(() => {
      carrusel.style.transition = 'none';
      index = 0;
      carrusel.style.transform = `translateX(0)`;
    }, 500); // Esperar a que termine la animación
  }
}

// Botones de navegación
document.querySelector('.next').addEventListener('click', nextSlide);

document.querySelector('.prev').addEventListener('click', () => {
  if (index === 0) {
    // Si estamos en la primera imagen, saltamos a la última
    index = slides.length - 2;
    carrusel.style.transition = 'none';
    carrusel.style.transform = `translateX(-${index * 100}vw)`;
    setTimeout(() => {
      carrusel.style.transition = 'transform 0.5s ease-in-out';
    }, 20);
  } else {
    index--;
    updateCarousel();
  }
});

// Carrusel automático
setInterval(nextSlide, 3000);

// productos.js
// ===================== PRODUCTOS Y BUSQUEDA =====================

document.addEventListener('DOMContentLoaded', () => {
  let productos = [];
  const contenedor = document.querySelector('.productos');
  const inputBusqueda = document.getElementById('busqueda');
  const listaSugerencias = document.getElementById('sugerencias');

  // Cargar productos desde JSON
  fetch('data/productos.json')
    .then(res => res.json())
    .then(data => productos = data)
    .catch(err => console.error('Error al cargar productos:', err));

  // Mostrar productos en el DOM
  function mostrarProductos(lista) {
    contenedor.innerHTML = '';

    if (lista.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron productos.</p>';
      return;
    }

    lista.forEach(producto => {
      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <div class="img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="hover-info">Especificaciones</div>
        </div>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
      `;
      div.addEventListener('click', () => abrirModal(producto));
      contenedor.appendChild(div);
    });
  }

  // Sugerencias al escribir
  inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase().trim();
    listaSugerencias.innerHTML = '';

    if (!texto) return;

    const sugerencias = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );

    sugerencias.slice(0, 6).forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.nombre;
      li.addEventListener('click', () => {
        inputBusqueda.value = p.nombre;
        listaSugerencias.innerHTML = '';
        mostrarProductos([p]);
      });
      listaSugerencias.appendChild(li);
    });
  });

  // Cerrar sugerencias al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.barra-busqueda')) {
      listaSugerencias.innerHTML = '';
    }
  });

  // Mostrar modal con detalles del producto
  window.abrirModal = function(producto) {
    document.getElementById('modalTitulo').innerText = producto.nombre;
    document.getElementById('modalDescripcion').innerText = producto.descripcion;
    document.getElementById('modalPrecio').innerText = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modalImagen').src = producto.imagen; // <-- LÍNEA AÑADIDA
    document.getElementById('modal').style.display = 'block';

    document.querySelector('#modal button').onclick = () => {
      agregarAlCarrito(producto);
    };
  };

  window.cerrarModal = function() {
    document.getElementById('modal').style.display = 'none';
  };
});

async function cargarProductos() {
  const res = await fetch('data/productos.json');
  const productos = await res.json();
  const contenedor = document.querySelector('.productos');
  contenedor.innerHTML = productos.map(p => `
    <div class="producto" onclick="abrirModal(
        '${p.nombre}',
        '${p.descripcion}',
        ${p.precio}
      )">
      <div class="img-container">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="hover-info">Especificaciones</div>
      </div>
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio.toFixed(2)}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', cargarProductos);


  const openBtn = document.getElementById("openCartBtn");
  const closeBtn = document.getElementById("closeCartBtn");
  const sidebar = document.getElementById("cartSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Ejemplo de contador actualizado (puedes enlazar esto con tu lógica de productos)
  let contador = 0;
  function agregarAlCarrito() {
    contador++;
    document.getElementById("contador-carrito").textContent = contador;
    document.getElementById("itemCount").textContent = contador;
    // Aquí puedes actualizar #cartItems con HTML dinámico
  }
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContadorCarrito() {
  document.getElementById("contador-carrito").textContent = carrito.length;
}

// Al cargar la página
actualizarContadorCarrito();

// Al hacer clic en "Agregar al carrito"
btnAgregar.addEventListener("click", () => {
  if (productoSeleccionado) {
    carrito.push(productoSeleccionado);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    modal.style.display = "none";
  }
});

// ===================== LOGIN & REGISTRO =====================

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

function cambiarAIniciarSesion() {
  cerrarRegistroModal();
  abrirLoginModal();
}

function cambiarARegistro() {
  cerrarLoginModal();
  abrirRegistroModal();
}

// Registro de usuario

// Al enviar el formulario de registro

// Guardar en localStorage si el correo no existe

// Mostrar alerta y limpiar formulario

document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const nuevoUsuario = { username, email, password };
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    alert("Este correo ya está registrado.");
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cuenta creada exitosamente.");
  document.getElementById("registroForm").reset();
  cerrarRegistroModal();
  abrirLoginModal();
});

// Inicio de sesión

// Validar usuario por email y contraseña

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    alert(`Bienvenido, ${usuario.username}`);
    cerrarLoginModal();
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});  