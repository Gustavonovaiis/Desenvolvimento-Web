// Funções utilitárias para manipular tarefas no localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            tasks[idx].completed = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
        });

        const span = document.createElement('span');
        span.className = 'task-text' + (task.completed ? ' completed' : '');
        span.textContent = task.text;
        span.contentEditable = false;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => {
            span.contentEditable = true;
            span.focus();
            editBtn.textContent = 'Salvar';
            editBtn.onclick = () => {
                tasks[idx].text = span.textContent;
                saveTasks(tasks);
                renderTasks();
            };
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => {
            tasks.splice(idx, 1);
            saveTasks(tasks);
            renderTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text) {
        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        renderTasks();
        input.value = '';
    }
});

window.onload = renderTasks;
