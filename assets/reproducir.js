console.log("JS cargado");

const params =
new URLSearchParams(
window.location.search
);

const id =
parseInt(
params.get("id")
);

console.log("ID:", id);

Promise.all([

    fetch("data/conciertos.json")
    .then(r => r.json()),

    fetch("data/metaraji.json")
    .then(r => r.json()),

    fetch("data/festivales.json")
    .then(r => r.json())
    .catch(() => []),

    fetch("data/documentales.json")
    .then(r => r.json())
    .catch(() => [])

])
.then(([

    conciertosData,
    metarajiData,
    festivalesData,
    documentalesData

]) => {

    const data = [

        ...conciertosData,
        ...metarajiData,
        ...festivalesData,
        ...documentalesData

    ];

    const c =
    data.find(
        x => Number(x.id) === Number(id)
    );

    if(!c){

        document.getElementById(
            "titulo"
        ).textContent =
        "Contenido no encontrado";

        return;
    }

    /* PLAYER */

    if(c.embed){

        document.getElementById(
            "player"
        ).innerHTML = `
        <iframe
        src="${c.embed}"
        allowfullscreen
        loading="lazy">
        </iframe>
        `;

    }else{

        document.getElementById(
            "player"
        ).innerHTML = `
        <div class="error-player">
            No hay video disponible.
        </div>
        `;

    }

    /* TITULO */

    document.getElementById(
        "titulo"
    ).textContent =
    c.titulo;

    /* INFO */

    document.getElementById(
        "info"
    ).innerHTML = `

        🎤 ${c.artista || "BABYMETAL"}
        •

        🎬 ${c.tipo || "-"}

        •

        🌎 ${c.pais || "-"}

        •

        📅 ${c.anio || "-"}

        •

        ⏱ ${c.duracion || "-"}

    `;

    /* SINOPSIS */

    document.getElementById(
        "sinopsis"
    ).innerHTML = `
    <h3>Sinopsis</h3>

    <p>
    ${c.sinopsis ||
    "Sinopsis no disponible."}
    </p>
    `;

    /* CONTINUAR VIENDO */

    localStorage.setItem(
        "ultimoConcierto",
        JSON.stringify(c)
    );

})
.catch(error => {

    console.error(
        "Error reproducir.js:",
        error
    );

    document.getElementById(
        "titulo"
    ).textContent =
    "Error cargando contenido";

    const player =
    document.getElementById(
        "player"
    );

    if(player){

        player.innerHTML = `
        <div class="error-player">
            Error cargando el video.
        </div>
        `;

    }

});