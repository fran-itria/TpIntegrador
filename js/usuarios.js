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
    const {firstName, lastName, username, email, gender, company} = user
    tr.innerHTML = `
      <td>${firstName} ${lastName}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${gender || '—'}</td>
      <td>${company?.name || '—'}</td>
      <td>${company?.title || '—'}</td>
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

const button = document.getElementById('btnBack');
button.addEventListener('click', () => {
  window.location.href = 'admin.html';
});
