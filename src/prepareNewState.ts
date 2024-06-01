export function prepareNewState<T extends {}>(currentState: Array<T>, current: T, stateChanger: (a: T) => T): Array<T> {
    const index = currentState.indexOf(current);
    const newState = [...currentState];
    const replacement = stateChanger(current);
    newState[index] = replacement;
    return newState;
}