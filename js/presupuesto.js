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
  { id: 6, nombre: "Seguridad", descripcion: "Personal de seguridad durante el evento", precio: 12000, estado: "Disponible" }
];

const salonSelect = document.getElementById("salonSelect");
const checkboxServicios = document.getElementById("checkboxServicios");
const resultado = document.getElementById("resultadoPresupuesto");
const btnIrContacto = document.getElementById("btnIrContacto");
const nombreSpan = document.getElementById("nombreSalon");


function obtenerParametroId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

const idSalonUrl = obtenerParametroId();


const opcionVacia = document.createElement("option");
opcionVacia.value = "";
opcionVacia.textContent = "-- Seleccionar salón --";
salonSelect.appendChild(opcionVacia);


salones.forEach(salon => {
  const option = document.createElement("option");
  option.value = salon.id;
  option.textContent =`${salon.nombre} - $${salon.valor}`;
  salonSelect.appendChild(option);
});


if (!isNaN(idSalonUrl)) {
  salonSelect.value = idSalonUrl;
  const salonSeleccionado = salones.find(s => s.id === idSalonUrl);
  if (salonSeleccionado) {
    nombreSpan.textContent = salonSeleccionado.nombre;
  } else {
    nombreSpan.textContent = "Seleccionar salón";
  }
} else {
  nombreSpan.textContent = "Seleccionar salón";
}


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
  if (!salonId) {
    alert("Por favor, seleccioná un salón.");
    return;
  }

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

  const presupuestosGuardados = JSON.parse(localStorage.getItem("presupuestos")) || [];
  presupuestosGuardados.push(nuevoPresupuesto);
  localStorage.setItem("presupuestos", JSON.stringify(presupuestosGuardados));

  btnIrContacto.classList.remove("d-none");

  btnIrContacto.replaceWith(btnIrContacto.cloneNode(true));
  const nuevoBtnIrContacto = document.getElementById("btnIrContacto");

  nuevoBtnIrContacto.addEventListener("click", () => {
    window.location.href = "contacto.html";
  });
});
