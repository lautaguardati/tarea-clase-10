
const secuenciaUsuario = []
const secuenciaMaquina = []
let ronda = 0;


document.querySelector("#boton-empezar").onclick = empezarJuego;

function empezarJuego() {
    actualizarRonda(ronda)
    desactivarBotonEmpezarJuego()
    actualizarRonda()
    bloquearInputUsuario()
}


function desactivarBotonEmpezarJuego() {
    document.querySelector("#boton-empezar").setAttribute("disabled", "true")
}


function actualizarRonda() {
    ronda++
    document.querySelector("#ronda").textContent = ronda
}


function bloquearInputUsuario() {
    const $cuadros = document.querySelectorAll(".cuadro")
    $cuadros.forEach(($cuadro) => {
        $cuadro.onclick = () => { }
    })
}


