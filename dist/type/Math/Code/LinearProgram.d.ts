declare const LP_BOUND = 100;
declare function onBoundary(p: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the value of field at given point
 * ```typescript
 * FieldAt([0,0],[1,2,3]) // 3
 * FieldAt([1,2],[3,-4,5]) // 0
 * ```
 */
declare function FieldAt(p: Point, field: Field): number;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons
 * ```typescript
 * isConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] satisfies all the constraints
 * ```
 */
declare function isConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return check if point is constrained by cons, treating all cons as 'or equal to'
 * ```typescript
 * isLooseConstrained([
 *    [1, 1, "<=", 5],
 *    [1, -1, "<", 4],
 *    [2, 1, ">=", -5]
 * ], [0, 0])
 * // check whether [0,0] loosely satisfies all the constraints
 * ```
 */
declare function isLooseConstrained(cons: Constraint[], point: Point): boolean;
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasiblePolygon(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the vertices of the feasible polygon
 * ```typescript
 * FeasiblePolygon([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // [[-5,-5],[10,-5],[10,10],[-5,10]]
 * ```
 */
declare function FeasibleVertices(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return check if the feasible region is bounded
 * ```typescript
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 *    [1, 0, '>', -5],
 *    [0, 1, '<', 10],
 *    [0, 1, '>', -5]
 * ])
 * // true
 * FeasibleIsBounded([
 *    [1, 0, '<', 10],
 * ])
 * // false
 * ```
 */
declare function FeasibleIsBounded(...cons: Constraint[]): boolean;
/**
 *
 * @category LinearProgram
 * @return the integral points inside the feasible polygon
 * ```typescript
 * FeasibleIntegral([
 *    [1, 0, '<', 3],
 *    [1, 0, '>', 0],
 *    [0, 1, '<', 2],
 *    [0, 1, '>', 0]
 * ])
 * // [[1,1],[2,1]]
 * ```
 */
declare function FeasibleIntegral(...cons: Constraint[]): Point[];
/**
 *
 * @category LinearProgram
 * @return the point with the max value of field
 * ```typescript
 * MaximizePoint([[0,0],[10,10]],[1,2,3]) // [10,10]
 * ```
 */
declare function MaximizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min value of field
 * ```typescript
 * MinimizePoint([[0,0],[10,10]],[1,2,3]) // [0,0]
 * ```
 */
declare function MinimizePoint(points: Point[], field: Field): Point;
/**
 *
 * @category LinearProgram
 * @return the point with the min/max value of field
 * ```typescript
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [10,10]
 * OptimizePoint([[0,0],[10,10]],[1,2,3],true) // [0,0]
 * ```
 */
declare function OptimizePoint(points: Point[], field: Field, max: boolean): Point;
/**
 *
 * @category LinearProgram
 * @return the min/max value of field
 * ```typescript
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 33
 * OptimizeField([[0,0],[10,10]],[1,2,3],true) // 3
 * ```
 */
declare function OptimizeField(points: Point[], field: Field, max: boolean): number;
