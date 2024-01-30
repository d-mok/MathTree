import { custom } from "./custom.js";

export function array(): TypeGuard<any[]>
export function array<T>(guard: TypeGuard<T>): TypeGuard<T[]>
export function array(guard?: Checker) {
    return guard !== undefined
        ? custom(
              $ => Array.isArray($) && $.every(guard),
              `array(${guard.name})`
          )
        : custom($ => Array.isArray($), 'array')
}
