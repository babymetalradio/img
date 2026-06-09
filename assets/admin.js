let conciertos = [];

const TMDB_API_KEY = "2dd54287a59a994368888cb1c3d054f5";

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

    conciertos = [

        ...conciertosData,
        ...metarajiData,
        ...festivalesData,
        ...documentalesData

    ];

    renderTabla();
    actualizarStats();

})
.catch(error => {

    console.error(
        "Error cargando JSON",
        error
    );

});

/* ELEMENTOS */

const tipoSelect =
document.getElementById("tipo");

const metarajiFields =
document.getElementById("metarajiFields");

/* MOSTRAR CAMPOS METARAJI */

function actualizarCamposMetaraji(){

    if(tipoSelect.value === "Metaraji"){

        metarajiFields.style.display =
        "block";

    }else{

        metarajiFields.style.display =
        "none";

    }

}

tipoSelect.addEventListener(
    "change",
    () => {

        actualizarCamposMetaraji();
        generarCodigo();

    }
);

document
.getElementById("temporada")
?.addEventListener(
"input",
generarCodigo
);

document
.getElementById("episodio")
?.addEventListener(
"input",
generarCodigo
);

actualizarCamposMetaraji();

function generarCodigo(){

    const tipo =
    document.getElementById(
        "tipo"
    ).value;

    if(tipo !== "Metaraji"){

        document.getElementById(
            "codigo"
        ).value = "";

        return;
    }

    const temporada =
    Number(
        document.getElementById(
            "temporada"
        ).value
    );

    const episodio =
    Number(
        document.getElementById(
            "episodio"
        ).value
    );

    if(!temporada || !episodio) return;

    document.getElementById(
        "codigo"
    ).value =
    `MET-T${temporada}-E${String(
        episodio
    ).padStart(2,"0")}`;

}

function autocompletarEpisodio(){

    const temporada =
    Number(
        document.getElementById(
            "temporada"
        ).value
    );

    if(!temporada) return;

    const episodios =
    conciertos
    .filter(
        x =>
        x.tipo === "Metaraji" &&
        Number(x.temporada) === temporada
    )
    .map(
        x => Number(x.episodio)
    );

    const siguiente =
    episodios.length
    ? Math.max(...episodios) + 1
    : 1;

    document.getElementById(
        "episodio"
    ).value = siguiente;

}
/* VISTA PREVIA */

function actualizarPreview(){

    document.getElementById(
        "previewTitle"
    ).textContent =
    document.getElementById("titulo").value ||
    "Título del concierto";

    document.getElementById(
        "previewMeta"
    ).textContent =
    `📅 ${document.getElementById("anio").value || "Anio"} • 🌎 ${document.getElementById("pais").value || "País"} • ⏱ ${document.getElementById("duracion").value || "Duración"}`;

    document.getElementById(
        "previewDescription"
    ).textContent =
    document.getElementById("descripcion").value ||
    "Descripción del concierto.";

    document.getElementById(
        "previewImg"
    ).src =
    document.getElementById("portada").value ||
    "https://via.placeholder.com/320x450?text=PORTADA";
const trailer =
document.getElementById(
    "trailer"
).value;

const previewTrailer =
document.getElementById(
    "previewTrailer"
);

if(trailer){

    previewTrailer.innerHTML = `
    <iframe
    src="${trailer}"
    width="100%"
    height="220"
    frameborder="0"
    allowfullscreen>
    </iframe>
    `;

}else{

    previewTrailer.innerHTML = "";

}

}

document
.querySelectorAll(
"input, textarea, select"
)
.forEach(campo => {

    campo.addEventListener(
        "input",
        actualizarPreview
    );

});

/* ESTADISTICAS */

function actualizarStats(){

    document.getElementById(
        "totalConciertos"
    ).textContent =
    conciertos.length;

    document.getElementById(
        "totalPaises"
    ).textContent =
    new Set(
        conciertos.map(x => x.pais)
    ).size;

    document.getElementById(
        "totalArtistas"
    ).textContent =
    new Set(
        conciertos.map(x => x.artista)
    ).size;

    document.getElementById(
        "totalTemporadas"
    ).textContent =
    new Set(
        conciertos
        .filter(x => x.tipo === "Metaraji")
        .map(x => x.temporada)
    ).size;

}

/* TABLA */

function renderTabla(){

    const tabla =
    document.getElementById(
        "tablaConciertos"
    );

    tabla.innerHTML = "";

    /* CONCIERTOS */

    tabla.innerHTML += `
    <tr>
        <th colspan="7"
        class="admin-seccion-conciertos">
        🎤 CONCIERTOS
        </th>
    </tr>
    `;

    conciertos
.filter(
    item => item.tipo === "Concierto"
)
.forEach(item => {

        tabla.innerHTML += `
        <tr>

            <td>${item.id}</td>

            <td>${item.titulo}</td>

            <td>-</td>

            <td>-</td>

            <td>${item.pais}</td>

            <td>${item.tipo}</td>

            <td>

                <button
                onclick="editar(${item.id})">
                ✏️
                </button>

                <button
                onclick="eliminar(${item.id})">
                🗑️
                </button>

            </td>

        </tr>
        `;

    });

tabla.innerHTML += `
<tr>
    <th colspan="7"
    class="admin-seccion-conciertos">
    🎪 FESTIVALES
    </th>
</tr>
`;

conciertos
.filter(
    item => item.tipo === "Festival"
)
.forEach(item => {

    tabla.innerHTML += `
    <tr>

        <td>${item.id}</td>
        <td>${item.titulo}</td>
        <td>-</td>
        <td>-</td>
        <td>${item.pais}</td>
        <td>${item.tipo}</td>

        <td>

            <button onclick="editar(${item.id})">
            ✏️
            </button>

            <button onclick="eliminar(${item.id})">
            🗑️
            </button>

        </td>

    </tr>
    `;

});

tabla.innerHTML += `
<tr>
    <th colspan="7"
    class="admin-seccion-conciertos">
    🎬 DOCUMENTALES
    </th>
</tr>
`;

conciertos
.filter(
    item => item.tipo === "Documental"
)
.forEach(item => {

    tabla.innerHTML += `
    <tr>

        <td>${item.id}</td>
        <td>${item.titulo}</td>
        <td>-</td>
        <td>-</td>
        <td>${item.pais}</td>
        <td>${item.tipo}</td>

        <td>

            <button onclick="editar(${item.id})">
            ✏️
            </button>

            <button onclick="eliminar(${item.id})">
            🗑️
            </button>

        </td>

    </tr>
    `;

});

    /* METARAJI */

    tabla.innerHTML += `
    <tr>
        <th colspan="7"
        class="admin-seccion-metaraji">
        📻 METARAJI
        </th>
    </tr>
    `;

    const temporadas =
    [
        ...new Set(
            conciertos
            .filter(
                item => item.tipo === "Metaraji"
            )
            .map(
                item => item.temporada
            )
        )
    ].sort((a,b)=>a-b);

    temporadas.forEach(temporada => {

        const episodios =
        conciertos.filter(
            item =>
            item.tipo === "Metaraji" &&
            item.temporada === temporada
        );

        tabla.innerHTML += `
        <tr>
            <th colspan="7"
            style="
            background:#555;
            color:white;">
            📀 TEMPORADA ${temporada}
            (${episodios.length} episodios)
            </th>
        </tr>
        `;

        episodios
        .sort(
            (a,b) =>
            a.episodio - b.episodio
        )
        .forEach(item => {

            tabla.innerHTML += `
            <tr>

                <td>${item.id}</td>

                <td>${item.titulo}</td>

                <td>T${item.temporada}</td>

                <td>E${item.episodio}</td>

                <td>${item.pais}</td>

                <td>${item.tipo}</td>

                <td>

                    <button
                    onclick="editar(${item.id})">
                    ✏️
                    </button>

                    <button
                    onclick="eliminar(${item.id})">
                    🗑️
                    </button>

                </td>

            </tr>
            `;

        });

    });

    actualizarStats();

}

function generarNuevoId(tipo){

    let inicio = 1;
    let fin = 999;

    switch(tipo){

    case "Concierto":
        inicio = 1;
        fin = 99;
        break;

    case "Metaraji":
        inicio = 100;
        fin = 199;
        break;

    case "Festival":
        inicio = 200;
        fin = 299;
        break;

    case "Documental":
        inicio = 300;
        fin = 399;
        break;

}

    const ids =
    conciertos
    .filter(x => x.tipo === tipo)
    .map(x => Number(x.id))
    .filter(id => id >= inicio && id <= fin);

    return ids.length
    ? Math.max(...ids) + 1
    : inicio;
}

/* AGREGAR */

document
.getElementById("agregarBtn")
.addEventListener(
"click",
() => {

    const editarId =
    document.getElementById(
        "editarId"
    ).value;

if(
document.getElementById("tipo").value === "Metaraji"
){

    const temporada =
    Number(
        document.getElementById(
            "temporada"
        ).value
    );

    const episodio =
    Number(
        document.getElementById(
            "episodio"
        ).value
    );

    const existe =
    conciertos.some(
        x =>
        x.tipo === "Metaraji" &&
        Number(x.temporada) === temporada &&
        Number(x.episodio) === episodio &&
        Number(x.id) !== Number(
            document.getElementById(
                "editarId"
            ).value || 0
        )
    );

    if(existe){

        alert(
            `Ya existe T${temporada}E${episodio}`
        );

        return;
    }

}

    const item = {

        id:
editarId
? Number(editarId)
: generarNuevoId(
document.getElementById("tipo").value
),

codigo:
document.getElementById(
    "codigo"
).value,

        titulo:
        document.getElementById(
            "titulo"
        ).value,

        artista:
        document.getElementById(
            "artista"
        ).value,

        tipo:
        document.getElementById(
            "tipo"
        ).value,

        pais:
        document.getElementById(
            "pais"
        ).value,

        anio:
        document.getElementById(
            "anio"
        ).value,

        duracion:
        document.getElementById(
            "duracion"
        ).value,

        descripcion:
        document.getElementById(
            "descripcion"
        ).value,

        sinopsis:
        document.getElementById(
            "sinopsis"
        ).value,

        portada:
        document.getElementById(
            "portada"
        ).value,

        banner:
        document.getElementById(
            "banner"
        ).value,

        embed:
        document.getElementById(
            "embed"
        ).value,

        trailer:
        document.getElementById(
            "trailer"
        ).value,

        temporada:
        Number(
            document.getElementById(
                "temporada"
            ).value
        ) || null,

        episodio:
        Number(
            document.getElementById(
                "episodio"
            ).value
        ) || null

    };

    if(editarId){

        const index =
        conciertos.findIndex(
            x => x.id == editarId
        );

        conciertos[index] =
        item;

    }else{

        conciertos.push(item);

    }

    document.getElementById(
        "editarId"
    ).value = "";

    renderTabla();

}
);

/* EDITAR */

function editar(id){

    const item =
    conciertos.find(
        x => x.id === id
    );

    if(!item) return;

    Object.keys(item)
    .forEach(key => {

        const campo =
        document.getElementById(key);

        if(campo){

            campo.value =
            item[key] ?? "";

        }

    });

    actualizarCamposMetaraji();
    actualizarPreview();

}

/* ELIMINAR */

function eliminar(id){

    conciertos =
    conciertos.filter(
        x => x.id !== id
    );

    renderTabla();

}

/* GENERAR JSON */

document
.getElementById("generarBtn")
.addEventListener(
"click",
() => {

const resultado = {

conciertos:
conciertos.filter(
x => x.tipo === "Concierto"
),

metaraji:
conciertos
.filter(
x => x.tipo === "Metaraji"
)
.sort((a,b)=>{

if(a.temporada !== b.temporada){

return a.temporada - b.temporada;

}

return a.episodio - b.episodio;

}),

festivales:
conciertos.filter(
x => x.tipo === "Festival"
),

documentales:
conciertos.filter(
x => x.tipo === "Documental"
)

};

document.getElementById(
"jsonOutput"
).value =
JSON.stringify(
resultado,
null,
2
);

}
);

   

/* DESCARGAR */

document
.getElementById("descargarBtn")
.addEventListener(
"click",
() => {

descargarArchivo(
"conciertos.json",
conciertos.filter(
x => x.tipo === "Concierto"
)
);

descargarArchivo(
"metaraji.json",
conciertos.filter(
x => x.tipo === "Metaraji"
)
);

descargarArchivo(
"festivales.json",
conciertos.filter(
x => x.tipo === "Festival"
)
);

descargarArchivo(
"documentales.json",
conciertos.filter(
x => x.tipo === "Documental"
)
);

}
);

function descargarArchivo(nombre,data){

const blob =
new Blob(
[
JSON.stringify(
data,
null,
2
)
],
{
type:"application/json"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
nombre;

a.click();

}

/* IMPORTAR JSON */

document
.getElementById("importarBtn")
.addEventListener(
"click",
() => {

    try{

        const datos =
JSON.parse(
    document.getElementById(
        "jsonImport"
    ).value
);

conciertos = [

    ...(datos.conciertos || []),
    ...(datos.metaraji || []),
    ...(datos.festivales || []),
    ...(datos.documentales || [])

];

        renderTabla();

        alert(
            "JSON importado correctamente"
        );

    }catch{

        alert(
            "JSON inválido"
        );

    }

}
);
document
.getElementById(
"nuevoMetarajiBtn"
)
?.addEventListener(
"click",
() => {

    document.getElementById(
        "tipo"
    ).value = "Metaraji";

    document.getElementById(
        "artista"
    ).value = "BABYMETAL";

    document.getElementById(
        "pais"
    ).value = "Japón";

    document.getElementById(
        "portada"
    ).value = "img/met.jpg";

    document.getElementById(
        "banner"
    ).value = "img/met.jpg";

    document.getElementById(
        "duracion"
    ).value = "24:00";

document.getElementById(
    "titulo"
).value = "";

document.getElementById(
    "descripcion"
).value = "";

document.getElementById(
    "sinopsis"
).value = "";

document.getElementById(
    "embed"
).value = "";

document.getElementById(
    "trailer"
).value = "";

document.getElementById(
    "editarId"
).value = "";

    const metaraji =
    conciertos.filter(
        x => x.tipo === "Metaraji"
    );

document
.getElementById(
    "previewBtn"
)
?.addEventListener(
    "click",
    () => {

        actualizarPreview();

    }
);

    if(metaraji.length){

        const ultimo =
        metaraji.sort((a,b) => {

            if(
                Number(a.temporada) !==
                Number(b.temporada)
            ){

                return (
                    Number(b.temporada) -
                    Number(a.temporada)
                );

            }

            return (
                Number(b.episodio) -
                Number(a.episodio)
            );

        })[0];

        document.getElementById(
            "temporada"
        ).value =
        ultimo.temporada;

        document.getElementById(
            "episodio"
        ).value =
        Number(
            ultimo.episodio
        ) + 1;

    }

    actualizarCamposMetaraji();

    generarCodigo();

    actualizarPreview();

});


async function buscarTMDB(){

const query =
document.getElementById(
"tmdbBuscar"
).value.trim();

if(!query){
alert("Escribe un título");
return;
}

try{

const response =
await fetch(
`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`
);

const data =
await response.json();

if(!data.results?.length){
alert("No se encontraron resultados");
return;
}

const item = data.results[0];

document.getElementById("titulo").value =
item.title || item.name || "";

document.getElementById("descripcion").value =
item.overview || "";

document.getElementById("sinopsis").value =
item.overview || "";

document.getElementById("anio").value =
(item.release_date || item.first_air_date || "").substring(0,4);

document.getElementById("portada").value =
item.poster_path
? `https://image.tmdb.org/t/p/w780${item.poster_path}`
: "";

document.getElementById("banner").value =
item.backdrop_path
? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
: "";

actualizarPreview();

alert("Información cargada");

}catch(error){

console.error(error);

alert("Error consultando TMDb");

}

}

document
.getElementById(
"buscarTmdbBtn"
)
?.addEventListener(
"click",
buscarTMDB
);

async function cargarTMDbPorId(){

const id =
document.getElementById(
"tmdbId"
).value.trim();

if(!id){
alert("Ingresa un TMDb ID");
return;
}

try{

const response =
await fetch(
`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=es-MX`
);

if(!response.ok){

alert("TMDb ID no encontrado");
return;

}

const item =
await response.json();

const videosResponse =
await fetch(
`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=es-MX`
);

const videos =
await videosResponse.json();

const trailer =
videos.results?.find(
v =>
v.site === "YouTube" &&
v.type === "Trailer"
);

document.getElementById(
"trailer"
).value =
trailer
? `https://www.youtube.com/embed/${trailer.key}`
: "";

document.getElementById(
"titulo"
).value =
item.title || "";

document.getElementById(
"descripcion"
).value =
item.overview || "";

document.getElementById(
"sinopsis"
).value =
item.overview || "";

document.getElementById(
"anio"
).value =
item.release_date
? item.release_date.substring(0,4)
: "";

document.getElementById(
"duracion"
).value =
item.runtime
? `${item.runtime} min`
: "";

document.getElementById(
"artista"
).value =
"BABYMETAL";

document.getElementById(
"pais"
).value =
item.production_countries?.length
? item.production_countries[0].name
: "Japón";

document.getElementById(
"portada"
).value =
item.poster_path
? `https://image.tmdb.org/t/p/w780${item.poster_path}`
: "";

document.getElementById(
"banner"
).value =
item.backdrop_path
? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
: "";

actualizarPreview();

alert("Contenido cargado");

}catch(error){

console.error(error);

alert("Error consultando TMDb");

}

}
document
.getElementById(
"buscarTmdbIdBtn"
)
?.addEventListener(
"click",
cargarTMDbPorId
);