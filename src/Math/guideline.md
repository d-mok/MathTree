### Error Handling
- A function expects arguments of the correct javascript type. No runtime type check is performed.
- If the inputed arguments produce a mathematically undefined output, the function throws a MATHERROR.
- If the inputed arguments produce a output which suggests that the function is not intended to be used with these arguments, the function throws a MATHERROR.
- A function never returns `undefined`.
- A function may returns `null` to signify an empty result.
