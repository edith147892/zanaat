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

// Variables del carrito
let carritoContador = 0;

// Función para abrir el modal del producto
function abrirModal(titulo, descripcion, precio) {
  document.getElementById('modalTitulo').innerText = titulo;
  document.getElementById('modalDescripcion').innerText = descripcion;
  document.getElementById('modalPrecio').innerText = `$${precio.toFixed(2)}`;
  document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
  carritoContador++;
  // Actualizar el contador en el carrito
  document.getElementById('cart-count').innerText = carritoContador;
  cerrarModal();
}

// productos.js
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

