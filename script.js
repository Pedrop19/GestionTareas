// Mock de datos de tareas
const tasks = [
    { id: 1, title: 'Hacer compras', status: 'pendiente' },
    { id: 2, title: 'Revisar correo', status: 'completada' },
    // ... más tareas
];

// Función para cargar las tareas en la lista
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const badgeColor = task.status === 'pendiente' ? 'warning' : 'success';
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.setAttribute('data-task-id', task.id);  // Añadir un atributo para identificar la tarea
        listItem.innerHTML = `
            ${task.title}
            <span class="badge bg-${badgeColor}">${task.status}</span>
        `;
        taskList.appendChild(listItem);
    });
}

// Función para mostrar toast
function showToast(message, type) {
    const toastBody = document.getElementById('toastBody');
    toastBody.textContent = message;

    const taskNotification = new bootstrap.Toast(document.getElementById('taskNotification'));
    taskNotification.show();
}

// Evento para agregar una nueva tarea
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskNameInput = document.getElementById('taskName');
    const toastOrAlertSelect = document.getElementById('toastOrAlert');

    const taskName = taskNameInput.value.trim();
    const notificationType = toastOrAlertSelect.value;
    console.log(notificationType);

    if (taskName === '') {
        showToastOrAlert('El nombre de la tarea no puede estar vacío', 'danger');
        return;
    }

    // Simulando la adición de una nueva tarea
    const newTask = { id: tasks.length + 1, title: taskName, status: 'pendiente' };
    tasks.push(newTask);

    // Renderizar las tareas y mostrar la notificación correspondiente
    renderTasks();
    if (notificationType === 'toast') {
        showToast(`Nueva tarea "${taskName}" agregada con éxito`, 'success');
    } else {
        showAlert(`Nueva tarea "${taskName}" agregada con éxito`, 'success');
    }

    // Limpiar el input de nombre de tarea
    taskNameInput.value = '';
});

// Evento para cambiar el estado de una tarea
document.getElementById('taskList').addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'SPAN' && target.classList.contains('badge')) {
        const taskId = parseInt(target.parentNode.getAttribute('data-task-id'), 10);
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            task.status = task.status === 'pendiente' ? 'completada' : 'pendiente';
            renderTasks();
            showToastOrAlert(`Estado de la tarea "${task.title}" actualizado`, 'info');
        }
    }
});

// Función para mostrar toast o alert según el tipo seleccionado
function showToastOrAlert(message, type) {
    const notificationType = document.getElementById('toastOrAlert').value;
    if (notificationType === 'toast') {
        showToast(message, type);
    } else {
        showAlert(message, type);
    }
}

// Función para mostrar alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'mt-3');
    alertDiv.textContent = message;

    const container = document.querySelector('.container');
    container.appendChild(alertDiv);

    // Eliminar el alert después de 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Inicializar la lista de tareas al cargar la página
window.onload = function () {
    renderTasks();
};
