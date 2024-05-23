const $form = document.querySelector("form")
document.querySelector("#add-familiar").onclick = function () {
    addMember();
}

let memberNumber = 0;
function addMember() {
    const $divNode = document.createElement("div");
    $divNode.className = "member";

    const $newLabel = document.createElement("label");
    $newLabel.textContent = "Ingrese salario anual del familiar:";

    const $newInput = document.createElement("input");
    $newInput.type = "number";
    $newInput.name = "salary-member-" + memberNumber

    document.querySelector("form").appendChild($divNode);
    $divNode.appendChild($newLabel);
    $newLabel.appendChild($newInput);
    memberNumber++;
}

document.querySelector("#remove-familiar").onclick = function () {
    if (memberNumber > 0) {
        document.querySelector("form").lastChild.remove();
        memberNumber--;
    }
}

document.querySelector("#calculate-button").onclick = function () {
    createNumbers();
    if (numbers.length > 0) {
        if (!manageErrorsInSalary()) {
            findHighestSalary();
            findLowestSalary();
            findAverageAnnualSalary();
            findAverageMensualSalary();
            showResults();
        }
        showErrors();
    }
    return false;
}

let numbers = []
function createNumbers($salarys) {
    numbers = [];
    $salarys = document.querySelectorAll("form input");
    for (i = 0; i < $salarys.length; i++) {
        numbers.push(parseInt($salarys[i].value));
    }
}

function findHighestSalary(highestSalary) {
    highestSalary = numbers[0];
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] > highestSalary) {
            highestSalary = numbers[i];
        }
    }
    document.querySelector("#highest-annual-salary").textContent = highestSalary + "$"
}

function findLowestSalary(lowestSalary) {
    lowestSalary = numbers[0];
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] < lowestSalary) {
            lowestSalary = numbers[i];
        }
    }
    document.querySelector("#lowest-annual-salary").textContent = lowestSalary + "$";
}

function findAverageAnnualSalary(total, annualAverage) {
    total = 0;
    for (i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    annualAverage = total / numbers.length;
    document.querySelector("#average-annual-salary").textContent = annualAverage + "$";
}

function findAverageMensualSalary(total, monthsInAYear, mensualAverage) {
    total = 0;
    for (i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }
    monthsInAYear = 12;
    mensualAverage = (total / numbers.length) / monthsInAYear;
    document.querySelector("#average-mensual-salary").textContent = mensualAverage + "$";
}

function showResults() {
    document.querySelector("#results").className = ""
}

let errors;
function manageErrorsInSalary() {
    errors = 0;
    errorSalaryInputs = {
    }
    for (let i = 0; i < numbers.length; i++) {
        if (validateMemberSalary(numbers[i])) {
            errors++;
        }
        errorSalaryInputs["salary-member-" + i] = validateMemberSalary(numbers[i]);
    }
    return errors;
}

function validateMemberSalary(salary) {
    if (isNaN(salary) || salary === "" || salary === 0) {
        return "El campo de salario del familiar no puede estar vacío"
    } else if (!/^[0-9]+$/.test(salary)) {
        return "El campo de salario del familiar solo acepta números"
    } else
        return ""
}

function showErrors() {
    let keys = Object.keys(errorSalaryInputs)
    keys.forEach(function (key) {
        const error = errorSalaryInputs[key]
        if (error) {
            $form[key].className = "error"
        } else
            $form[key].className = ""
    })
}
