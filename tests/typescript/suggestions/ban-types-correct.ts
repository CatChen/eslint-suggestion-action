/* eslint-disable */
/* eslint-enable @typescript-eslint/ban-types */
/*eslint @typescript-eslint/ban-types: "error"*/

// use a proper function type
const func: () => number = () => 1;

// use safer object types
const lowerObj: object = {};
const capitalObj: { a: string } = { a: 'string' };

const curly1: number = 1;
const curly2: Record<'a', string> = { a: 'string' };
