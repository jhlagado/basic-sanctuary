import { equals, Left, Right, show } from 'sanctuary';
import { EmployeeRepository, getSupervisorName } from './employee-repo';

//    eq :: Any -> Any -> Undefined !
const eq = (expected) => (actual) => {
    expect(show(expected)).toEqual(show(actual));
    expect(equals(expected)(actual)).toBe(true);
};

const repo = new EmployeeRepository();

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Right('1'));
    eq(supervisor)(Left('No supervisor'));
});

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Right('2'));
    eq(supervisor)(Right('John'));
});

test('should get the supervisor name for id', () => {
    const supervisor = getSupervisorName(repo, Right('3'));
    eq(supervisor)(Right('Jane'));
});
