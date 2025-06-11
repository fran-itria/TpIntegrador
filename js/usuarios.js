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
    const isLocal = user.local === true;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role || '—'}</td>
      <td>
        ${isLocal
          ? `
            <button class="btn btn-sm btn-warning btn-edit" data-id="${user.id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-delete" data-id="${user.id}">Eliminar</button>
          `
          : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function getLocalUsers() {
  let users = JSON.parse(localStorage.getItem('localUsers')) || [];

  let updated = false;
  users = users.map(user => {
    if (user.local !== true) {
      updated = true;
      return { ...user, local: true };
    }
    return user;
  });

  if (updated) {
    localStorage.setItem('localUsers', JSON.stringify(users));
  }

  return users;
}

function saveLocalUser(user) {
  const localUsers = getLocalUsers();
  localUsers.push(user);
  localStorage.setItem('localUsers', JSON.stringify(localUsers));
}

function updateLocalUser(updatedUser) {
  let localUsers = getLocalUsers();
  localUsers = localUsers.map(user => (user.id === updatedUser.id ? updatedUser : user));
  localStorage.setItem('localUsers', JSON.stringify(localUsers));
}

function deleteLocalUser(id) {
  let localUsers = getLocalUsers();
  localUsers = localUsers.filter(user => user.id !== id);
  localStorage.setItem('localUsers', JSON.stringify(localUsers));
}

function renderAllUsers(apiUsers) {
  const localUsers = getLocalUsers();
  const combinedUsers = [...apiUsers, ...localUsers];
  renderUserTable(combinedUsers);
}

async function fetchAndRender() {
  const apiUsers = await fetchUsers();
  renderAllUsers(apiUsers);
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

  const userModalEl = document.getElementById('userModal');
  const userModal = new bootstrap.Modal(userModalEl);
  const form = document.getElementById('userForm');
  const btnSubmit = document.getElementById('modalSubmitBtn');
  const btnNewUser = document.getElementById('btnNewUser');

  let editUserId = null;

  btnNewUser.addEventListener('click', () => {
    editUserId = null;
    form.reset();
    btnSubmit.textContent = 'Crear usuario';
    userModal.show();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const user = {
      id: editUserId || Date.now(),
      firstName: document.getElementById('modalFirstName').value.trim(),
      lastName: document.getElementById('modalLastName').value.trim(),
      username: document.getElementById('modalUsername').value.trim(),
      email: document.getElementById('modalEmail').value.trim(),
      role: document.getElementById('modalRole').value,
      local: true // clave para poder editar/eliminar luego
    };

    if (editUserId) {
      updateLocalUser(user);
      showToast('Usuario actualizado correctamente', 'info');
    } else {
      saveLocalUser(user);
      showToast('Usuario creado correctamente', 'success');
    }

    fetchAndRender();
    userModal.hide();
  });

  document.querySelector('#usersTable tbody').addEventListener('click', e => {
    if (e.target.classList.contains('btn-edit')) {
      const id = Number(e.target.dataset.id);
      const localUsers = getLocalUsers();
      const userToEdit = localUsers.find(user => user.id === id);
      if (userToEdit) {
        document.getElementById('modalFirstName').value = userToEdit.firstName;
        document.getElementById('modalLastName').value = userToEdit.lastName;
        document.getElementById('modalUsername').value = userToEdit.username;
        document.getElementById('modalEmail').value = userToEdit.email;
        document.getElementById('modalRole').value = userToEdit.role;
        editUserId = id;
        btnSubmit.textContent = 'Actualizar usuario';
        userModal.show();
      }
    } else if (e.target.classList.contains('btn-delete')) {
      const btnDelete = e.target;
      btnDelete.disabled = true;
      const id = Number(btnDelete.dataset.id);
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        deleteLocalUser(id);
        showToast('Usuario eliminado correctamente', 'danger');
        fetchAndRender();
      }
      btnDelete.disabled = false;
    }
  });
});

const button = document.getElementById('btnBack');
button.addEventListener('click', () => {
  window.location.href = 'admin.html';
});
