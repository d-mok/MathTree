export type px = number
export type dot = [px, px]
export type inch = number
export type Point2D = [number, number]
export type Point3D = [number, number, number]
export type Point = Point2D | Point3D


export type circle = [center: Point2D, radius: number]
export type sphere = [center: Point3D, radius: number]
export type quadratic = [a: number, b: number, c: number, scale: number]

export type capturable = Point | circle | sphere | quadratic