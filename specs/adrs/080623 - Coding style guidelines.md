# Coding style guidelines

Coding style is managed by EsLint

These guidelines were established during sprint 1, but official documentation was never added

## These are the following things EsLint checks for:
- When speech marks are used, always use single quotes. i.e ''
- Variables that are not reassigned within their scope must be declared using 'const'
- No trailing spaces at the end of each line
- Include a semi-colon after every single line
- /* function name */ must be included at the end of each function behind the last curly bracket
- JsDocs function commenting including parameter types and names, return type.

## Coding style that isnt checked by EsLint:
- Function naming: 
  - Camel Case
- Simple explanation of function in the comments.

## This is an example of a function
```javascript
/**
 * This is an example function that adds two numbers
 * @param { Integer } a First number
 * @param { Integer } b Second number
 * @return { Integer } a + b
 */ 
function exampleFunction(a, b) {
	const STRING = 'The sum is: ';
	let result;
	result = Number(a) + Number(b);
	return `${STRING} ${result}`
} /* exampleFunction */
 
````

