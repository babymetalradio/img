const params =
new URLSearchParams(
window.location.search
);

const temporada =
Number(
params.get("temporada")
);

fetch("data/metaraji.json")
.then(r => r.json())
.then(data => {

    const episodios =
    data
    .filter(
        item =>
        item.tipo === "Metaraji" &&
        Number(item.temporada) === temporada
    )
    .sort(
        (a,b) =>
        a.episodio - b.episodio
    );

    if(episodios.length === 0){

        document.getElementById(
            "tituloTemporada"
        ).textContent =
        "Temporada no encontrada";

        document.getElementById(
            "episodios"
        ).innerHTML =
        "<p>No hay episodios disponibles.</p>";

        return;

    }

    document.getElementById(
        "tituloTemporada"
    ).textContent =
    `📻 METARAJI - Temporada ${temporada} (${episodios.length} episodios)`;

    const contenedor =
    document.getElementById(
        "episodios"
    );

    contenedor.innerHTML = "";

    episodios.forEach(ep => {

        contenedor.innerHTML += `

        <div
        class="card"
        onclick="window.location.href='detalle.html?id=${ep.id}'">

            <img
            src="${ep.portada}"
            alt="${ep.titulo}">

            <div class="card-title">

                Episodio ${ep.episodio}

                <br>

                <small>
                ${ep.fecha || ""}
                </small>

            </div>

        </div>

        `;

    });

})
.catch(error => {

    console.error(
        "Error cargando temporada:",
        error
    );

    document.getElementById(
        "tituloTemporada"
    ).textContent =
    "Error cargando temporada";

    document.getElementById(
        "episodios"
    ).innerHTML =
    "<p>No se pudieron cargar los episodios.</p>";

});