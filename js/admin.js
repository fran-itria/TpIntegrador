import { 
  obtenerSalones, 
  inicializarLocalStorage, 
  agregarSalon, 
  guardarSalon, 
  eliminarSalonPorId 
} from './app.js';

inicializarLocalStorage();

const tablaBody = document.getElementById('tablaSalonesBody');
const form = document.getElementById('formSalon');
const btnCancelar = document.getElementById('btnCancelar');

let salones = obtenerSalones();
let editando = false;

function mostrarSalones() {
  tablaBody.innerHTML = '';

  salones.forEach(salon => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.descripcion}</td>
      <td>${salon.direccion}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.valor}</td>
      <td>${salon.estado}</td>
      <td>${salon.imagen}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar mb-2" data-id="${salon.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${salon.id}">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });

  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.onclick = () => cargarFormulario(Number(btn.dataset.id));
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.onclick = () => eliminarSalon(Number(btn.dataset.id));
  });
}

function cargarFormulario(id) {
  const salon = salones.find(s => s.id === id);
  if (!salon) return;

  editando = true;
  form['salonId'].value = salon.id;
  form['nombre'].value = salon.nombre;
  form['descripcion'].value = salon.descripcion;
  form['direccion'].value = salon.direccion;
  form['capacidad'].value = salon.capacidad;
  form['valor'].value = salon.valor;
  form['estado'].value = salon.estado;
  form['imagen'].value = salon.imagen;
}

function eliminarSalon(id) {
  if (confirm('¿Estás seguro de eliminar este salón?')) {
    const eliminado = eliminarSalonPorId(id);
    if (eliminado) {
      salones = obtenerSalones();
      mostrarSalones();
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(form['salonId'].value);
  const nombre = form['nombre'].value.trim();
  const descripcion = form['descripcion'].value.trim();
  const direccion = form['direccion'].value.trim();
  const capacidad = Number(form['capacidad'].value);
  const valor = Number(form['valor'].value);
  const estado = form['estado'].value;
  const imagen = form['imagen'].value;

  if (!nombre || !descripcion || !direccion || !capacidad || !valor || !imagen) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const salonData = { id, nombre, descripcion, direccion, capacidad, valor, estado, imagen };

  if (editando) {
    const actualizado = guardarSalon(salonData);
    if (actualizado) {
      salones = obtenerSalones();
      alert('Salón actualizado correctamente.');
    } else {
      alert('Error al actualizar el salón.');
    }
  } else {
    const agregado = agregarSalon(salonData);
    if (agregado) {
      salones = obtenerSalones();
      alert('Salón agregado correctamente.');
    } else {
      alert('Error al agregar el salón.');
    }
  }

  form.reset();
  form['salonId'].value = '';
  editando = false;
  mostrarSalones();
});

btnCancelar.addEventListener('click', () => {
  form.reset();
  form['salonId'].value = '';
  editando = false;
});

mostrarSalones();
