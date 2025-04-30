const userInp = document.querySelector('#username');
const loginBtn = document.querySelector('#userBtn');
const chat = document.querySelector('.blockChat .chat');
const messageInp = document.querySelector('#message');
const sendBtn = document.querySelector('#sendMessage');
let conn, user;

loginBtn.addEventListener("click", login);
userInp.addEventListener("keypress", e=>e.key==="Enter"?login.bind(loginBtn)():"");
sendBtn.addEventListener("click", handleMessage);
messageInp.addEventListener("keypress", e=>e.key==="Enter"?handleMessage.bind(sendBtn)():"");

function login()
{
    if(userInp.value && !conn)
    {
        user = userInp.value;
        conn = new WebSocket("ws://172.16.33.134:8080");
        userInp.readOnly = true;
        this.textContent = "Déconnexion";
        this.classList.add("logout");
        messageInp.focus();
        setting();
    }
    else if(conn)
    {
        sendMessage("Server", `${user} est déconnecté(e)!`);
        conn.close();
        conn = undefined;
        this.classList.remove("logout");
        this.textContent = "Connexion";
        userInp.readOnly = false;
    }
}
function setting()
{
    conn.onopen = ()=>{
        onMessage({sender:"Server", message: "Connexion établie!"});
        sendMessage("Server", `${user} est connecté(e)!`);
    };
    conn.onclose = ()=>onMessage({sender:"Server", message:"Déconnecté!"});
    conn.onmessage = e=>onMessage(JSON.parse(e.data));
}
function onMessage(m)
{
    chat.textContent += `${m.sender} : ${m.message}\r\n`;
    chat.scrollTop = chat.scrollHeight;
}
function handleMessage()
{
    if(messageInp.value)
    {
        onMessage({sender:user, message:messageInp.value});
        sendMessage(user, messageInp.value);
        messageInp.value = "";
    }
}
function sendMessage(u,m)
{
    conn.send(JSON.stringify({sender:u, message:m}));
}
