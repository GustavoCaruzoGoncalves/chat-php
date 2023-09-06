<?php
session_start();

if (isset($_SESSION['chat_user'])) {
    $user = $_SESSION['chat_user'];
} else {
    $user = "Usuário" . rand(1, 1000);
    $_SESSION['chat_user'] = $user;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];
    
    if (!empty($message)) {
        $data = date('H:i:s');
        echo "<b>$user:</b> $message <small>($data)</small><br>";
        // Aqui você pode salvar a mensagem em um arquivo ou banco de dados, se desejar
        exit();
    }
}

if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'text/event-stream') !== false) {
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache');

    while (true) {
        // Aqui você pode ler as mensagens da outra pessoa e enviá-las como eventos SSE
        // Por simplicidade, vou apenas enviar uma mensagem fictícia a cada 2 segundos
        $data = date('H:i:s');
        $message = "Mensagem da outra pessoa <small>($data)</small>";
        echo "data: $message\n\n";
        ob_flush();
        flush();
        sleep(2);
    }
}
?>
