//  客户端与服务端连接\
const socket = io.connect('http://localhost:8888');

// 获取元素
var username = document.querySelector('#id-input-username');
var message = document.getElementById('chatContent');
var button = document.querySelector('#id-button-submit');
var already = document.querySelector('.already');
var tips = document.querySelector('.tips');

var tipsUser = [];



button.addEventListener('click', () => {
    console.log('submit');
    // 发送 chat 事件
    socket.emit('chat', {
        username: username.value,
        message: message. value,
    })
    // 将 message 输入框清空
    message.value = '';
})

message.addEventListener('input', () => {
    // 触发 input 事件
    console.log('触发 input 事件');
    socket.emit('userinput', username.value);
})

socket.on('chat', data => {
    // console.log(data);
    tips.innerHTML = '';
    tipsUser = [];
    //  将 data 放进 index.html 中
    already.innerHTML += 
        `<div class="message">
            <label>${data.username}:</label>
            <p>${data.message}</p>
        </div>`
    // 滚动条始终在最下面
    already.scrollTop = already.scrollHeight;
    
})

socket.on('userinput', data => {
    // console.log(data);
    if(tipsUser.length === 0){
        tips.innerHTML = `
            <p>${data}正在输入.......</p>
        `
        tipsUser.push(data);
    }
    if(tipsUser.indexOf(data) === -1){
        tipsUser.push(data);
        tips.innerHTML += `
            <p>${data}也在输入.......</p>
        `
    }
})

socket.on('selfchat', data => {
    tips.innerHTML = '';
    already.innerHTML += 
        `<div class="message self">
            <p>${data.message}</p>
        </div>`
    already.scrollTop = already.scrollHeight;
    
})