<?php
require "auth.php";
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>panel de Administracion</title>

<link rel="stylesheet" href="assets/styles.css">
<link rel="stylesheet" href="assets/admin.css">

</head>
<body>

<header>

<div class="logo">
BABYMETAL ADMIN
</div>

<a href="index.html" class="btn">
Volver al sitio
</a>

<a href="logout.php" class="btn">
Cerrar sesión
</a>

</header>

<div class="admin-container">

<h1 class="admin-title">
Panel de Administracion
</h1>

<?php if(isset($_GET["config"])): ?>

<div
style="
background:#0f5132;
padding:15px;
margin-bottom:20px;
border-radius:8px;
color:white;
">

✅ Configuración guardada correctamente

</div>

<?php endif; ?>

<div class="admin-stats">

<div>
🎤 <span id="totalConciertos">0</span>
</div>

<div>
🌎 <span id="totalPaises">0</span>
</div>

<div>
🎸 <span id="totalArtistas">0</span>
</div>

<div>
📻 <span id="totalTemporadas">0</span>
</div>

</div>

<div class="admin-form">

<div class="tmdb-box">

<input
type="text"
id="tmdbBuscar"
placeholder="Buscar en TMDb">
<div id="tmdbResultados"></div>

<button
type="button"
class="admin-btn"
id="buscarTmdbBtn">

🎬 Buscar TMDb

</button>

</div>
<div class="tmdb-box">

<input
type="number"
id="tmdbId"
placeholder="TMDb ID">

<button
type="button"
class="admin-btn"
id="buscarTmdbIdBtn">

🎬 Cargar TMDb

</button>

</div>
<input type="text" id="titulo" placeholder="Titulo">
<input type="text" id="artista" placeholder="Artista">
<input
type="text"
id="codigo"
placeholder="Codigo"
readonly>

<select id="tipo">
<option>Concierto</option>
<option>Metaraji</option>
<option>Festival</option>
<option>Documental</option>
</select>

<input type="text" id="pais" placeholder="Pais">
<input type="text" id="anio" placeholder="Año">
<input type="text" id="duracion" placeholder="Duracion">
<div id="metarajiFields">

<input
type="number"
id="temporada"
placeholder="Temporada"
oninput="autocompletarEpisodio()">

<input
type="number"
id="episodio"
placeholder="Episodio">

</div>
<input type="text" id="portada" placeholder="img/portada.jpg">
<input type="text" id="banner" placeholder="img/banner.jpg">

<input type="text" id="embed"
placeholder="https://www.yourupload.com/embed/...">
<input type="text" id="trailer"
placeholder="https://www.youtube.com/embed/...">
<input
type="hidden"
id="editarId">

<textarea id="descripcion"
placeholder="Descripcion"></textarea>

<textarea id="sinopsis"
placeholder="Sinopsis"></textarea>

</div>

<div class="admin-actions">

<button
class="admin-btn"
id="previewBtn">

👁️ Vista Previa

</button>

<button
class="admin-btn"
id="nuevoMetarajiBtn">

📻 Nuevo Metaraji

</button>

<button
class="admin-btn"
id="agregarBtn">

💾 Guardar Contenido

</button>

<button
class="admin-btn"
id="generarSerieBtn">

📦 Generar Serie

</button>

<button
class="admin-btn"
id="generarBtn">

📄 Generar JSON

</button>

<button
class="admin-btn"
id="descargarBtn">

⬇️ Descargar JSON

</button>

</div>

<div class="preview-container">

<h2>
Vista Previa
</h2>

<div
class="preview-card"
id="previewCard">

<img
id="previewImg"
src="https://via.placeholder.com/320x450?text=PORTADA">

<div
class="preview-title"
id="previewTitle">

Titulo del concierto

</div>

<div
class="preview-meta"
id="previewMeta">

📅 Año • 🌎 País • ⏱ Duración

</div>

<div
class="preview-description"
id="previewDescription">

Descripcion del contenido.

</div>

<div
id="previewTrailer"
style="margin-top:15px;">
</div>

</div>

</div>

<div class="admin-json">

<h2>
📂 Importar JSON
</h2>

<textarea
id="jsonImport"
placeholder="Pega aqui el contenido JSON">
</textarea>

<br><br>

<button
class="admin-btn"
id="importarBtn">

📂 Importar JSON

</button>

</div>

<table class="admin-table">

<thead>

<tr>

<th>ID</th>
<th>Titulo</th>
<th>Temporada</th>
<th>Episodio</th>
<th>Pais</th>
<th>Tipo</th>
<th>Acciones</th>

</tr>

</thead>

<tbody id="tablaConciertos">

</tbody>

</table>

<div class="admin-json">

<h2>
JSON Generado
</h2>

<textarea
id="jsonOutput"
readonly>
</textarea>

</div>

</div>

<script src="assets/admin.js"></script>

<div class="admin-json">

<h2>
⚙️ Configuración de Acceso
</h2>

<form
action="guardar_config.php"
method="POST">

<input
type="text"
name="usuario"
placeholder="Nuevo usuario"
required>

<br><br>

<input
type="password"
name="password"
placeholder="Nueva contraseña"
required>

<br><br>

<button
type="submit"
class="admin-btn">

💾 Guardar Configuración

</button>

</form>

</div>

</body>
</html>