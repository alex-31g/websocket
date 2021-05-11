// ws - пакет для работы с сокетами
const ws = require('ws');

// Создаем сервер, который будет работать по WebSocket протоколу 
const wss = new ws.Server({ 
	port: 3000
}, () => console.log(`Server started on 3000`));

// Подписываемся на событие 'connection' - срабатывает, когда клиент подключится к серверу.
// Второй параметр - коллбек-функция, которая отработает на данное событие 
wss.on('connection', ws => {

	// send - отправляет сообщение клиенту
	ws.send('Welcome to chat');    

	// message - сработает при получении сообщения от клиента,
	// которое было отправленно методом send()
	ws.on('message', message => {
		message = message;

		// Если клиент отправил строку 'exit'
    if (message === 'exit') {
			// close() - закрыть соединение с клиентом; остальные клиенты по прежнему остаются подключены
      ws.close();
    } else {
			broadcastMessage(message);
    }
  });

});

// Рассылка сообщений все клиентам
function broadcastMessage(message) {
	// wss.clients - содержит массив клиентов
	wss.clients.forEach(client => {
		// readyState - состояние соединения
		if (client.readyState === ws.OPEN) {
			// send() - передача данных клиенту
			client.send(message); 
		}
	});
}

/*
Состояние соединения
====================
Чтобы получить состояние соединения, существует свойство readyState со значениями:
0 – «CONNECTING»: соединение ещё не установлено,
1 – «OPEN»: обмен данными,
2 – «CLOSING»: соединение закрывается,
3 – «CLOSED»: соединение закрыто.
*/

// Приватные комнаты в чате (24:03):
// https://www.youtube.com/watch?v=o43iiH4kGqg