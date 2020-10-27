const express = require('express');
const path = require('path');
const socket = require('socket.io');

// 示例化 express 对像
const app = express();

// 监听端口号
const server = app.listen(8888, () => console.log('服务器运行在 8888 端口！'));

// 让服务器识别静态文件
app.use('/static', express.static(path.join(__dirname, 'public')));

// 设置路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const io = socket(server);

io.on('connection', ( socket) => {
    console.log('有客户端 socket 连接了', socket.id);
    
    // 获取从客户端发送过来的数据
    // 监听 chat 事件
    socket.on('chat', data => {
        // console.log(data);
        // 通知所有客户端
        socket.broadcast.emit('chat', data);
        // 触发 chat 事件的客户端单独处理
        socket.emit('selfchat', data);
    })
    // 监听 userinput 事件(有用户在输入)
    socket.on('userinput', data => {
        // 向除 emit  userinput 事件之外的 socket 广播事件
        // console.log(data);
        socket.broadcast.emit('userinput', data);
    })
})

