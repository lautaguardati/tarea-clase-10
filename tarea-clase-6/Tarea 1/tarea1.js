let errores;
const $form = document.querySelector("form")

document.querySelector("#add-family-members").onclick = () => {
    if (!validateNumberOfFamilyMembers()) {
        addFamilyMembers();
        document.querySelector("#number-of-family-members").className = "form-control is-valid"
        document.querySelector("#add-family-members").setAttribute("disabled", "")
        document.querySelector("#calculate-reset-buttons").className = ""
    } else {
        document.querySelector("#number-of-family-members").className = "form-control is-invalid"
        document.querySelector("#number-of-family-members-input-feedback").textContent = validateNumberOfFamilyMembers();
    }
}

function addFamilyMembers(numberOfFamilyMembers) {
    numberOfFamilyMembers = Number(document.querySelector("#number-of-family-members").value);
    for (i = 0; i < numberOfFamilyMembers; i++) {
        let $divNode = document.createElement("div");
        $divNode.className = "col"
        $divNode.id = "node-of-age-of-memeber-" + i

        const $newLabel = document.createElement("label");
        $newLabel.textContent = "Ingrese la edad del familiar:";
        $newLabel.setAttribute("for", "age-of-family-member" + "-" + [i])

        const $newInput = document.createElement("input");
        $newInput.name = "age-of-family-member" + "-" + [i]
        $newInput.id = "age-of-family-member" + "-" + [i]
        $newInput.type = "number";
        $newInput.className = "form-control"

        const $newInvalidFeedback = document.createElement("div");
        $newInvalidFeedback.className = "invalid-feedback";

        $divNode.appendChild($newLabel);
        $divNode.appendChild($newInput);
        $divNode.appendChild($newInvalidFeedback)

        document.querySelector("#family-members").appendChild($divNode)
    }
}


const $calculateButton = document.querySelector("#calculate-button")
$calculateButton.onclick = () => {
    createNumbers();
    if (!errorOfAgeOfFamilyMembers()) {
        obtainOldestMember();
        obtainYoungestMember();
        obtainAverageFamilyAge();
        showResults();
    }
    return false;
}

let numbers = [];
function createNumbers($ageOfFamilyMembers) {
    numbers = [];
    $ageOfFamilyMembers = document.querySelectorAll(".col input");
    for (i = 0; i < $ageOfFamilyMembers.length; i++) {
        numbers.push(parseInt($ageOfFamilyMembers[i].value));
    }
}

function obtainOldestMember(oldestMember) {
    oldestMember = numbers[0]
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] > oldestMember) {
            oldestMember = numbers[i];
        }
    }
    document.querySelector("#age-oldest-family-member").textContent = oldestMember + " años.";
}

function obtainYoungestMember(youngestMember) {
    youngestMember = numbers[0];
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] < youngestMember) {
            youngestMember = numbers[i];
        }
    }
    document.querySelector("#age-youngest-family-member").textContent = youngestMember + " años.";
}

function obtainAverageFamilyAge(total) {
    total = 0;
    for (i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    total = total / numbers.length;
    document.querySelector("#average-family-age").textContent = total + " años.";
}

function showResults() {
    document.querySelector("#results").className = ""
}


const $resetButton = document.querySelector("#reset-button")
$resetButton.onclick = () => {
    removeFamilyMemebers();
    resetValues();
    hideResults();
    clearAddInput();
    document.querySelector("#calculate-reset-buttons").className = "oculto"
    document.querySelector("#add-family-members").removeAttribute("disabled")
}

function removeFamilyMemebers() {
    let $divNode = document.querySelectorAll(".col");
    for (i = 0; i < $divNode.length; i++) {
        $divNode[i].remove();
    }
}

function resetValues() {
    numbers = []
    document.querySelector("#age-oldest-family-member").textContent = "";
    document.querySelector("#age-youngest-family-member").textContent = "";
    document.querySelector("#average-family-age").textContent = "";
}

function hideResults() {
    document.querySelector("#results").className = "oculto"
}

function clearAddInput() {
    document.querySelector("#number-of-family-members").value = "";
}


function validateNumberOfFamilyMembers(numberOfFamilyMembers) {
    numberOfFamilyMembers = Number(document.querySelector("#number-of-family-members").value)
    if (numberOfFamilyMembers == 0) {
        return "Este campo no puede estar vacío"
    }
    if (!/^[0-9]{1,2}$/.test(numberOfFamilyMembers)) {
        return "Este campo solo puede tener números entre 1 y 99"
    }
    return ""
}

function errorOfAgeOfFamilyMembers() {
    errores = 0;
    ageErrors = {
    }
    for (let i = 0; i < numbers.length; i++) {
        if (validateAgeOfFamilyMembers(numbers[i]) != "") {
            errores++
        }
        ageErrors["age-of-family-member-" + i] = validateAgeOfFamilyMembers(numbers[i])
    }
    manageErrors()
    return errores
}

function validateAgeOfFamilyMembers($ageOfFamilyMembers) {
    if ($ageOfFamilyMembers === 0) {
        return "Este campo no puede ser 0"
    }
    if (isNaN($ageOfFamilyMembers) || $ageOfFamilyMembers === "") {
        return "Este campo no puede estar vacío"
    } else if ($ageOfFamilyMembers >= 150) {
        return "Este campo no puede ser mayor a 150"
    } else return ""
}

function manageErrors() {
    const keys = Object.keys(ageErrors)
    i = 0;
    keys.forEach((key) => {
        const error = ageErrors[key]
        const $divNode = document.querySelector("#node-of-age-of-memeber-" + i)
        i++
        if (error) {
            $form[key].className = "form-control is-invalid"
            $divNode.querySelector("div").textContent = ageErrors[key]
        } else {
            $form[key].className = "form-control is-valid"
        }
    })
}
