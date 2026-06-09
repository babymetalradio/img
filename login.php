<?php

session_start();

require_once "conexion.php";

if(isset($_SESSION["usuario"])){

    header("Location:index.php");
    exit;

}

$error = "";

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $usuario = trim($_POST["usuario"]);
    $password = $_POST["password"];

    $stmt = $pdo->prepare(
        "SELECT * FROM usuarios WHERE usuario=?"
    );

    $stmt->execute([$usuario]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if(
        $user &&
        password_verify(
            $password,
            $user["password"]
        )
    ){

        $_SESSION["id"] =
        $user["id"];

        $_SESSION["usuario"] =
        $user["usuario"];

        $_SESSION["rol"] =
        $user["rol"];

        if(
            $user["rol"] === "admin"
        ){

            header("Location:admin.php");

        }else{

            header("Location:index.php");

        }

        exit;

    }

    $error =
    "Usuario o contraseña incorrectos";

}

?><!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport"
content="width=device-width,initial-scale=1">

<title>Iniciar Sesión</title><link rel="stylesheet"
href="assets/login.css"></head><body><div class="login-box"><h1>BABYMETAL</h1><?php if($error): ?><div class="error"><?php echo $error; ?></div><?php endif; ?><form method="POST"><input
type="text"
name="usuario"
placeholder="Usuario"
required>

<div class="password-box"><input
type="password"
name="password"
id="password"
placeholder="Contraseña"
required>

<button
type="button"
id="togglePassword">

👁

</button></div><button
type="submit">

Entrar

</button></form><p class="registro-link">¿No tienes cuenta?

<a href="registro.php">
Regístrate
</a></p></div><script
src="assets/js/login.js">
</script></body>
</html>