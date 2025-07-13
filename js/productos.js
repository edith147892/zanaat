document.addEventListener("DOMContentLoaded", () => {
  let productos = [];

  // Cargar productos desde el JSON
  fetch('data/productos.json')
    .then(res => res.json())
    .then(data => {
      productos = data;
    });

  // Buscar productos
  document.getElementById("btn-buscar").addEventListener("click", () => {
    const textoBusqueda = document.getElementById("buscador").value.toLowerCase();
    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(textoBusqueda)
    );

    mostrarResultados(resultados);
  });
});

function mostrarResultados(resultados) {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = "";

  if (resultados.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  resultados.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto-card");
    div.innerHTML = `
      <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">
      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

const contenedor = document.getElementById("productos-container");
const modal = document.getElementById("modal-producto");
const modalImg = document.getElementById("modal-img");
const modalNombre = document.getElementById("modal-nombre");
const modalDescripcion = document.getElementById("modal-descripcion");
const modalPrecio = document.getElementById("modal-precio");
const btnAgregar = document.getElementById("btn-agregar-carrito");
const cerrarModal = document.querySelector(".cerrar-modal");

let productoSeleccionado = null;

fetch('data/productos.json')
  .then(res => res.json())
  .then(productos => {
    productos.slice(0, 5).forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("producto-card");
      card.setAttribute("data-tooltip", producto.especificaciones || "Sin especificaciones");

      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" style="cursor:pointer;">
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
        </div>
      `;

      // Evento al hacer clic en la imagen
      card.querySelector("img").addEventListener("click", () => {
        productoSeleccionado = producto;
        modalImg.src = producto.imagen;
        modalNombre.textContent = producto.nombre;
        modalDescripcion.textContent = producto.descripcion;
        modalPrecio.textContent = "$" + producto.precio;
        modal.style.display = "flex";
      });

      contenedor.appendChild(card);
    });
  });

// Cerrar modal
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar haciendo clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Agregar al carrito
btnAgregar.addEventListener("click", () => {
  if (productoSeleccionado) {
    // Aquí va la lógica para agregar al carrito
    alert(`Agregado: ${productoSeleccionado.nombre}`);
    modal.style.display = "none";
  }
});

