<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "conexion.php";

$mensaje = "";

if(isset($_GET["ok"])){

    $mensaje =
    "✅ Usuario registrado correctamente";

}

if($_SERVER["REQUEST_METHOD"] === "POST"){

    try{

        $usuario = trim($_POST["usuario"]);
        $email = trim($_POST["email"]);

        $password = password_hash(
            $_POST["password"],
            PASSWORD_DEFAULT
        );

        $sql = "
        INSERT INTO usuarios
        (usuario,email,password,rol)
        VALUES
        (:usuario,:email,:password,'lector')
        ";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([

            ':usuario' => $usuario,
            ':email' => $email,
            ':password' => $password

        ]);

        header("Location: registro.php?ok=1");
exit;

    }catch(PDOException $e){

        $mensaje =
        "❌ Error: " . $e->getMessage();

    }

}
?>

<!DOCTYPE html>
<html lang="es">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Registro</title>

<link rel="stylesheet" href="assets/registro.css">

</head>
<body>

<div class="registro-container">

<h1>Crear Cuenta</h1>

<form method="POST">

<input
type="text"
name="usuario"
placeholder="Usuario"
required>

<input
type="email"
name="email"
placeholder="Correo"
required>

<input
type="password"
name="password"
placeholder="Contraseña"
required>

<button type="submit">
Registrarse
</button>

</form>

<div class="mensaje">
<?php echo $mensaje; ?>
</div>

</div>

<script src="assets/js/registro.js"></script>

</body>
</html>