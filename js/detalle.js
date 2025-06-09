if (!sessionStorage.getItem('accessToken')) {
  window.location.href = 'login.html';
}
import { obtenerSalonPorId } from './app.js';

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const contenedor = document.getElementById('detalleSalon');

if (!id) {
  contenedor.innerHTML = `<p class="text-danger">No se especificó el salón.</p>`;
} else {
  const salon = obtenerSalonPorId(id);

  if (!salon) {
    contenedor.innerHTML = `<p class="text-danger">Salón no encontrado.</p>`;
  } else {
    contenedor.innerHTML = `
      <h1 class="text-center">${salon.nombre}</h1>
      <p class="descripcion">${salon.descripcion}</p>

      <div id="carouselSalon" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselSalon" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Imagen 1"></button>
          <button type="button" data-bs-target="#carouselSalon" data-bs-slide-to="1" aria-label="Imagen 2"></button>
          <button type="button" data-bs-target="#carouselSalon" data-bs-slide-to="2" aria-label="Imagen 3"></button>
        </div>

        <div class="carousel-inner rounded-4 shadow-lg">
          <div class="carousel-item active">
            <img src="assets/images/${salon.imagen}-1.png" class="d-block w-100" alt="${salon.nombre} imagen 1" />
          </div>
          <div class="carousel-item">
            <img src="assets/images/${salon.imagen}-2.png" class="d-block w-100" alt="${salon.nombre} imagen 2" />
          </div>
          <div class="carousel-item">
            <img src="assets/images/${salon.imagen}-3.png" class="d-block w-100" alt="${salon.nombre} imagen 3" />
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselSalon" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselSalon" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>

      <ul class="list-group my-4">
        <li class="list-group-item"><strong>Dirección:</strong> ${salon.direccion}</li>
        <li class="list-group-item"><strong>Capacidad / Descripción:</strong> ${salon.descripcion}</li>
        <li class="list-group-item"><strong>Valor:</strong> $${salon.valor.toLocaleString()}</li>
        <li class="list-group-item"><strong>Estado:</strong> ${salon.estado}</li>
      </ul>
    `;
  }
}
