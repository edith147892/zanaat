CREATE DATABASE IF NOT EXISTS tienda_artesania;
USE tienda_artesania;

-- CRM: Datos de prospectos que llenan formulario para descargar archivos
CREATE TABLE crm_descargas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SCM: Proveedores
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100)
);

-- SCM: Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    proveedor_id INT,
    stock INT DEFAULT 0,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- Carrito y Usuarios: Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Acceso de usuarios administrativos
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'cliente') DEFAULT 'cliente'
);

-- SCM y ERP: Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('En proceso', 'Enviado', 'Entregado') DEFAULT 'En proceso'
);

-- Detalle de los pedidos
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Carrito temporal antes de realizar pedido
CREATE TABLE carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    producto_id INT,
    cantidad INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Datos de prueba para CRM
INSERT INTO crm_descargas (nombre, correo, telefono) VALUES
('María López', 'maria.lopez@gmail.com', '4491234567'),
('Carlos Ramírez', 'carlos.ramirez@hotmail.com', '4497654321'),
('Lucía Torres', 'lucia.torres@outlook.com', '4491122334');

-- Datos de proveedores
INSERT INTO proveedores (nombre, contacto, telefono, correo) VALUES
('Artesanos del Sur', 'Juan Pérez', '4495551122', 'juan@artesur.com'),
('Manos Creativas de Chiapas', 'Carmen Gómez', '4494443311', 'carmen@manoschiapas.com');

-- Productos
INSERT INTO productos (nombre, descripcion, precio, proveedor_id, stock) VALUES
('Blusa tejida multicolor', 'Blusa artesanal tejida a mano con hilos de algodón, diseño tradicional.', 450.00, 1, 15),
('Figura de barro decorativa', 'Figura de barro cocido pintada a mano, ideal para decoración.', 320.00, 1, 10),
('Blusa con bordado floral', 'Hecha por artesanas chiapanecas, con bordados a mano.', 520.00, 2, 8),
('Figura de jaguar tallada', 'Pieza tallada en madera y pintada con pigmentos naturales.', 680.00, 2, 5);

-- Clientes
INSERT INTO clientes (nombre, correo, contrasena) VALUES
('Laura Castillo', 'laura.castillo@gmail.com', 'clave123'),
('José Medina', 'jose.m@hotmail.com', 'segura456');

-- Usuarios
INSERT INTO usuarios (correo, contrasena, rol) VALUES
('admin@zanaat.com', 'adminpass', 'admin'),
('laura.castillo@gmail.com', 'clave123', 'cliente');

-- Pedidos
INSERT INTO pedidos (cliente_id, estado) VALUES
(1, 'En proceso'),
(2, 'Enviado');

-- Detalle de pedidos
INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 2, 450.00),
(1, 2, 1, 320.00),
(2, 4, 1, 680.00);

-- Carrito
INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES
(1, 3, 1),
(2, 2, 2);
