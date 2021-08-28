# 1. Authoring

## Content

-  The content editor can be used as  **MS Word**.
-  The symbol `*` signify a  **variable**.
    e.g. `*x` will be substituted by the value of  `x`  from code.
-  **LaTex**  is used in equation objects. See  [KaTeX](https://katex.org/docs/supported.html)  for a list of supported syntax.
-  **Answer options**  must be listed as bullet points.
    The  **first option**  must be the  **correct answer**. e.g.
    -   I only
    -   I and II only
    -   I and III only
    -   I, II and III only




## Populate

-  All  **variables**  must be defined here, e.g. `x = 1`.
-  All  **alphabets**  (`a-z`,`A-Z`) are pre-declared as variables.
   Once defined, their values can be substituted in the **content**.
-  Each line should end with a  **semicolon**  `;`.

## Validate

-  All variables  **validation**  should be done here, e.g. `x < 10`.
-  Must return a **single Boolean expression**, no matter how complex.
-  **One line**  should contain only  **one condition**  for clarity.
-  If no validation is needed, just left it blank.
-  Some common  **logical operators**:
    -   and:  `x && y`
    -   or:  `x || y`
    -   not:  `!x`
    -   equal:  `x === y`
    -   unequal:  `x !== y`

## Processing

-  This is for  **manipulating the content as html strings**.  
   e.g. `question = question.replaceAll('3','three')`.
-  Can access the  **question html string**  as  `question`.
-  Can access the  **solution html string**  as  `solution`.
-  **Preprocess**  code are executed  **before**  substituting the variables.
-  **Postprocess**  code are executed  **after**  substituting the variables.

## Code Execution Flow

1.  Run **populate**  to define to variables.
2.  Run **validate**.  
    If failed, populate again and again until validation passed.  
    The execution will stop after 1000 failed trials.
3.  Run **preprocess**.
4.  **Substitute**  the variables, and do some smart adjustment:
    -   Round all decimal variables to 5 significant figures.
    -   Correct minus signs, e.g. `x- -y` become `x+y`.
    -   Correct unit coefficient, e.g. `x+1y` become `x+y`.
5.  Run **postprocess**.
6.  **Shuffle**  the answer options.  
    If duplicated options are found, the whole execution will restart from step 1.

# 2. Reference

## Common JavaScript Reference

|structure| code 
|--|--|
| Declare variable	| `let myVariable = 1` |
| If Then Else	| `if(condition){DoSomething}else{DoOtherThing}` |
| Loop	| `for(let i=1; i<10; i++){DoSomething}` |
| Array | `arr = [1,2,3];` |
| Array Element	| `x = arr[0]; y = arr[1];` |
| Array Deconstruction	| `[a,b,c]=[1,2,3]`  (same as  `a=1; b=2; c=3;`) |
| Array Spreading	| `sum(...[1,2,3])` (same as `sum(1,2,3)`) |
| Print Debug	| `console.log(x)` |


## Common LaTex Reference

|symbol| code | LaTex |
|--|--|--|
| Superscript | `a^{b}` | $a^{b}$ |
| Subscript| `a_{b}` | $a_{b}$ |
| Fraction| `\dfrac{a}{b}` | $\dfrac{a}{b}$ |
| Square Root| `\sqrt{x}` | $\sqrt{x}$  |
| Equation Alignment| `\begin{aligned} 2x-4&=10 \\ x&=7 \end{aligned}` | $\begin{aligned} 2x-4&=10 \\ x&=7 \end{aligned}$   |

## Printing Variables

| type | variable | print code | result |
|--|--|--|--|
|number| `a = 1.23`	| `*a` | 1.23 |
|string| `a = "hello"`	| `*a` | hello |
|boolean| `a = true`	| `*a` | ✓ |
|boolean| `a = false`	| `*a` | ✕ |
|point| `a = [1,2]`	| `*a` | (1, 2) |
|combo|`a = [true,true,false]`|`*a`|I and II only|
|polynomial|`a = poly`|`*a`|1x^{3}+2x^{4}|
|trig value|`a = ['sin',60]`|`*a`|\sin 60°|
|trig value|`a = ['sin','x']`|`*a`|\sin x|
|trig expression|`a = ['sin',90,-1,'x']`|`*a`|\sin(90° - x)|
|surd| `a = 18**0.5` | `*!a` | 3\sqrt{2} |
|fraction| `a = 0.5` | `*/a` | \dfrac{1}{2} |
|small fraction| `a = 0.5`	| `*//a` | 1/2 |
|bracket fraction| `a = 0.5`	| `*/(a)` |\left ( \dfrac{1}{2} \right ) |
|bracket fraction| `a = 5`	| `*/(a)` |5 |
|bracket fraction| `a = -5`	| `*/(a)` |(-5) |
|sci notation|`a = 0.0000123`	| `**a` | 1.23 \times 10^{-5} |
|bracket negative|`a = -2`|`*(a)`| (-2)|
|bracket negative|`a = 2`|`*(a)`| 2|
|absolute value|`a = -1.23`|`*|a|`| 1.23|
|sign|`a = 5`|`*^+_a`|+|
|sign|`a = -5`|`*^+_a`| - |
|opposite sign|`a = 5`|`*^-_a`| - |
|opposite sign|`a = -5`|`*^-_a`| + |
|percentage|`a = 0.123`|`*%a`| 12.3%|
|percentage|`a = 0.123`|`*\%a`| 12.3\%|
|ratio|`a = 0.5`|`*:a`| 1:2|
|ratio|`a = [2,4,6]`|`*:a`| 1:2:3|
|ineq sign|`a = true`|`*^\gt_a`| \gt|
|ineq sign|`a = false`|`*^\gt_a`| \lt|
|ineq sign|`a = true`|`*^\lt_a`| \lt|
|ineq sign|`a = false`|`*^\lt_a`| \gt|
|ineq sign|`a = true`|`*^\ge_a`| \ge|
|ineq sign|`a = false`|`*^\ge_a`| \le|
|ineq sign|`a = true`|`*^\le_a`| \le|
|ineq sign|`a = false`|`*^\le_a`| \ge|
|or trig root|`a = [30,60,90,undefined]`|`*|.a`| 30°~~\text{or}~~60°~~\text{or}~~90°|
|polar coordinates|`a = [sqrt(3),3]`|`*.a`| (2*sqrt(3), 60\degree)|

# 3. Advance Functions

## Inline Code

- **JavaScript code** can be written in **content** using `*{...}` .
For example, `*{1+1}` will print `2`.
- `*\{...\}` do the same as `*{...}`, but also display the brackets in equation object.
- `*/{...}` and `**{...}` work similarly.

## Sections (Deprecated)
**Sections** can be used in **content**:

> \#\#1.1  
> section 1.1 here.  
> \#\#  
> \#\#1.2  
> section 1.2 here.  
> \#\#

If `sections = [[1,2]]` is defined in **populate**, only section 1.2 will be shown.

## Conditional Sections

We can decide whether to show a section or not by a condition: `##{condition}`

> \#\#{true}  
> This will be shown.  
> \#\#

> \#\#{false}  
> This will NOT be shown.  
> \#\#

## Options

### With One Option

If the **question** contains only one answer option:
> What is 1+1?
>- *a

and **populate** contains
```
a = 2
options = {a: [3, 4, 5]}
```
then it's equivalent to
> What is 1+1?
>- 2
>- 3
>- 4
>- 5

If the options is left blank: `options = {a}`, then `RndShake()`  will be called on `a` to generate 3 random options.

### With Two Options

If the **question** contains only two answer options:
> What is 1+1?
>- *a
>- \-*a

and **populate** contains
```
a = 2
options = {a: [3]}
```
then it's equivalent to
> What is 1+1?
>- 2
>- \-2
>- 3
>- \-3

## Answer

Normally, the first option must be the correct answer.  
This can be changed by:
`answer = "B"`  
so that the second option is the correct answer.

## Answer Option Mapping

To get the answer option key after shuffling, use `{#A}`.
For example, if option A is shuffled to C, then `{#A}` will print `C`.

