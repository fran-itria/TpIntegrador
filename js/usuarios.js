const USERS_API = 'https://dummyjson.com/users';

async function fetchUsers() {
  try {
    const res = await fetch(USERS_API);
    if (!res.ok) throw new Error('Error al cargar usuarios');
    const { users } = await res.json();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function renderUserTable(users) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.gender || '—'}</td>
      <td>${user.company?.name || '—'}</td>
      <td>${user.company?.title || '—'}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function fetchAndRender() {
  const apiUsers = await fetchUsers();
  renderUserTable(apiUsers);
}

function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;

  toastContainer.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
  bsToast.show();

  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRender();
});
