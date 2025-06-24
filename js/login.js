const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const submitBtn = form.querySelector('button[type="submit"]');

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('d-none');
}

function hideError() {
  errorMsg.classList.add('d-none');
  errorMsg.textContent = '';
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? 'Cargando...' : 'Entrar';
}

form.username.addEventListener('input', hideError);
form.password.addEventListener('input', hideError);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  setLoading(true);

  const username = form.username.value.trim();
  const password = form.password.value.trim();

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    sessionStorage.setItem('accessToken', data.token);
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));

    window.location.href = 'admin.html';
  } catch (error) {
    showError(error.message || 'Error de red, intenta más tarde.');
  } finally {
    setLoading(false);
  }
});
