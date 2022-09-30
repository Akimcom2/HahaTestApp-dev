const express = require('express');
const fs = require('fs');
const path = require('path');
const multer  = require("multer");

// ДЛЯ ЗАПУСКА НА СЕРВЕРЕ

// const credentials = {
//     key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')).toString(),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')).toString()
// }

// const app = express(credentials);

// app.listen(443, '172.26.2.188', () => {
//     console.log('Secure server started.');
// });

// app.listen(80, '172.26.2.188', () => {
//     console.log('https redirect started')
// })

// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// });

// ОБЫЧНЫЙ ЗАПУСК НА ЛОКАЛКЕ

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 80);
var users = fs.readFileSync('users.json');
function WriteJSON(answer) {
    fs.writeFileSync('users.json',[answer.data.mess,answer.data.name].toString());
}
const start = async () =>{
    try {

        app.get('/', (req, res) => {
            res.sendFile(`${__dirname}/public/index.html`);
        });
        app.get('/signin', (req, res) => {
            res.sendFile(`${__dirname}/public/signin.html`);
        });
        app.get('/exchange', (req, res) => {
            res.sendFile(`${__dirname}/public/exchange.html`);
        });
        app.get('/admin', (req, res) => {
            res.sendFile(`${__dirname}/public/admin.html`);
        });
        app.get('/labs', (req, res) => {
            res.sendFile(`${__dirname}/public/labs.html`);
        });
        app.get('/forum', (req, res) => {
            res.sendFile(`${__dirname}/public/forum.html`);

            connections = [];
            io.sockets.on('connection', function(socket) {
                console.log("Успешное соединение");
                // Добавление нового соединения в массив
                connections.push(socket);

                // Функция, которая срабатывает при отключении от сервера
                socket.on('disconnect', function(data) {
                    // Удаления пользователя из массива

                    connections.splice(connections.indexOf(socket), 1);
                    console.log("Отключились");
                });

                // Функция получающая сообщение от какого-либо пользователя
                socket.on('send mess', function(data) {
                    // Внутри функции мы передаем событие 'add mess',
                    // которое будет вызвано у всех пользователей и у них добавится новое сообщение
                    console.log('отправляем');
                    io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
                    var dataJSON=JSON.stringify(data);
                    console.log(dataJSON);

                });

            });
        });
        app.get('/register', (req, res) => {
            res.sendFile(`${__dirname}/public/register.html`);
        });
        app.get('/forget', (req, res) => {
            res.sendFile(`${__dirname}/public/forget_password.html`);
        });
        const storageConfig = multer.diskStorage({
            destination: (req, file, cb) =>{
                cb(null, "uploads");
            },
            filename: (req, file, cb) =>{
                cb(null, file.originalname);
            }
        });
        app.use(multer({storage:storageConfig}).single("filedata"));
        app.post("/upload", function (req, res, next) {

            let filedata = req.file;
            if(!filedata)
                res.send("Ошибка при загрузке файла");
            else
                res.send("Файл загружен");
        });
        app.listen(80, 'localhost',() => console.log(`server started on port 80`))
    } catch (e) {
        console.log(e)
    }
}

////////////////////////////

app.use(express.static('public'));
start()


