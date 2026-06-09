let conciertos = [];

/* CARGA INICIAL */

document.addEventListener("DOMContentLoaded", () => {

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

        if(
            !Array.isArray(conciertos) ||
            conciertos.length === 0
        ){

            document.getElementById("contenido").innerHTML =
            "<div class='section'><h2>No hay contenido disponible</h2></div>";

            return;

        }

        crearBanner();
        crearCategorias();

        setTimeout(
            activarCarruseles,
            200
        );

        cargarContinuar();
        cargarFavoritos();
        cargarUltimos();
        iniciarBuscador();
        iniciarMenu();

    })
    .catch(error => {

        console.error(error);

        document.getElementById("contenido").innerHTML =
        "<div class='section'><h2>Error cargando datos</h2></div>";

    });

});

/* BANNER */

function crearBanner(){

    const c =
    conciertos[
        Math.floor(
            Math.random() *
            conciertos.length
        )
    ];

    document.getElementById("banner").innerHTML = `
    <div class="banner"
         style="background-image:url('${c.banner}')">

        <div class="banner-content">

            <h1>${c.titulo}</h1>

            <p>
            📅 ${c.anio} •
            🌎 ${c.pais} •
            ⏱ ${c.duracion}
            </p>

            <p>${c.descripcion}</p>

            <a class="btn"
               href="reproducir.html?id=${c.id}">
               ▶ Reproducir
            </a>

        </div>

    </div>
    `;
}

/* CATEGORIAS */

function crearCategorias(){

    const contenido =
    document.getElementById("contenido");

    contenido.innerHTML = "";

    const tipos =
    [...new Set(conciertos.map(x => x.tipo))];

    tipos.forEach(tipo => {

    const lista =
conciertos
.filter(
    x => x.tipo === tipo
)
.sort(
    (a,b) => a.id - b.id
);

    let tituloCategoria;

    if(tipo === "Metaraji"){

        const temporadas =
        new Set(
            lista.map(
                item => item.temporada
            )
        ).size;

        tituloCategoria =
        `📻 METARAJI (${temporadas} Temporadas)`;

    }else{

        switch(tipo){

    case "Concierto":
        tituloCategoria =
        `🎤 CONCIERTOS (${lista.length})`;
        break;

    case "Festival":
        tituloCategoria =
        `🎪 FESTIVALES (${lista.length})`;
        break;

    case "Documental":
        tituloCategoria =
        `🎬 DOCUMENTALES (${lista.length})`;
        break;

    default:
        tituloCategoria =
        `${tipo} (${lista.length})`;

}

    }

    let html = `
    <div class="section">

        <h2>${tituloCategoria}</h2>

        <div class="carousel-container">

            <button
            class="carousel-btn left">

            ◀

            </button>

            <div class="row">
    `;
        if(tipo === "Metaraji"){

    const temporadas =
[...new Set(
    lista.map(
        item => item.temporada
    )
)]
.sort((a,b) => a - b);

    temporadas.forEach(temporada => {

        const episodio =
lista
.filter(
    item => item.temporada === temporada
)
.sort(
    (a,b) =>
    a.episodio - b.episodio
)[0];

        html += `
        <div
class="card"
onclick="abrirTemporada(${temporada})">

            <img
            src="${episodio.portada}"
            alt="Temporada ${temporada}">

            <div class="card-title">
    📻 METARAJI
    <br>
    Temporada ${temporada}
</div>

        </div>
        `;

    });

}else{

    lista.forEach(item => {

        html += crearCard(item);

    });

}

        html += `

            </div>

            <button
            class="carousel-btn right">

            ▶

            </button>

        </div>

    </div>

`;

        contenido.innerHTML += html;

    });

    const banderas = {
        "Japón":"🇯🇵",
        "México":"🇲🇽",
        "Estados Unidos":"🇺🇸",
        "Reino Unido":"🇬🇧",
        "Alemania":"🇩🇪",
        "Francia":"🇫🇷",
        "Corea del Sur":"🇰🇷"
    };

    const paises =
[...new Set(
    conciertos.map(x => x.pais)
)]
.sort();

    paises.forEach(pais => {

        const lista =
        conciertos.filter(x => x.pais === pais);

        let html = `
<div class="section">

    <h2>
    ${banderas[pais] || "🌎"} ${pais} (${lista.length})
    </h2>

    <div class="carousel-container">

        <button
        class="carousel-btn left">

        ◀

        </button>

        <div class="row">
`;

        lista.forEach(item => {

            html += crearCard(item);

        });

        html += `

        </div>

        <button
        class="carousel-btn right">

        ▶

        </button>

    </div>

</div>

`;

        contenido.innerHTML += html;

    });

}

/* TARJETAS */

function crearCard(item){

    const activo =
    obtenerFavoritos().includes(item.id);

    return `
    <div class="card"
         onclick="abrir(${item.id})">

        <img
        src="${item.portada}"
        alt="${item.titulo}"
        loading="lazy">

        <button
        class="favorite"
        onclick="event.stopPropagation();
        toggleFavorito(${item.id})">

        ${activo ? "❤️" : "🤍"}

        </button>

        <div class="card-title">
            ${item.titulo}
        </div>

    </div>
    `;
}

/* ABRIR */

function abrirTemporada(temporada){

    window.location.href =
    `temporada.html?temporada=${temporada}`;

}

function abrir(id){

    const concierto =
    conciertos.find(x => x.id === id);

    if(!concierto) return;

    localStorage.setItem(
        "ultimoConcierto",
        JSON.stringify(concierto)
    );

    window.location.href =
    `detalle.html?id=${id}`;

}

/* CONTINUAR */

function cargarContinuar(){

    const ultimo =
    localStorage.getItem(
        "ultimoConcierto"
    );

    if(!ultimo) return;

    const c =
    JSON.parse(ultimo);

    document.getElementById("continuar")
    .innerHTML = `
    <div class="card"
         onclick="abrir(${c.id})">

        <img src="${c.portada}">

        <div class="card-title">
            ${c.titulo}
        </div>

    </div>
    `;
}

/* FAVORITOS */

function obtenerFavoritos(){

    return JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];

}

function toggleFavorito(id){

    let favoritos =
    obtenerFavoritos();

    if(favoritos.includes(id)){

        favoritos =
        favoritos.filter(
            x => x !== id
        );

    }else{

        favoritos.push(id);

    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    cargarFavoritos();
cargarUltimos();
crearCategorias();

setTimeout(
activarCarruseles,
200
);

}

function cargarFavoritos(){

    const contenedor =
    document.getElementById("favoritos");

    if(!contenedor) return;

    const favoritos =
    obtenerFavoritos();

    document.querySelector(
        "#favoritos-section h2"
    )?.replaceChildren(
        document.createTextNode(
            `❤️ Mi Lista (${favoritos.length})`
        )
    );

    contenedor.innerHTML = "";

    favoritos.forEach(id => {

        const concierto =
        conciertos.find(
            x => x.id === id
        );

        if(!concierto) return;

        contenedor.innerHTML += `
        <div class="card"
             onclick="abrir(${concierto.id})">

            <img src="${concierto.portada}">

            <div class="card-title">
                ${concierto.titulo}
            </div>

        </div>
        `;

    });

}

/* ULTIMOS */

function cargarUltimos(){

    const ultimos =
[...conciertos]
.sort(
    (a,b) => b.id - a.id
)
.slice(0,10);

    document.querySelector(
        "#ultimos-section h2"
    )?.replaceChildren(
        document.createTextNode(
            `🕒 Últimos agregados (${ultimos.length})`
        )
    );

    const contenedor =
    document.getElementById("ultimos");

    contenedor.innerHTML = "";

    ultimos.forEach(item => {

        contenedor.innerHTML += `
        <div class="card"
             onclick="abrir(${item.id})">

            <img src="${item.portada}">

            <div class="card-title">
                ${item.titulo}
            </div>

        </div>
        `;

    });

}

/* BUSCADOR */

function iniciarBuscador(){

    const buscador =
    document.getElementById("buscar");

    if(!buscador) return;

    buscador.addEventListener("input", e => {

        const texto =
        e.target.value.toLowerCase();

        document
        .querySelectorAll(".card")
        .forEach(card => {

            card.style.display =
            card.innerText
            .toLowerCase()
            .includes(texto)
            ? "block"
            : "none";

        });

    });

}

/* MENU */

function iniciarMenu(){

    const menu =
    document.getElementById("menuBtn");

    const sidebar =
    document.getElementById("sidebar");

    const overlay =
    document.getElementById("overlay");

    if(!menu) return;

    menu.addEventListener(
        "click",
        () => {

            sidebar.classList.add(
                "active"
            );

            overlay.classList.add(
                "active"
            );

        }
    );

    overlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove(
                "active"
            );

            overlay.classList.remove(
                "active"
            );

        }
    );

}

/* BOTON ARRIBA */

const scrollBtn =
document.createElement("button");

scrollBtn.innerHTML = "⬆";

scrollBtn.className =
"scrollTop";

document.body.appendChild(
scrollBtn
);

window.addEventListener(
"scroll",
() => {

if(window.scrollY > 400){

scrollBtn.classList.add("show");

}else{

scrollBtn.classList.remove("show");

}

});

scrollBtn.addEventListener(
"click",
() => {

window.scrollTo({
top:0,
behavior:"smooth"
});

});

function activarCarruseles(){

document
.querySelectorAll(
".carousel-btn.left"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

const row =
btn.parentElement
.querySelector(".row");

row.scrollBy({
left:-400,
behavior:"smooth"
});

});

});

document
.querySelectorAll(
".carousel-btn.right"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

const row =
btn.parentElement
.querySelector(".row");

row.scrollBy({
left:400,
behavior:"smooth"
});

});

});

}