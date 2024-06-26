
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
    actualizarEstado("Turno de la máquina.")
    obtenerSecuenciaDeMaquina()
    manejarSecuenciaMaquina()
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


function obtenerSecuenciaDeMaquina() {
    const numerosAleatorios = []
    numerosAleatorios.push(Math.ceil(Math.random() * 4))
    numerosAleatorios.forEach((numero) => {
        secuenciaMaquina.push(document.querySelector("#cuadro-" + numero))
    })
}


function manejarSecuenciaMaquina() {
    secuenciaMaquina.forEach(($cuadro, index) => {
        const RETRASO_MS = 1000 * (index + 1)
        setTimeout(() => {
            resaltarCuadros($cuadro)
        }, RETRASO_MS)
    })

    const RETRASO_TURNO_JUGADOR = 1000 * (secuenciaMaquina.length + 1)
    setTimeout(() => {
        activarInputJugador()
    }, RETRASO_TURNO_JUGADOR)
}


function resaltarCuadros($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(() => {
        $cuadro.style.opacity = 0.5;
    }, 500);
}


function activarInputJugador() {
    actualizarEstado("¡Es tu turno!")
    document.querySelectorAll(".cuadro").forEach(($cuadro) => {
        $cuadro.onclick = manejarTurnoJugador;
    })
}


function manejarTurnoJugador(e) {
    const $cuadro = e.target
    resaltarCuadros($cuadro)
    secuenciaUsuario.push($cuadro);

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]

    if ($cuadro.id != $cuadroMaquina.id) {
        perder();
        return
    }
    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        setTimeout(() => {
            manejarTurnoMaquina();
        }, 1000)

        secuenciaUsuario = []
        bloquearInputUsuario();
    }
}


function perder() {
    secuenciaUsuario = []
    secuenciaMaquina = []

    actualizarEstado("Hesitation is Defeat", true)
    setTimeout(() => {
        actualizarEstado('¡Perdiste! Aprieta "Empezar" para empezar a jugar de nuevo.', true)
    }, 1000)
    document.querySelector("#boton-empezar").removeAttribute("disabled")
}
