<?php
include_once 'superServidor.php';

$server = new Serv();

$podeEnviar = true;
$nome = $server->removeE($_POST['nome']);
$cpf =  $_POST['cpf'];
$email = $server->minusculo($_POST['email1']);
$celular = $server->deixarNumero($_POST['celular']);
$rendaFamiliar = $server->numeroI($_POST['rendaFamiliar']);
$tabela = "pessoas";

//sleep(15);

try {
    $server->cadastrarPessoas($tabela, $nome, $email, $celular, $cpf, $rendaFamiliar);
} catch (\Throwable $th) {
    echo "Erro ao Conectar-se no servidor";
}



exit(0);
//Consumir API
$api = "https://incdigital-integrationserver.archpelago.com:18092/api/prospects";
if (isset($_POST['consumirApi'])) {
    $consApi = $_POST['consumirApi'];
}

if (isset($consApi)) {
    $request = [
        'nome' => $nome,
        'cpf' => $cpf,
        'email' => $email,
        'celular' => $celular,
        'rendaFamiliar' => $rendaFamiliar,
    ];

    $server->consumirApi($api, $request);
}
