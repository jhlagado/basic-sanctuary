import { Right, Left, map, pipe, pipeK, prop } from 'sanctuary';

function safeParseInt(numberString) {
    const result = parseInt(numberString);
    return isNaN(result)
        ? Left("Invalid number format") : Right(result);
}

export class EmployeeRepository {

    employees = [
        { id: 1, name: "John", supervisorId: Left("No supervisor") },
        { id: 2, name: "Jane", supervisorId: Right(1) },
        { id: 3, name: "Joe", supervisorId: Right(2) },
    ];

    findById(id) {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length
            ? Right(results[0])
            : Left("Employee does not exist");
    }
}

export function getSupervisorName(repository, enteredIdResult) {

    return pipe([
        pipeK([
            safeParseInt,
            (employeeId) => repository.findById(employeeId),
            prop('supervisorId'),
            (supervisorId) => repository.findById(supervisorId)
        ]),
        map(prop('name'))
    ])(enteredIdResult);
}
