const socket = io()

let uname
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let a = document.querySelector('h2')
do {
    uname = prompt("Enter your name...")
} while (!uname);
a.innerText = uname

textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: uname,
        message: message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to Server
    socket.emit('sandesh', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}   

// Receive Messages

socket.on('sandesh', (msg)=>{
    // console.log(msg)
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}