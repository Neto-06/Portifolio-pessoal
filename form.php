<?php
header("Content-Type: application/json"); // informa que a resposta será JSON

include('classes/Mail.class.php');

$enviado = (new Mail($_POST))->sendMail();

if ($enviado) {
    echo json_encode(["status" => "sucesso"]);
} else {
    http_response_code(500); // erro para o JS entender
    echo json_encode(["status" => "erro", "mensagem" => "Falha ao enviar o e-mail"]);
}
