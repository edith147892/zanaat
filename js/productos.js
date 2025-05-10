// Función para obtener y mostrar los productos desde el archivo JSON
fetch('data/productos.json')
  .then(res => res.json())
  .then(productos => {
    const productosContainer = document.querySelector('.productos');

    productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
      productoElement.innerHTML = `
        <div class="img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="hover-info">Especificaciones</div>
        </div>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
      `;

      productoElement.addEventListener('click', () => abrirModal(producto));

      productosContainer.appendChild(productoElement);
    });
  })
  .catch(err => console.error('Error cargando productos:', err));

function abrirModal(producto) {
  document.getElementById('modalTitulo').innerText = producto.nombre;
  document.getElementById('modalDescripcion').innerText = producto.descripcion;
  document.getElementById('modalPrecio').innerText = `$${producto.precio.toFixed(2)}`;
  document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

let carritoContador = 0;

function agregarAlCarrito() {
  carritoContador++;
  document.getElementById('cart-count').innerText = carritoContador;
  cerrarModal();
}
