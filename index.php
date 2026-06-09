<?php

session_start();

?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>BMRadio1</title>

<link rel="stylesheet" href="assets/styles.css">

<link rel="manifest" href="manifest.json">

<meta name="theme-color" content="#e50914">

</head>
<body>

<!-- Overlay menú -->
<div id="overlay"></div>

<!-- Menú lateral -->
<div id="sidebar">

    <div class="sidebar-logo">
        BABYMETAL
    </div>

    <a href="#">🏠 Inicio</a>
    <a href="#favoritos-section">❤️ Mi Lista</a>
    <a href="#continuar-section">▶ Continuar viendo</a>
    <a href="#ultimos-section">🕒 Últimos agregados</a>
    <a href="#contenido">🎤 Categorías</a>

</div>

<header><button id="menuBtn">
☰
</button><div class="logo">
BMRadio1
</div><input
type="text"
id="buscar"
placeholder="Buscar conciertos..."
>


<?php if(isset($_SESSION["usuario"])): ?><a
href="logout.php"
class="login-btn">

👤 <?php echo $_SESSION["usuario"]; ?>

</a><?php else: ?><a
href="login.php"
class="login-btn">

👤 Iniciar Sesión

</a><?php endif; ?></header>

<!-- Banner -->
<div id="banner"></div>

<!-- Mi Lista -->
<div
class="section"
id="favoritos-section">

<h2>
❤️ Mi Lista
</h2>

<div
class="row"
id="favoritos">
</div>

</div>

<!-- Continuar viendo -->
<div
class="section"
id="continuar-section">

<h2>
▶ Continuar viendo
</h2>

<div
class="row"
id="continuar">
</div>

</div>

<!-- Últimos agregados -->
<div
class="section"
id="ultimos-section">

<h2>
🕒 Últimos agregados
</h2>

<div
class="row"
id="ultimos">
</div>

</div>

<!-- Categorías -->
<div id="contenido"></div>

<footer>

<p>
© 2026 BMRADIO1 HECHO CON ❤️ POR Babymetal Radio Mx
</p>

</footer>

<script src="assets/app.js"></script>

<script>

if("serviceWorker" in navigator){

window.addEventListener("load", () => {

navigator.serviceWorker
.register("sw.js")
.then(() => {

console.log(
"Service Worker registrado"
);

})
.catch(error => {

console.error(
"Error registrando SW:",
error
);

});

});

}

</script>

</body>
</html>