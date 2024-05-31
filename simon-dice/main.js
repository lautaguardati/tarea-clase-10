
const secuenciaUsuario = []
const secuenciaMaquina = []
let ronda = 0;


document.querySelector("#boton-empezar").onclick = empezarJuego;

function empezarJuego() {
    actualizarRonda(ronda)
}




function actualizarRonda() {
    ronda++
    document.querySelector("#ronda").textContent = ronda
}