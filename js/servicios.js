import { obtenerServicios } from './app.js';

const tablaServiciosBody = document.getElementById('tablaServiciosBody');

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
