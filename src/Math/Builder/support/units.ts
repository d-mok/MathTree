
export const DEFAULT_UNIT: { [_: string]: string } = {
    'time': 's',
    'distance': 'm',
    'displacement': 'm',
    'separation': 'm',
    'speed': 'm s-1',
    'velocity': 'm s-1',
    'acceleration': 'm s-2',
    'deceleration': 'm s-2',
    'area': 'm2',
    'volume': 'm3',
    'height': 'm',
    'radius': 'm',
    'length': 'm',
    'width': 'm',
    'wavelength': 'm',
    'capacitiy': 'm3',
    'angle': 'o',
    'energy': 'J',
    'mass': 'kg',
    'heat capacity': 'J oC-1',
    'specific heat capacity': 'J kg-1 oC-1',
    'temperature': 'oC',
    'latent heat': 'J kg-1',
    'pressure': 'Pa',
    'mole': 'mol',
    'force': 'N',
    'weight': 'N',
    'tension': 'N',
    'normal reaction': 'N',
    'friction': 'N',
    'moment': 'N m',
    'power': 'W',
    'angular speed': 'rad s-1',
    'angular displacement': 'rad',
    'gravitational field strength': 'm s-2',
    'angular position': 'o',
    'period': 's',
    'frequency': 'Hz',
    'amplitude': 'm',
    'charge': 'C',
    'current': 'A',
    'voltage': 'V',
    'resistance': 'ohm',
    'electric field strength': 'N C-1',
    'potential difference': 'V',
    'resistivity': 'ohm m',
    'emf': 'V',
    'e.m.f.': 'V',
    'electromotive force': 'V',
    'magnetic field': 'B',
    'magnetic flux': 'Wb',
    'activity': 'Bq',
    'half-life': 's',
    'decay constant': 's-1',
    'density': 'kg m-3'
}

const BASE_UNITS = [
    '\\Omega',
    'rad', 'mol',
    'Wb', 'Bq', 'eV', '°C', 'Pa',
    's', 'm', 'g', 'A', 'K', 'J', 'N', 'W', 'C', 'V', 'T', 'u',
]

const BASE_PREFIX = ['n', 'u', 'm', 'c', 'k', 'M', 'G', 'T', '']

const BASE_INDEX = ['-4', '-3', '-2', '-1', '1', '2', '3', '4']

export function parseUnit(raw: string): string {
    let T = raw.replaceAll(" ", "")
    T = T.replaceAll("ohm", "\\Omega")
    T = T.replaceAll("oC", "°C")
    T = T.replaceAll("o", "°")
    for (let u of BASE_UNITS) {
        if (!T.includes(u)) continue
        for (let p of BASE_PREFIX) {
            T = T.replaceAll(p + u, "~\\text{" + p + u + "}")
        }
    }
    for (let i of BASE_INDEX)
        T = T.replaceAll(i, "^{" + i + "}")
    return T
}