// Base de datos inicial
export const salonesIniciales = [
  {
    id: 1,
    nombre: "Salón Arcoiris",
    descripcion: "Ubicado en el centro. Capacidad para 50 niños.",
    direccion: "Av. Central 123, Ciudad Eventos",
    valor: 50000,
    estado: "Disponible",
    imagen: "salonrainbow"
  },
  {
    id: 2,
    nombre: "Salón Gamer",
    descripcion: "Juegos electrónicos, arcade, lasers, y luces gamer.",
    direccion: "Av. PlayerOne 456, Ciudad Games",
    valor: 120000,
    estado: "Disponible",
    imagen: "salongamer"
  },
  {
    id: 3,
    nombre: "Salón al Aire Libre",
    descripcion: "Con juegos inflables y animadores.",
    direccion: "Calle de la Elegancia, Sector Empresarial",
    valor: 150000,
    estado: "Disponible",
    imagen: "salonoutdoor"
  }
];

// Inicializar LocalStorage si está vacío
export function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesIniciales));
  }
}

// Obtener todos los salones
export function obtenerSalones() {
  return JSON.parse(localStorage.getItem("salones")) || [];
}

// Obtener un salón por ID
export function obtenerSalonPorId(id) {
  const salones = obtenerSalones();
  return salones.find(salon => salon.id === id);
}

// Mostrar catálogo en index.html
export function mostrarCatalogoSalones() {
  const contenedor = document.getElementById("catalogoSalones");
  if (!contenedor) return;

  const salones = obtenerSalones();

  contenedor.innerHTML = ""; // Limpiar contenido

  salones.forEach(salon => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col";

    tarjeta.innerHTML = `
      <a href="detalle.html?id=${salon.id}" class="text-decoration-none text-dark">
        <div class="card h-100 shadow">
          <img src="assets/images/${salon.imagen}-main.png" class="card-img-top" alt="${salon.nombre}">
          <div class="card-body">
            <h3 class="card-title">${salon.nombre}</h3>
            <p class="card-text">${salon.descripcion}</p>
          </div>
        </div>
      </a>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// Eliminar salón por ID (no permite eliminar los salones base con id 1,2,3)
export function eliminarSalonPorId(id) {
  if ([1, 2, 3].includes(id)) {
    alert("No se puede eliminar este salón base.");
    return;
  }

  let salones = obtenerSalones();
  salones = salones.filter(salon => salon.id !== id);
  localStorage.setItem('salones', JSON.stringify(salones));
}

// Guardar salón editado
export function guardarSalon(salonEditado) {
  let salones = obtenerSalones();
  const index = salones.findIndex(salon => salon.id === salonEditado.id);

  if (index !== -1) {
    salones[index] = salonEditado;
    localStorage.setItem('salones', JSON.stringify(salones));
  } else {
    console.error('No se encontró el salón para actualizar');
  }
}

// Agregar un nuevo salón
export function agregarSalon(salonNuevo) {
  let salones = obtenerSalones();

  // Generar un id único basado en el máximo existente + 1
  const maxId = salones.reduce((max, s) => (s.id > max ? s.id : max), 0);
  salonNuevo.id = maxId + 1;

  salones.push(salonNuevo);
  localStorage.setItem('salones', JSON.stringify(salones));
}
