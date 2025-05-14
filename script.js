const taskInput= document.getElementById('taskInput');
const addTaskButton= document.getElementById('addTaskButton');
const taskList= document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function renderTasks(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {

        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';
        checkbox.checked = task.completed;

        const span = document.createElement('span');
        span.innerText = task.text;
        if (task.completed){
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
        }

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

       const deletebtn = document.createElement('button');
        deletebtn.className = "delete-btn";
        deletebtn.innerText = 'Delete';

        deletebtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deletebtn);
        taskList.appendChild(li);
    });
}

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
});

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

renderTasks();