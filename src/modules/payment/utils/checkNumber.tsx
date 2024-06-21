function isNumeric(input: string | number): boolean {
    const str = String(input); // convert input to string
    return (
        !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

export default isNumeric;
