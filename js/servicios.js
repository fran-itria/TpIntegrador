import { obtenerServicios } from './app.js';

const tablaServiciosBody = document.getElementById('tablaServiciosBody');

const inputId = document.getElementById('servicioId');
const inputNombre = document.getElementById('nombre');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecio = document.getElementById('precio');
const selectEstado = document.getElementById('estado');

let servicios = [];

function cargarServicios() {
  servicios = obtenerServicios();
  renderizarTabla();
}

function renderizarTabla() {
  tablaServiciosBody.innerHTML = '';
  servicios.forEach(servicio => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${servicio.nombre}</td>
      <td>${servicio.descripcion}</td>
      <td>$${servicio.precio}</td>
      <td>${servicio.estado}</td>
    `;
    tablaServiciosBody.appendChild(tr);
  });
}

  renderizarTabla();

window.addEventListener('load', cargarServicios);
