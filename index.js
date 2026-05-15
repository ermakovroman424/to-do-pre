const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const itemTemplate = document.querySelector('#to-do__item-template');

const defaultItems = [
	'Купить продукты',
	'Сделать домашнее задание',
	'Позвонить маме',
	'Прочитать книгу',
	'Сходить на тренировку',
	'Подготовиться к собеседованию',
];

let items = [];

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');

	if (savedTasks) {
		return JSON.parse(savedTasks);
	}

	return defaultItems;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];

	itemsNamesElements.forEach((element) => {
		tasks.push(element.textContent);
	});

	return tasks;
}

function createItem(item) {
	const clone = itemTemplate.content.firstElementChild.cloneNode(true);

	const textElement = clone.querySelector('.to-do__item-text');
	const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
	const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
	const editButton = clone.querySelector('.to-do__item-button_type_edit');

	textElement.textContent = item;

	deleteButton.addEventListener('click', () => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);

		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');
		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

items = loadTasks();

items.forEach((item) => {
	const taskElement = createItem(item);
	listElement.append(taskElement);
});

formElement.addEventListener('submit', (event) => {
	event.preventDefault();

	const itemName = inputElement.value.trim();

	if (!itemName) {
		return;
	}

	const newItem = createItem(itemName);
	listElement.prepend(newItem);

	inputElement.value = '';

	items = getTasksFromDOM();
	saveTasks(items);
});
