function testValidateNumberOfFamilyMembers() {
    console.assert(
        validateNumberOfFamilyMembers() === "Este campo no puede estar vacío",
        "ValidateNumberOfFamilyMembers no validó que este campo no esté vacío"
    )
    console.assert(
        validateNumberOfFamilyMembers(102) === "Este campo solo puede tener números entre 1 y 99",
        "ValidateNumberOfFamilyMembers no validó que haya solo números en el campo."
    )
    console.assert(
        validateNumberOfFamilyMembers(4) === "", "ValidateNumberOfFamilyMembers no validó un número correcto"
    )
}

testValidateNumberOfFamilyMembers();


function testValidateAgeOfFamilyMembers() {
    console.assert(
        validateAgeOfFamilyMembers(0) === "Este campo no puede ser 0",
        "ValidateAgeOfFamilyMebers no validó que el campo de edad no esté vacío"
    )
    console.assert(
        validateAgeOfFamilyMembers() === "Este campo no puede estar vacío",
        "ValidateAgeOfFamilyMembers no validó que el campo de edad no esté vacio"
    )
    console.assert(
        validateAgeOfFamilyMembers(180) === "Este campo no puede ser mayor a 150",
        "ValidateAgeOffamilyMember no validó que el campo sea menor a 150"
    )
    console.assert(
        validateAgeOfFamilyMembers(25) === "",
        "ValidateAgeOfFamilyMembers no validó una respuesta que era válida"
    )
}


testValidateAgeOfFamilyMembers();
