import json
import mysql.connector
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Configuración para ocultar la ventana principal de Tkinter
Tk().withdraw()

# Seleccionar archivo JSON
ruta_archivo = askopenfilename(title="Selecciona el archivo JSON", filetypes=[("JSON files", "*.json")])
if not ruta_archivo:
    print("C:\Users\medin\OneDrive\Documentos\zanaat\data")
    exit()

# Leer archivo JSON
with open(ruta_archivo, 'r', encoding='utf-8') as archivo:
    productos = json.load(archivo)

# Conectar a la base de datos
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="zanaat"
)
cursor = conexion.cursor()

# Insertar productos
for producto in productos:
    nombre = producto.get("nombre")
    categoria = producto.get("categoria")
    precio_mercado = producto.get("precio")
    precio_comprado = precio_mercado - 50  # Puedes ajustar esta lógica
    cantidad = 10  # Valor por defecto
    id_proveedor = 1  # Puedes cambiarlo si tienes múltiples proveedores

    sql = """
        INSERT INTO Producto (nombre, categoria, precio_mercado, precio_comprado, cantidad, id_proveedor)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    valores = (nombre, categoria, precio_mercado, precio_comprado, cantidad, id_proveedor)

    try:
        cursor.execute(sql, valores)
    except Exception as e:
        print(f"Error al insertar {nombre}: {e}")

conexion.commit()
cursor.close()
conexion.close()

print("Migración completada.")
