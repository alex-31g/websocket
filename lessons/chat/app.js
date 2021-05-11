const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// Открываем сокет соединение с сервером;
// параметром передаем адресс сервера с протоколом ws
const ws = new WebSocket('ws://localhost:3000')

function setStatus(value) {
  status.innerHTML = value;
}

function printMessage(value) {
	const li = document.createElement('li');
	li.innerHTML = value;
	messages.appendChild(li);
}

// При отправке формы срабатывает событие submit.
form.addEventListener('submit', e => {
	// При возникновении события submit – браузер по умолчанию 
	// попытается выполнить отправку данных на сервер, что нужно остановить.
	// Для этого воспользуемся preventDefault - отмена стандартного действия браузера
	e.preventDefault();

	// send() - передача данных на сервер
	ws.send(input.value);
	input.value = '';
})

/*
============================
Слушатели событий ws-сервера
============================
*/

// onopen - сработает при открытии соединения с сервером
ws.onopen = (event) => {
	setStatus('ONLINE');
}

// onmessage - сработает при получении сообщения от сервера,
// которое было отправленно методом send()
ws.onmessage = (res) => {
	printMessage(res.data);
}

// onclose - сработает, если сервер закрыл соединение методом close()
ws.onclose = (event) => {
	setStatus('DISCONNECTED');
}

// onerror - сработает при возникновении ошибки
ws.onerror = (event) => {
  console.error("Ошибка WebSocket");

	// close() - закрыть соединение с сервером
  ws.close(); 
}