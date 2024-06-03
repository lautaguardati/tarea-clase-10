
let secuenciaUsuario = []
let secuenciaMaquina = []
let ronda = 0;


document.querySelector("#boton-empezar").onclick = empezarJuego;


function empezarJuego() {
    ronda = 0;
    desactivarBotonEmpezarJuego()
    manejarTurnoMaquina()
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


function manejarTurnoMaquina() {
    actualizarRonda();
    actualizarEstado("Turno de la maquina")
}


function actualizarEstado(estado, error = false) {
    const $estado = document.querySelector("#estado")
    $estado.textContent = estado

    if (error) {
        $estado.classList.remove("alert-primary");
        $estado.classList.add("alert-danger");
    } else {
        $estado.classList.remove("alert-danger");
        $estado.classList.add("alert-primary")
    }
}


