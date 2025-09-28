
let token = '';
let userId = '';

function register() {
  fetch('/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }).then(res => res.json()).then(data => alert('Registrado'));
}

function login() {
  fetch('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }).then(res => res.json()).then(data => {
    token = data.token;
    userId = data.userId;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('tasks').style.display = 'block';
    loadTasks();
  });
}

function createTask() {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: userId,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value
    })
  }).then(res => res.json()).then(data => loadTasks());
}

function loadTasks() {
  fetch(`/tasks/${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(res => res.json()).then(data => {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    data.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title} - ${task.status}`;
      const btn = document.createElement('button');
      btn.textContent = 'Avanzar estado';
      btn.onclick = () => updateStatus(task.id);
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

function updateStatus(id) {
  fetch(`/tasks/${id}/status`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(res => res.json()).then(data => loadTasks());
}
