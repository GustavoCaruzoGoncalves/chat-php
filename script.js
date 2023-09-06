document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const chatContainer = document.getElementById("chatContainer");
    const chat = document.getElementById("chat");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");

    let eventSource;

    startButton.addEventListener("click", function () {
        chatContainer.style.display = "block";
        startButton.style.display = "none";

        // Crie uma conexão SSE para receber mensagens da outra pessoa
        eventSource = new EventSource("chat.php");

        eventSource.onmessage = function (event) {
            chat.innerHTML += event.data;
            chat.scrollTop = chat.scrollHeight;
        };
    });

    sendMessage.addEventListener("click", function () {
        const message = messageInput.value.trim();

        if (message !== "") {
            messageInput.value = "";
            postChatMessage(message);
        }
    });

    function postChatMessage(message) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "chat.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("message=" + message);
    }

    window.addEventListener("beforeunload", function () {
        // Feche a conexão SSE ao sair da página
        if (eventSource) {
            eventSource.close();
        }
    });
});


