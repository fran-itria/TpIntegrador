import { obtenerServicios } from './app.js';

const tablaServiciosBody = document.getElementById('tablaServiciosBody');
const formServicio = document.getElementById('formServicio');
const btnNuevoServicio = document.getElementById('btnNuevoServicio');
const btnCancelar = document.getElementById('btnCancelar');

const inputId = document.getElementById('servicioId');
const inputNombre = document.getElementById('nombre');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecio = document.getElementById('precio');
const selectEstado = document.getElementById('estado');

let servicios = [];
let editando = false;

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
      <td>
        <button class="btn btn-sm btn-primary btn-editar" data-id="${servicio.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${servicio.id}">Eliminar</button>
      </td>
    `;
    tablaServiciosBody.appendChild(tr);
  });

  document.querySelectorAll('.btn-editar').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      editarServicio(id);
    })
  );

  document.querySelectorAll('.btn-eliminar').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      eliminarServicio(id);
    })
  );
}

function editarServicio(id) {
  const servicio = servicios.find(s => s.id === id);
  if (!servicio) return;
  editando = true;
  inputId.value = servicio.id;
  inputNombre.value = servicio.nombre;
  inputDescripcion.value = servicio.descripcion;
  inputPrecio.value = servicio.precio;
  selectEstado.value = servicio.estado;
  formServicio.classList.remove('d-none');
  btnNuevoServicio.classList.add('d-none');
}

function eliminarServicio(id) {
  if (!confirm('¿Seguro que quieres eliminar este servicio?')) return;
  servicios = servicios.filter(s => s.id !== id);
  guardarServicios();
  renderizarTabla();
}

function guardarServicios() {
  localStorage.setItem('servicios', JSON.stringify(servicios));
}

function limpiarFormulario() {
  inputId.value = '';
  inputNombre.value = '';
  inputDescripcion.value = '';
  inputPrecio.value = '';
  selectEstado.value = 'Disponible';
}

formServicio.addEventListener('submit', e => {
  e.preventDefault();

  const id = inputId.value ? parseInt(inputId.value) : Date.now();
  const nombre = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const precio = parseFloat(inputPrecio.value);
  const estado = selectEstado.value;

  if (!nombre || !descripcion || isNaN(precio)) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  if (editando) {
    const index = servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      servicios[index] = { id, nombre, descripcion, precio, estado };
    }
  } else {
    servicios.push({ id, nombre, descripcion, precio, estado });
  }

  guardarServicios();
  renderizarTabla();
  limpiarFormulario();
  formServicio.classList.add('d-none');
  btnNuevoServicio.classList.remove('d-none');
  editando = false;
});

btnNuevoServicio.addEventListener('click', e => {
  e.preventDefault();
  limpiarFormulario();
  formServicio.classList.remove('d-none');
  btnNuevoServicio.classList.add('d-none');
  editando = false;
});

btnCancelar.addEventListener('click', e => {
  e.preventDefault();
  limpiarFormulario();
  formServicio.classList.add('d-none');
  btnNuevoServicio.classList.remove('d-none');
  editando = false;
});

window.addEventListener('load', cargarServicios);
