let salones = JSON.parse(localStorage.getItem("salones")) || [
  { id: 1, nombre: "Salón Arcoiris",
    descripcion: "Ubicado en el centro. Capacidad para 50 niños.",
    direccion: "Av. Central 123, Ciudad Eventos",
    capacidad: 500,
    valor: 50000,
    estado: "Disponible",
    imagen: "salonrainbow"},
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

let servicios = JSON.parse(localStorage.getItem("servicios")) || [
  { id: 1, nombre: "Catering", descripcion: "Servicio de alimentos y bebidas", precio: 20000, estado: "Disponible" },
  { id: 2, nombre: "Decoración", descripcion: "Decoración temática y ambientación", precio: 15000, estado: "Disponible" },
  { id: 3, nombre: "Sonido e Iluminación", descripcion: "Equipos de sonido y luces profesionales", precio: 25000, estado: "Disponible" },
  { id: 4, nombre: "Animadores", descripcion: "Animadores y entretenimiento para eventos", precio: 18000, estado: "Disponible" },
  { id: 5, nombre: "Limpieza", descripcion: "Servicio de limpieza antes y después del evento", precio: 8000, estado: "Disponible" },
  { id: 6, nombre: "Seguridad", descripcion: "Personal de seguridad durante el evento", precio: 12000, estado: "Disponible" },

];

const salonSelect = document.getElementById("salonSelect");
const checkboxServicios = document.getElementById("checkboxServicios");
const resultado = document.getElementById("resultadoPresupuesto");


const opcionVacia = document.createElement("option");
opcionVacia.value = "";
opcionVacia.textContent = "-- Seleccionar salón --";
salonSelect.appendChild(opcionVacia);


salones.forEach(salon => {
  const option = document.createElement("option");
  option.value = salon.id;
  option.textContent =`${salon.nombre}- $${salon.valor}`;
  salonSelect.appendChild(option);
});


servicios.forEach(servicio => {
  const div = document.createElement("div");
  div.className = "form-check";
  div.innerHTML = `
    <input class="form-check-input" type="checkbox" id="servicio-${servicio.id}" value="${servicio.id}">
    <label class="form-check-label" for="servicio-${servicio.id}">
      ${servicio.nombre} - $${servicio.precio} 
    </label>
  `;
  checkboxServicios.appendChild(div);
});


document.getElementById("formPresupuesto").addEventListener("submit", function (e) {
  e.preventDefault();
  const salonId = parseInt(salonSelect.value);
  const serviciosSeleccionados = [...document.querySelectorAll('#checkboxServicios input:checked')];

  const salon = salones.find(s => s.id === salonId);
  let total = salon.valor;

  const detallesServicios = [];

  serviciosSeleccionados.forEach(chk => {
    const servicio = servicios.find(s => s.id == chk.value);
    let subtotal = servicio.precio;

    total += subtotal;
    detallesServicios.push(`${servicio.nombre}: $${subtotal}`);
  });



  resultado.classList.remove("d-none");
  resultado.innerHTML = `
    <strong>Presupuesto generado</strong><br>
    Salón: ${salon.nombre} - $${salon.valor}<br>
    ${detallesServicios.join("<br>")}<br>
    <strong>Total: $${total}</strong>
  `;





  const nuevoPresupuesto = {
    id: Date.now(),
    salon: salon.nombre,
    servicios: detallesServicios,
    total,
    fecha: new Date().toLocaleDateString()
  };


document.getElementById("btnReservar").classList.remove("d-none");

  document.getElementById("btnReservar").addEventListener("click", function () {
  const salonSeleccionado = salonSelect.options[salonSelect.selectedIndex].textContent;
  const serviciosSeleccionados = [...document.querySelectorAll('#checkboxServicios input:checked')];
  
  if (!salonSeleccionado || serviciosSeleccionados.length === 0) {
    alert("Por favor, primero calcule el presupuesto para reservar.");
    return;
  }

  let serviciosTexto = serviciosSeleccionados.map(chk => {
    const servicio = servicios.find(s => s.id == chk.value);
    return servicio.nombre;
  }).join(", ");

  alert(`¡Reserva confirmada!\nSalón: ${salonSeleccionado}\nServicios: ${serviciosTexto} \nTotal: $${total}`);
});

  const presupuestosGuardados = JSON.parse(localStorage.getItem("presupuestos")) || [];
  presupuestosGuardados.push(nuevoPresupuesto);
  localStorage.setItem("presupuestos", JSON.stringify(presupuestosGuardados));
});