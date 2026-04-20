import React from 'react';
import Producto from '../Producto';
const listaProductos = [
{ id: 1, nombre: 'Laptop', precio: 1200 },
{ id: 2, nombre: 'Mouse', precio: 25 },
{ id: 3, nombre: 'Teclado', precio: 45 },
];
function Productos() {
return (
<div>
<h2>Productos</h2>
{listaProductos.map((p) => (
<Producto key={p.id} nombre={p.nombre} precio={p.precio}
/>
))}
</div>
);
}
export default Productos;