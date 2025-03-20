function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    if (title && description) {
        const task = { title, description };

        addTaskToTable(task);
        addTaskToCards(task);

        document.getElementById('taskForm').reset();
    }
}

function addTaskToTable(task) {
    const tableBody = document.querySelector('#taskTable tbody');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editTask(event)">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(event)">Excluir</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function addTaskToCards(task) {
    const taskCardsContainer = document.getElementById('taskCards');

    const card = document.createElement('div');
    card.classList.add('col-md-4', 'task-card');
    card.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <button class="btn btn-warning btn-sm" onclick="editTask(event)">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(event)">Excluir</button>
            </div>
        </div>
    `;
    taskCardsContainer.appendChild(card);
}

function editTask(event) {
    const taskRow = event.target.closest('tr') || event.target.closest('.card');
    const title = taskRow.querySelector('.card-title') || taskRow.cells[0];
    const description = taskRow.querySelector('.card-text') || taskRow.cells[1];

    const newTitle = prompt('Editar título da tarefa:', title.textContent);
    const newDescription = prompt('Editar descrição da tarefa:', description.textContent);

    if (newTitle && newDescription) {
        title.textContent = newTitle;
        description.textContent = newDescription;

        if (taskRow.querySelector('td')) {
            taskRow.cells[0].textContent = newTitle;
            taskRow.cells[1].textContent = newDescription;
        }
    }
}

function deleteTask(event) {
    const taskRow = event.target.closest('tr') || event.target.closest('.card');
    taskRow.remove();
}

document.getElementById('taskForm').addEventListener('submit', addTask);
