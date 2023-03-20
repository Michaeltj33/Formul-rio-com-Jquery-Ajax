<?php

class Serv
{
    private function pegarServ()
    {
        $servidor = "localhost:3306";
        $usuario = "root";
        $senha = "";
        $bancodedados = "server";

        $conn = new mysqli($servidor, $usuario, $senha, $bancodedados);

        if ($conn->connect_error) {
?>
            <script>
                console.log("Erro de conexão");
            </script>

<?php
            die("Falha na conexão: " . $conn->connect_error);
        }
        return $conn;
    }

    function cadastrarPessoas($tabela, $nome, $email, $celular, $cpf, $renda)
    {
        if ($this->verificarTabelaExiste($tabela) == "") {
            $this->criarTabelaEmpreendimento($tabela);
        }

        $conn = $this->pegarServ();
        $sql = "insert into " . $tabela . " (nome, email,celular, cpf, renda ) values ('$nome', '$email', '$celular', '$cpf', '$renda')";
        $result = $conn->query($sql);
        return $result;
    }

    function criarTabelaEmpreendimento($tabela)
    {
        $conn = $this->pegarServ();
        $sql = "create table IF NOT EXISTS " . $tabela . " (
            id_lead int auto_increment,
            nome varchar(100),
            email varchar(100),
            celular varchar(20),            
            cpf varchar(20),
            renda int(11),           
            primary key(id_lead)
            );";
        $conn->query($sql);
    }

    function verificarTabelaExiste($nomeTabela)
    {
        $verTabela = "";
        $conn = $this->pegarServ();
        $sql = "SELECT TABLE_NAME FROM information_schema.tables WHERE table_NAME = '" . $nomeTabela . "'";
        $resultado = $conn->query($sql);
        foreach ($resultado as $res) {
            $verTabela = $res;
        }
        return $verTabela;
    }


    private function pegarID($emp)
    {
        $conn = $this->pegarServ();
        $sql = "SELECT * FROM " . $emp;
        $resultado = $conn->query($sql);
        return $resultado;
    }

    function removeE($dt)
    {
        $dt = trim($dt); //remove espaço no inicio e fim
        return $dt;
    }
    function minusculo($dt1)
    {
        $dt1 = $this->removeE($dt1);
        $dt1 = strtolower($dt1); //deixa todas as letras minúscula
        return $dt1;
    }
    function deixarNumero($string)
    {
        $string = $this->removeE($string);
        $string = preg_replace("/[^0-9]/", "", $string); //remove tudo, deixando apenas números   
        $string = strval($string);
        return $string;
    }
    function numeroI($ni)
    {
        $ni = intval($ni);
        $ni = $this->removeE($ni);
        $ni = strval($ni);
        return $ni;
    }

    function cadastrarLog($data, $hora, $log)
    {
        $conn = $this->pegarServ();
        $sql = "INSERT into logLead (data, hora, erroLog) values ('$data','$hora','$log');";
        $conn->query($sql);
    }

    function consumirApi($api, $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $api,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($request),
            CURLOPT_HTTPHEADER => array(
                //Inserir o Authorization
                'Authorization: Basic ???',
                'Content-Type: application/json'
            ),
        ));
        $response = curl_exec($curl);
    }
}
