import { obtenerSalones, inicializarLocalStorage } from './app.js';

inicializarLocalStorage();

const tablaBody = document.getElementById('tablaSalonesBody');
const form = document.getElementById('formSalon');
const btnCancelar = document.getElementById('btnCancelar');

let salones = obtenerSalones();
let editando = false; // Para saber si estamos editando o creando

function mostrarSalones() {
  tablaBody.innerHTML = '';
  salones.forEach(salon => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.descripcion}</td>
      <td>${salon.direccion}</td>
      <td>${salon.valor}</td>
      <td>${salon.estado}</td>
      <td>${salon.imagen}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar" data-id="${salon.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${salon.id}">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });

  // Agregar event listeners para botones editar y eliminar
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      cargarFormulario(id);
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      eliminarSalon(id);
    });
  });
}

function cargarFormulario(id) {
  const salon = salones.find(s => s.id === id);
  if (!salon) return;

  editando = true;
  document.getElementById('salonId').value = salon.id;
  document.getElementById('nombre').value = salon.nombre;
  document.getElementById('descripcion').value = salon.descripcion;
  document.getElementById('direccion').value = salon.direccion;
  document.getElementById('valor').value = salon.valor;
  document.getElementById('estado').value = salon.estado;
  document.getElementById('imagen').value = salon.imagen;
}

function eliminarSalon(id) {
  if (confirm('¿Estás seguro de eliminar este salón?')) {
    salones = salones.filter(s => s.id !== id);
    localStorage.setItem('salones', JSON.stringify(salones));
    mostrarSalones();
  }
}

// Manejar el submit del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('salonId').value);
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const valor = Number(document.getElementById('valor').value);
  const estado = document.getElementById('estado').value;
  const imagen = document.getElementById('imagen').value.trim();

  if (!nombre || !descripcion || !direccion || !valor || !imagen) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  if (editando) {
    // Modificar salón existente
    const index = salones.findIndex(s => s.id === id);
    if (index !== -1) {
      salones[index] = { id, nombre, descripcion, direccion, valor, estado, imagen };
    }
  } else {
    // Crear nuevo salón
    const nuevoId = salones.length > 0 ? Math.max(...salones.map(s => s.id)) + 1 : 1;
    salones.push({ id: nuevoId, nombre, descripcion, direccion, valor, estado, imagen });
  }

  localStorage.setItem('salones', JSON.stringify(salones));
  mostrarSalones();
  form.reset();
  editando = false;
  document.getElementById('salonId').value = '';
});

// Botón cancelar
btnCancelar.addEventListener('click', () => {
  form.reset();
  editando = false;
  document.getElementById('salonId').value = '';
});

// Mostrar los salones al cargar la página
mostrarSalones();
