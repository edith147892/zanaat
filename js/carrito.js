// Carrito funcional
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContadorCarrito() {
  document.getElementById('contador-carrito').textContent = carrito.length;
  document.getElementById('itemCount').textContent = carrito.length;
}

function mostrarCarrito() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  carrito.forEach((producto, index) => {
    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
      <div>
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio.toFixed(2)}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      </div>
    `;
    cartItems.appendChild(item);
  });

  document.getElementById('cartTotal').textContent = carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2);
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Inicialización
actualizarContadorCarrito();
mostrarCarrito();

// Evento para abrir/cerrar carrito
const openBtn = document.getElementById("openCartBtn");
const closeBtn = document.getElementById("closeCartBtn");
const sidebar = document.getElementById("cartSidebar");

openBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});
