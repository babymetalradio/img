<?php

$host = "sql206.infinityfree.com";
$dbname = "if0_42116673_bmradio";
$user = "if0_42116673";
$pass = "Mv181229";

try{

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

}catch(PDOException $e){

    die(
        "Error de conexión: ".
        $e->getMessage()
    );

}