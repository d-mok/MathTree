import { custom } from './custom.js'

export function object(schema?: Record<string, Checker>) {
    if (schema !== undefined) {
        return custom<Record<string, any>>(
            $ =>
                typeof $ === 'object' &&
                $ !== null &&
                Object.entries(schema).every(
                    ([k, v]) => k in $ && v(($ as any)[k])
                ),
            `object(${Object.entries(schema)
                .map(([k, v]) => v + ':' + v.name)
                .join(',')})`
        )
    } else {
        return custom<Record<string, any>>(
            $ => typeof $ === 'object' && $ !== null,
            'object'
        )
    }
}
