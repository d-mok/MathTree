const DEFAULT_UNIT: { [_: string]: string } = {
    illuminance: 'lx',
    'luminous flux': 'lm',
    'overall thermal transfer value': 'W m-2',
    'thermal conductivity': 'W m-1  K-1',
    'thermal Transmittance': 'W m-2 K-1',
    'cooling capacity': 'W',
    'rate of conduction': 'W',
    effciency: '\\%',
    'angular speed': 'rad s-1',
    'angular displacement': 'rad',
    time: 's',
    distance: 'm',
    displacement: 'm',
    separation: 'm',
    speed: 'm s-1',
    velocity: 'm s-1',
    acceleration: 'm s-2',
    deceleration: 'm s-2',
    area: 'm2',
    volume: 'm3',
    height: 'm',
    radius: 'm',
    diameter: 'm',
    length: 'm',
    width: 'm',
    wavelength: 'm',
    capacitiy: 'm3',
    angle: '°',
    '∠': '°',
    energy: 'J',
    'molar mass': 'kg mol-1',
    mass: 'kg',
    'electromotive force': 'V',
    'specific heat capacity': 'J kg-1 °C-1',
    'heat capacity': 'J °C-1',
    temperature: '°C',
    'latent heat': 'J kg-1',
    pressure: 'Pa',
    'number of molecule': '',
    'number of mole': 'mol',
    force: 'N',
    weight: 'N',
    tension: 'N',
    'normal reaction': 'N',
    friction: 'N',
    moment: 'N m',
    power: 'W',
    'gravitational field strength': 'N kg-1',
    'angular position': '°',
    period: 's',
    frequency: 'Hz',
    amplitude: 'm',
    charge: 'C',
    current: 'A',
    voltage: 'V',
    resistance: 'Ω',
    'electric field strength': 'N C-1',
    'potential difference': 'V',
    resistivity: 'Ω m',
    emf: 'V',
    'e.m.f.': 'V',
    'magnetic field': 'B',
    'magnetic flux': 'Wb',
    activity: 'Bq',
    'half-life': 's',
    'decay constant': 's-1',
    density: 'kg m-3',
    KE: 'J',
    PE: 'J',
}

const BASE_UNITS = [
    'rad',
    'mol',
    'Wb',
    'Bq',
    'eV',
    '°C',
    'Pa',
    's',
    'm',
    'g',
    'A',
    'K',
    'J',
    'N',
    'W',
    'C',
    'V',
    'T',
    'u',
    'Ω',
]

const BASE_PREFIX = ['n', 'u', 'm', 'c', 'k', 'M', 'G', 'T', '']

const BASE_INDEX = ['-4', '-3', '-2', '-1', '1', '2', '3', '4']

export function findUnit(name: string): string | undefined {
    for (let k in DEFAULT_UNIT) {
        if (name.includes(k)) return DEFAULT_UNIT[k]
    }
    return undefined
}

export function parseUnit(raw: string): string {
    if (raw === '°') return '°'
    let T = ' ' + raw + ' '
    for (let u of BASE_UNITS) {
        if (!T.includes(u)) continue
        for (let p of BASE_PREFIX) {
            T = T.replaceAll(
                new RegExp('([^a-zA-z°])' + p + u + '([^a-zA-z°])', 'g'),
                '$1' + '~\\text{' + p + u + '}' + '$2'
            )
        }
    }
    for (let i of BASE_INDEX)
        T = T.replaceAll(
            new RegExp('([^0123456789-])' + i + '([^0123456789-])', 'g'),
            '$1' + '^{' + i + '}' + '$2'
        )
    return T
}
