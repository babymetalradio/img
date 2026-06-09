console.log(
"Registro cargado"
);
const mensaje =
document.querySelector(".mensaje");

if(mensaje && mensaje.textContent.trim()){

    setTimeout(() => {

        mensaje.style.display = "none";

    }, 5000);

}