document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.getElementById('addButton');
    const addInput = document.getElementById('addlist');
    const itemList = document.getElementById('itemList');

    // Load existing tasks from local storage
    loadTasksFromLocalStorage();

    addButton.addEventListener('click', addItem);

    function addItem() {
        const itemText = addInput.value.trim();
        
        if (itemText !== "") {
            const listItem = createListItem(itemText);
            itemList.appendChild(listItem);

            // Clear the input
            addInput.value = '';

            // Update body list background
            toggleBodyListBackground();

            // Save tasks to local storage
            saveTasksToLocalStorage();
        }
    }

    function createListItem(text, isCompleted = false) {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const itemSpan = document.createElement('span');
        itemSpan.textContent = text;
        
        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = isCompleted ? 'Undo' : 'Complete';
        completeButton.className = 'complete-button';
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            if (listItem.classList.contains('completed')) {
                completeButton.textContent = 'Undo';
            } else {
                completeButton.textContent = 'Complete';
            }
            // Save tasks to local storage
            saveTasksToLocalStorage();
        });

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => {
            const newText = prompt("Edit your item:", itemSpan.textContent);
            if (newText !== null) {
                itemSpan.textContent = newText.trim();
                // Save tasks to local storage
                saveTasksToLocalStorage();
            }
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            itemList.removeChild(listItem);
            toggleBodyListBackground();
            // Save tasks to local storage
            saveTasksToLocalStorage();
        });

        listItem.appendChild(itemSpan);
        listItem.appendChild(completeButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function toggleBodyListBackground() {
        if (itemList.children.length > 0) {
            itemList.classList.add('has-items');
        } else {
            itemList.classList.remove('has-items');
        }
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        itemList.querySelectorAll('.list-item').forEach(item => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const listItem = createListItem(task.text, task.completed);
                itemList.appendChild(listItem);
            });
            toggleBodyListBackground();
        }
    }
});
