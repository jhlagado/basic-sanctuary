import daggy from 'daggy';
import { Either, map, pipe, pipeK, prop } from 'sanctuary';

const Employee = daggy.tagged('your-package/TodoItem', [
    'id',
    'name',
    'supervisorId'
]);

export class EmployeeRepository {

    employees = [
        { id: 1, name: "John", supervisorId: Either.Left("No supervisor") },
        { id: 2, name: "Jane", supervisorId: Either.Right(1) },
        { id: 3, name: "Joe", supervisorId: Either.Right(2) },
    ];

    findById(id) {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length
            ? Either.Right(results[0])
            : Either.Left("Employee does not exist");
    }
}

export function getSupervisorName(repository, enteredIdResult) {

    return pipe([
        pipeK([
            safeParseInt,
            employeeId => repository.findById(employeeId),
            employee => employee.supervisorId,
            supervisorId => repository.findById(supervisorId)
        ]),
        map(prop('name'))
    ])(enteredIdResult);
}

function safeParseInt(numberString) {
    const result = parseInt(numberString);
    return isNaN(result)
        ? Either.Left("Invalid number format") : Either.Right(result);
}