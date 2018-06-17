import { EmployeeRepository, getSupervisorName } from './employee-repo';
import { equals, Either, Left, Right, show } from 'sanctuary';

//    eq :: Any -> Any -> Undefined !
const eq = expected => actual => {
    expect(show(expected)).toEqual(show(actual));
    expect(equals(expected)(actual)).toBe(true);
};

const repo = new EmployeeRepository();

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Either.Right('1'));
    eq(supervisor)(Left('No supervisor'));
});

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Either.Right('2'));
    eq(supervisor)(Right('John'));
});

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Either.Right('3'));
    eq(supervisor)(Right('Jane'));
});
