## WebSocket

**WebSocket** - протокол, который позволяет открыть постоянное двунаправленное асинхронное сетевое соединение между клиентом и сервером.   
Данные передаются в обоих направлениях в виде «фреймов», без разрыва соединения и дополнительных HTTP-запросов.    
С помощью сокетов можно отправлять/получать как строки, так и бинарные данные.

При работе с сокетами мы будем использовать npm-пакет **ws** (https://www.npmjs.com/package/ws).

## Создание чата 

Инициализируем проект, указав опцию main="server.js":   
`npm init`   

Устанавливаем **ws** (https://www.npmjs.com/package/ws) - пакет для работы с сокетами:   
`npm i --save ws`

Устанавливаем **http-server** (https://www.npmjs.com/package/http-server) - пакет запуска http-сервера для клиента:  
`npm i --save-dev http-server`

Отличие npm i --save-dev от --save:
- `-S`, `--save`: пакет будет отображается в package.json в разделе dependencies (начиная с версии npm 6.5 можно не указывать `-S` или `--save`)
- `-D`, `--save-dev`: пакет будет отображается в package.json в разделе devDependencies

В `package.json` добавим комманду для запуска сервера в режиме разработки и запуска клиента с помощью http-server:
```json
"scripts": {
	"dev": "nodemon server.js",
	"client": "http-server"
},
```

Серверный код: server.js   
Клиентский код: app.js

Комманды для запуска приложения:
- сервер: `npm run dev`         
- клиент (http://localhost:8080/): `npm run client`
