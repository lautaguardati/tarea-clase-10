
const secuenciaUsuario = []
const secuenciaMaquina = []
let ronda = 0;


document.querySelector("#boton-empezar").onclick = empezarJuego;

function empezarJuego() {
    actualizarRonda(ronda)
    desactivarBotonEmpezarJuego()
}


function desactivarBotonEmpezarJuego() {
    document.querySelector("#boton-empezar").setAttribute("disabled", "true")
}


function actualizarRonda() {
    ronda++
    document.querySelector("#ronda").textContent = ronda
}

