const items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const saved = localStorage.getItem('tasks');
	return saved ? JSON.parse(saved) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	// Удалить
	deleteButton.addEventListener('click', function () {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	// Копировать
	duplicateButton.addEventListener('click', function () {
		const newItem = createItem(textElement.textContent);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	// Редактировать
	editButton.addEventListener('click', function () {
		textElement.contentEditable = true;
		textElement.focus();
	});

	textElement.addEventListener('blur', function () {
		textElement.contentEditable = false;
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(function (element) {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(items) {
	localStorage.setItem('tasks', JSON.stringify(items));
}

// Загрузка задач
const currentTasks = loadTasks();
currentTasks.forEach(function (task) {
	listElement.append(createItem(task));
});

// Добавить задачу
formElement.addEventListener('submit', function (e) {
	e.preventDefault();
	const newTask = inputElement.value.trim();
	if (newTask) {
		const newItem = createItem(newTask);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = '';
	}

});
