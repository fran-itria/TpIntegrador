export const salonesIniciales = [
  {
    id: 1,
    nombre: "Salón Arcoiris",
    descripcion: "Ubicado en el centro. Capacidad para 50 niños.",
    direccion: "Av. Central 123, Ciudad Eventos",
    capacidad: 500,
    valor: 50000,
    estado: "Disponible",
    imagen: "salonrainbow"
  },
  {
    id: 2,
    nombre: "Salón Gamer",
    descripcion: "Juegos electrónicos, arcade, lasers, y luces gamer.",
    direccion: "Av. PlayerOne 456, Ciudad Games",
    capacidad: 100,
    valor: 120000,
    estado: "Disponible",
    imagen: "salongamer"
  },
  {
    id: 3,
    nombre: "Salón al Aire Libre",
    descripcion: "Con juegos inflables y animadores.",
    direccion: "Calle de la Elegancia, Sector Empresarial",
    capacidad: 300,
    valor: 150000,
    estado: "Disponible",
    imagen: "salonoutdoor"
  }
];

export const serviciosIniciales = [
  { id: 1, nombre: "Catering", descripcion: "Servicio de alimentos y bebidas", precio: 20000, estado: "Disponible" },
  { id: 2, nombre: "Decoración", descripcion: "Decoración temática y ambientación", precio: 15000, estado: "Disponible" },
  { id: 3, nombre: "Sonido e Iluminación", descripcion: "Equipos de sonido y luces profesionales", precio: 25000, estado: "Disponible" },
  { id: 4, nombre: "Animadores", descripcion: "Animadores y entretenimiento para eventos", precio: 18000, estado: "Disponible" },
  { id: 5, nombre: "Limpieza", descripcion: "Servicio de limpieza antes y después del evento", precio: 8000, estado: "Disponible" },
  { id: 6, nombre: "Seguridad", descripcion: "Personal de seguridad durante el evento", precio: 12000, estado: "Disponible" },
];

export function inicializarLocalStorage() {
  if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesIniciales));
  }
  if (!localStorage.getItem("servicios")) {
    localStorage.setItem("servicios", JSON.stringify(serviciosIniciales));
  }
}

export function obtenerSalones() {
  try {
    const salonesStr = localStorage.getItem("salones");
    return salonesStr ? JSON.parse(salonesStr) : [];
  } catch (error) {
    console.error("Error al leer salones de LocalStorage:", error);
    return [];
  }
}

export function obtenerSalonPorId(id) {
  if (typeof id !== "number") return null;
  const salones = obtenerSalones();
  return salones.find(salon => salon.id === id) || null;
}

export function mostrarCatalogoSalones() {
  const contenedor = document.getElementById("catalogoSalones");
  if (!contenedor) return;

  const salones = obtenerSalones();

  contenedor.innerHTML = "";

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

export function eliminarSalonPorId(id) {
  if (typeof id !== "number") {
    alert("ID inválido.");
    return false;
  }

  if ([1, 2, 3].includes(id)) {
    alert("No se puede eliminar este salón base.");
    return false;
  }

  let salones = obtenerSalones();
  const nuevoListado = salones.filter(salon => salon.id !== id);

  if (nuevoListado.length === salones.length) {
    alert("No se encontró el salón a eliminar.");
    return false;
  }

  localStorage.setItem('salones', JSON.stringify(nuevoListado));
  return true;
}

export function guardarSalon(salonEditado) {
  if (!salonEditado || typeof salonEditado.id !== "number") {
    console.error('Datos inválidos para actualizar el salón.');
    return false;
  }

  let salones = obtenerSalones();
  const index = salones.findIndex(salon => salon.id === salonEditado.id);

  if (index === -1) {
    console.error('No se encontró el salón para actualizar');
    return false;
  }

  salones[index] = salonEditado;
  localStorage.setItem('salones', JSON.stringify(salones));
  return true;
}

export function agregarSalon(salonNuevo) {
  if (!salonNuevo || !salonNuevo.nombre) {
    console.error('Datos inválidos para agregar un salón.');
    return false;
  }

  let salones = obtenerSalones();

  const maxId = salones.reduce((max, s) => (s.id > max ? s.id : max), 0);
  salonNuevo.id = maxId + 1;

  salones.push(salonNuevo);
  localStorage.setItem('salones', JSON.stringify(salones));
  return true;
}


export function obtenerServicios() {
  try {
    const serviciosStr = localStorage.getItem("servicios");
    return serviciosStr ? JSON.parse(serviciosStr) : [];
  } catch (error) {
    console.error("Error al leer servicios de LocalStorage:", error);
    return [];
  }
}

export function obtenerServicioPorId(id) {
  if (typeof id !== "number") return null;
  const servicios = obtenerServicios();
  return servicios.find(servicio => servicio.id === id) || null;
}

export function agregarServicio(servicioNuevo) {
  if (!servicioNuevo || !servicioNuevo.nombre) {
    console.error('Datos inválidos para agregar un servicio.');
    return false;
  }

  let servicios = obtenerServicios();

  const maxId = servicios.reduce((max, s) => (s.id > max ? s.id : max), 0);
  servicioNuevo.id = maxId + 1;

  servicios.push(servicioNuevo);
  localStorage.setItem('servicios', JSON.stringify(servicios));
  return true;
}

export function guardarServicio(servicioEditado) {
  if (!servicioEditado || typeof servicioEditado.id !== "number") {
    console.error('Datos inválidos para actualizar el servicio.');
    return false;
  }

  let servicios = obtenerServicios();
  const index = servicios.findIndex(servicio => servicio.id === servicioEditado.id);

  if (index === -1) {
    console.error('No se encontró el servicio para actualizar');
    return false;
  }

  servicios[index] = servicioEditado;
  localStorage.setItem('servicios', JSON.stringify(servicios));
  return true;
}

export function eliminarServicioPorId(id) {
  if (typeof id !== "number") {
    alert("ID inválido.");
    return false;
  }

  let servicios = obtenerServicios();
  const nuevoListado = servicios.filter(servicio => servicio.id !== id);

  if (nuevoListado.length === servicios.length) {
    alert("No se encontró el servicio a eliminar.");
    return false;
  }

  localStorage.setItem('servicios', JSON.stringify(nuevoListado));
  return true;
}
