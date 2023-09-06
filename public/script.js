document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chatContainer");
    const chat = document.getElementById("chat");
    const nameInput = document.getElementById("nameInput");
    const enterChat = document.getElementById("enterChat");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");

    const socket = new WebSocket("ws://10.0.23.27:8080"); // Use o endereço IP local correto
    let userName = "";

    socket.onopen = function () {
        console.log("Conectado ao servidor WebSocket");
    };

    socket.onmessage = function (event) {
        const message = event.data;
        appendMessage(message, "other-user-message");
    };

    enterChat.addEventListener("click", function () {
        userName = nameInput.value.trim();

        if (userName !== "") {
            nameInput.disabled = true;
            enterChat.disabled = true;
            messageInput.disabled = false;
            sendMessage.disabled = false;
        }
    });

    sendMessage.addEventListener("click", function () {
        const message = messageInput.value.trim();

        if (message !== "") {
            appendMessage(userName + ": " + message, "user-message");
            socket.send(userName + ": " + message);
            messageInput.value = "";

            // Adicione uma quebra de linha após a mensagem enviada
            const lineBreak = document.createElement("br");
            chat.appendChild(lineBreak);
            chat.scrollTop = chat.scrollHeight;
        }
    });

    chat.addEventListener("click", function (event) {
        const target = event.target;
        if (target && target.classList.contains("delete-message")) {
            target.parentElement.remove();
        }
    });

    function appendMessage(message, className) {
        const p = document.createElement("p");
        p.textContent = message;
        p.classList.add(className);

        if (className === "user-message") {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("delete-message");
            p.appendChild(deleteButton);
        }

        chat.appendChild(p);
        chat.scrollTop = chat.scrollHeight;
    }
});