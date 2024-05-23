function testvalidateMemberSalary(){
    console.assert(
        validateMemberSalary("") === "El campo de salario del familiar no puede estar vacío",
        "ValidateMemberSalary no validó que el campo esté vacío"
    )
    console.assert(
        validateMemberSalary("Gano 100 pesos") === "El campo de salario del familiar solo acepta números",
        "ValidateMemberSalary no validó que el campo tenga solo números"
    )
    console.assert(
        validateMemberSalary("12000") === "",
        "ValidateMemberSalary no validó un salario que era válido"
    )
}
