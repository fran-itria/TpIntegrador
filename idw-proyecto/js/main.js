document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('modoOscuroToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('nav ul');
  const body = document.body;

  // Función para aplicar modo oscuro
  const aplicarModoOscuro = (activar) => {
    body.classList.toggle('dark-mode', activar);

    if (toggle) {
      toggle.classList.toggle('activo', activar);
      toggle.textContent = activar ? '☀️' : '🌙';

      // Añade animación
      toggle.classList.add('girando');
      setTimeout(() => {
        toggle.classList.remove('girando');
      }, 400); // debe coincidir con el tiempo del CSS
    }

    localStorage.setItem('modoOscuro', activar);
  };

  // Cargar estado guardado del modo oscuro
  const modoOscuroGuardado = localStorage.getItem('modoOscuro') === 'true';
  aplicarModoOscuro(modoOscuroGuardado);

  // Manejador del botón de modo oscuro
  toggle?.addEventListener('click', () => {
    const nuevoEstado = !body.classList.contains('dark-mode');
    aplicarModoOscuro(nuevoEstado);
  });

  // Manejador del menú hamburguesa
  menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('mostrar');
    menuToggle.classList.toggle('abierto');
  });
});
