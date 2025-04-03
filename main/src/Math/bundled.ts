import * as bundle from './bundle.js'

declare global {
    var ASTC: typeof bundle.ASTC
    var ASequence: typeof bundle.ASequence
    var ASsum: typeof bundle.ASsum
    var ASterm: typeof bundle.ASterm
    var Abs: typeof bundle.Abs
    var Angle: typeof bundle.Angle
    var AnglePolar: typeof bundle.AnglePolar
    var ArcLength: typeof bundle.ArcLength
    var AreAbsDistinct: typeof bundle.AreAbsDistinct
    var AreCoprime: typeof bundle.AreCoprime
    var AreDifferent: typeof bundle.AreDifferent
    var AreDistantPoint: typeof bundle.AreDistantPoint
    var AreDistinct: typeof bundle.AreDistinct
    var AreOblique: typeof bundle.AreOblique
    var AreSameSign: typeof bundle.AreSameSign
    var ArrangePoints: typeof bundle.ArrangePoints
    var At: typeof bundle.At
    var Bin: typeof bundle.Bin
    var Binomial: typeof bundle.Binomial
    var BuildAngle: typeof bundle.BuildAngle
    var BuildRatio: typeof bundle.BuildRatio
    var BuildSolve: typeof bundle.BuildSolve
    var BuildTrend: typeof bundle.BuildTrend
    var Ceil: typeof bundle.Ceil
    var Centroid: typeof bundle.Centroid
    var CheckVertices: typeof bundle.CheckVertices
    var ChessboardDistance: typeof bundle.ChessboardDistance
    var CircleFromGeneral: typeof bundle.CircleFromGeneral
    var CircleGeneral: typeof bundle.CircleGeneral
    var CircleLineIntersect: typeof bundle.CircleLineIntersect
    var CircleLinearIntersect: typeof bundle.CircleLinearIntersect
    var Circumcentre: typeof bundle.Circumcentre
    var ComboDisplay: typeof bundle.ComboDisplay
    var CompassBearing: typeof bundle.CompassBearing
    var ConstraintText: typeof bundle.ConstraintText
    var ConstraintsFromPoints: typeof bundle.ConstraintsFromPoints
    var Coord: typeof bundle.Coord
    var CosineLawAngle: typeof bundle.CosineLawAngle
    var CosineLawLength: typeof bundle.CosineLawLength
    var Crammer: typeof bundle.Crammer
    var Degree: typeof bundle.Degree
    var Dfrac: typeof bundle.Dfrac
    var Dir: typeof bundle.Dir
    var Discriminant: typeof bundle.Discriminant
    var Distance: typeof bundle.Distance
    var Divide: typeof bundle.Divide
    var Embed: typeof bundle.Embed
    var EmbedX: typeof bundle.EmbedX
    var EmbedY: typeof bundle.EmbedY
    var EmbedZ: typeof bundle.EmbedZ
    var ExplainTransforms: typeof bundle.ExplainTransforms
    var Extrude: typeof bundle.Extrude
    var Factorial: typeof bundle.Factorial
    var FeasibleIntegral: typeof bundle.FeasibleIntegral
    var FeasibleIsBounded: typeof bundle.FeasibleIsBounded
    var FeasiblePolygon: typeof bundle.FeasiblePolygon
    var FeasibleVertices: typeof bundle.FeasibleVertices
    var FieldAt: typeof bundle.FieldAt
    var Fix: typeof bundle.Fix
    var FixDown: typeof bundle.FixDown
    var FixUp: typeof bundle.FixUp
    var FlatZ: typeof bundle.FlatZ
    var Floor: typeof bundle.Floor
    var Flop: typeof bundle.Flop
    var Freq: typeof bundle.Freq
    var FreqTable: typeof bundle.FreqTable
    var Freqs: typeof bundle.Freqs
    var GSequence: typeof bundle.GSequence
    var GSsum: typeof bundle.GSsum
    var GSterm: typeof bundle.GSterm
    var GrammarJoin: typeof bundle.GrammarJoin
    var GroupCumFreqTable: typeof bundle.GroupCumFreqTable
    var GroupFreqTable: typeof bundle.GroupFreqTable
    var HCF: typeof bundle.HCF
    var HeightBySAS: typeof bundle.HeightBySAS
    var HeightBySSS: typeof bundle.HeightBySSS
    var HeightsBySAS: typeof bundle.HeightsBySAS
    var HeightsBySSS: typeof bundle.HeightsBySSS
    var Heron: typeof bundle.Heron
    var IQR: typeof bundle.IQR
    var Incentre: typeof bundle.Incentre
    var IndexToSurd: typeof bundle.IndexToSurd
    var IneqSign: typeof bundle.IneqSign
    var IntersectAngle: typeof bundle.IntersectAngle
    var Intersection: typeof bundle.Intersection
    var IsAbsBetween: typeof bundle.IsAbsBetween
    var IsAroundPoint: typeof bundle.IsAroundPoint
    var IsBetween: typeof bundle.IsBetween
    var IsConvexPolygon: typeof bundle.IsConvexPolygon
    var IsDecimal: typeof bundle.IsDecimal
    var IsEven: typeof bundle.IsEven
    var IsInteger: typeof bundle.IsInteger
    var IsNegative: typeof bundle.IsNegative
    var IsNonNegative: typeof bundle.IsNonNegative
    var IsNonNegativeInteger: typeof bundle.IsNonNegativeInteger
    var IsNonZero: typeof bundle.IsNonZero
    var IsNum: typeof bundle.IsNum
    var IsOdd: typeof bundle.IsOdd
    var IsPositive: typeof bundle.IsPositive
    var IsPositiveInteger: typeof bundle.IsPositiveInteger
    var IsProbability: typeof bundle.IsProbability
    var IsRational: typeof bundle.IsRational
    var IsReflex: typeof bundle.IsReflex
    var IsSquareNum: typeof bundle.IsSquareNum
    var IsTerminating: typeof bundle.IsTerminating
    var IsTriangle: typeof bundle.IsTriangle
    var LCM: typeof bundle.LCM
    var Lace: typeof bundle.Lace
    var LineFeat: typeof bundle.LineFeat
    var LineFromBisector: typeof bundle.LineFromBisector
    var LineFromIntercepts: typeof bundle.LineFromIntercepts
    var LineFromPointSlope: typeof bundle.LineFromPointSlope
    var LineFromTwoPoints: typeof bundle.LineFromTwoPoints
    var LinearFromBisector: typeof bundle.LinearFromBisector
    var LinearFromIntercepts: typeof bundle.LinearFromIntercepts
    var LinearFromPointSlope: typeof bundle.LinearFromPointSlope
    var LinearFromTwoPoints: typeof bundle.LinearFromTwoPoints
    var LongDivision: typeof bundle.LongDivision
    var LowerQ: typeof bundle.LowerQ
    var LowerQAt: typeof bundle.LowerQAt
    var LucasSequence: typeof bundle.LucasSequence
    var Max: typeof bundle.Max
    var MaximizeField: typeof bundle.MaximizeField
    var MaximizePoint: typeof bundle.MaximizePoint
    var Mean: typeof bundle.Mean
    var Median: typeof bundle.Median
    var MedianAt: typeof bundle.MedianAt
    var Mid: typeof bundle.Mid
    var Mid3D: typeof bundle.Mid3D
    var Min: typeof bundle.Min
    var MinimizeField: typeof bundle.MinimizeField
    var MinimizePoint: typeof bundle.MinimizePoint
    var Mode: typeof bundle.Mode
    var Move: typeof bundle.Move
    var MoveX: typeof bundle.MoveX
    var MoveY: typeof bundle.MoveY
    var OnCircle: typeof bundle.OnCircle
    var OptimizeField: typeof bundle.OptimizeField
    var OptimizePoint: typeof bundle.OptimizePoint
    var Orthocentre: typeof bundle.Orthocentre
    var PairTable: typeof bundle.PairTable
    var Partition: typeof bundle.Partition
    var PdFoot: typeof bundle.PdFoot
    var PdFoot3D: typeof bundle.PdFoot3D
    var PhyConst: typeof bundle.PhyConst
    var PhyEq: typeof bundle.PhyEq
    var PhyEqCls: typeof bundle.PhyEqCls
    var PolToRect: typeof bundle.PolToRect
    var PolarDiff: typeof bundle.PolarDiff
    var PolarReduce: typeof bundle.PolarReduce
    var PolyFunction: typeof bundle.PolyFunction
    var PolyPrint: typeof bundle.PolyPrint
    var PolySimplify: typeof bundle.PolySimplify
    var PolySort: typeof bundle.PolySort
    var PrimeFactorize: typeof bundle.PrimeFactorize
    var PrimeFactors: typeof bundle.PrimeFactors
    var Product: typeof bundle.Product
    var Pyth: typeof bundle.Pyth
    var PythLeg: typeof bundle.PythLeg
    var Quadrant: typeof bundle.Quadrant
    var QuadraticFromRoot: typeof bundle.QuadraticFromRoot
    var QuadraticFromVertex: typeof bundle.QuadraticFromVertex
    var QuadraticRoot: typeof bundle.QuadraticRoot
    var QuadraticSequence: typeof bundle.QuadraticSequence
    var QuadraticVertex: typeof bundle.QuadraticVertex
    var Radian: typeof bundle.Radian
    var Ratio: typeof bundle.Ratio
    var RectToPol: typeof bundle.RectToPol
    var ReflectX: typeof bundle.ReflectX
    var ReflectY: typeof bundle.ReflectY
    var RegularPolygon: typeof bundle.RegularPolygon
    var RndAngles: typeof bundle.RndAngles
    var RndCapitals: typeof bundle.RndCapitals
    var RndComposite: typeof bundle.RndComposite
    var RndConvexPolygon: typeof bundle.RndConvexPolygon
    var RndData: typeof bundle.RndData
    var RndEven: typeof bundle.RndEven
    var RndHe: typeof bundle.RndHe
    var RndLetters: typeof bundle.RndLetters
    var RndN: typeof bundle.RndN
    var RndNs: typeof bundle.RndNs
    var RndOdd: typeof bundle.RndOdd
    var RndOnCircle: typeof bundle.RndOnCircle
    var RndP: typeof bundle.RndP
    var RndPartition: typeof bundle.RndPartition
    var RndPick: typeof bundle.RndPick
    var RndPickN: typeof bundle.RndPickN
    var RndPickUnique: typeof bundle.RndPickUnique
    var RndPoint: typeof bundle.RndPoint
    var RndPointPolar: typeof bundle.RndPointPolar
    var RndPoints: typeof bundle.RndPoints
    var RndPoly: typeof bundle.RndPoly
    var RndPolynomial: typeof bundle.RndPolynomial
    var RndPyth: typeof bundle.RndPyth
    var RndQ: typeof bundle.RndQ
    var RndQs: typeof bundle.RndQs
    var RndR: typeof bundle.RndR
    var RndRatio: typeof bundle.RndRatio
    var RndRs: typeof bundle.RndRs
    var RndShake: typeof bundle.RndShake
    var RndShakeBase: typeof bundle.RndShakeBase
    var RndShakeCombo: typeof bundle.RndShakeCombo
    var RndShakeCompoundInequality: typeof bundle.RndShakeCompoundInequality
    var RndShakeConstraint: typeof bundle.RndShakeConstraint
    var RndShakeConstraints: typeof bundle.RndShakeConstraints
    var RndShakeG: typeof bundle.RndShakeG
    var RndShakeIneq: typeof bundle.RndShakeIneq
    var RndShakeN: typeof bundle.RndShakeN
    var RndShakePoint: typeof bundle.RndShakePoint
    var RndShakePointPolar: typeof bundle.RndShakePointPolar
    var RndShakeQ: typeof bundle.RndShakeQ
    var RndShakeQuantity: typeof bundle.RndShakeQuantity
    var RndShakeR: typeof bundle.RndShakeR
    var RndShakeRatio: typeof bundle.RndShakeRatio
    var RndShakeTrig: typeof bundle.RndShakeTrig
    var RndShakeTrigValue: typeof bundle.RndShakeTrigValue
    var RndShe: typeof bundle.RndShe
    var RndShuffle: typeof bundle.RndShuffle
    var RndT: typeof bundle.RndT
    var RndTriangle: typeof bundle.RndTriangle
    var RndTrigEqv: typeof bundle.RndTrigEqv
    var RndTrigValue: typeof bundle.RndTrigValue
    var RndU: typeof bundle.RndU
    var RndZ: typeof bundle.RndZ
    var RndZs: typeof bundle.RndZs
    var Rng: typeof bundle.Rng
    var Rotate: typeof bundle.Rotate
    var Round: typeof bundle.Round
    var RoundDown: typeof bundle.RoundDown
    var RoundUp: typeof bundle.RoundUp
    var ScaleCentroidToInt: typeof bundle.ScaleCentroidToInt
    var ScaleCircumcentreToInt: typeof bundle.ScaleCircumcentreToInt
    var ScaleIncentreToInt: typeof bundle.ScaleIncentreToInt
    var ScaleOrthocentreToInt: typeof bundle.ScaleOrthocentreToInt
    var ScaleTo: typeof bundle.ScaleTo
    var Sci: typeof bundle.Sci
    var SectorArea: typeof bundle.SectorArea
    var ShakeBase: typeof bundle.ShakeBase
    var ShakeCompoundInequality: typeof bundle.ShakeCompoundInequality
    var ShakeConstraint: typeof bundle.ShakeConstraint
    var ShakeConstraints: typeof bundle.ShakeConstraints
    var ShakeG: typeof bundle.ShakeG
    var ShakeIneq: typeof bundle.ShakeIneq
    var ShakeN: typeof bundle.ShakeN
    var ShakePoint: typeof bundle.ShakePoint
    var ShakePointPolar: typeof bundle.ShakePointPolar
    var ShakeQ: typeof bundle.ShakeQ
    var ShakeQuantity: typeof bundle.ShakeQuantity
    var ShakeR: typeof bundle.ShakeR
    var ShakeRatio: typeof bundle.ShakeRatio
    var ShakeTrigValue: typeof bundle.ShakeTrigValue
    var ShortDivision: typeof bundle.ShortDivision
    var SigFig: typeof bundle.SigFig
    var Sign: typeof bundle.Sign
    var SineLawAngle: typeof bundle.SineLawAngle
    var SineLawLength: typeof bundle.SineLawLength
    var Slide: typeof bundle.Slide
    var Slide3D: typeof bundle.Slide3D
    var Slope: typeof bundle.Slope
    var SlopePd: typeof bundle.SlopePd
    var SolveAAS: typeof bundle.SolveAAS
    var SolveASA: typeof bundle.SolveASA
    var SolveSAS: typeof bundle.SolveSAS
    var SolveSSA: typeof bundle.SolveSSA
    var SolveSSS: typeof bundle.SolveSSS
    var SolveTriangle: typeof bundle.SolveTriangle
    var Sort: typeof bundle.Sort
    var SortBy: typeof bundle.SortBy
    var Sqrt: typeof bundle.Sqrt
    var StatRange: typeof bundle.StatRange
    var StdDev: typeof bundle.StdDev
    var StemAndLeaf: typeof bundle.StemAndLeaf
    var Sum: typeof bundle.Sum
    var Summary: typeof bundle.Summary
    var Table: typeof bundle.Table
    var ToBase: typeof bundle.ToBase
    var ToFrac: typeof bundle.ToFrac
    var TransformFunc: typeof bundle.TransformFunc
    var TriangleFromPoint: typeof bundle.TriangleFromPoint
    var TriangleFromVertex: typeof bundle.TriangleFromVertex
    var TrigSolve: typeof bundle.TrigSolve
    var UniMode: typeof bundle.UniMode
    var UpperQ: typeof bundle.UpperQ
    var UpperQAt: typeof bundle.UpperQAt
    var VecAdd: typeof bundle.VecAdd
    var WholeBearing: typeof bundle.WholeBearing
    var ZScore: typeof bundle.ZScore
    var arccos: typeof bundle.arccos
    var arcsin: typeof bundle.arcsin
    var arctan: typeof bundle.arctan
    var cos: typeof bundle.cos
    var differentiate: typeof bundle.differentiate
    var functionize: typeof bundle.functionize
    var getMaxDeg: typeof bundle.getMaxDeg
    var integrate: typeof bundle.integrate
    var isConstrained: typeof bundle.isConstrained
    var isLooseConstrained: typeof bundle.isLooseConstrained
    var log: typeof bundle.log
    var nCr: typeof bundle.nCr
    var nPr: typeof bundle.nPr
    var sin: typeof bundle.sin
    var tan: typeof bundle.tan
    var xPolynomial: typeof bundle.xPolynomial
}

globalThis.ASTC = bundle.ASTC
globalThis.ASequence = bundle.ASequence
globalThis.ASsum = bundle.ASsum
globalThis.ASterm = bundle.ASterm
globalThis.Abs = bundle.Abs
globalThis.Angle = bundle.Angle
globalThis.AnglePolar = bundle.AnglePolar
globalThis.ArcLength = bundle.ArcLength
globalThis.AreAbsDistinct = bundle.AreAbsDistinct
globalThis.AreCoprime = bundle.AreCoprime
globalThis.AreDifferent = bundle.AreDifferent
globalThis.AreDistantPoint = bundle.AreDistantPoint
globalThis.AreDistinct = bundle.AreDistinct
globalThis.AreOblique = bundle.AreOblique
globalThis.AreSameSign = bundle.AreSameSign
globalThis.ArrangePoints = bundle.ArrangePoints
globalThis.At = bundle.At
globalThis.Bin = bundle.Bin
globalThis.Binomial = bundle.Binomial
globalThis.BuildAngle = bundle.BuildAngle
globalThis.BuildRatio = bundle.BuildRatio
globalThis.BuildSolve = bundle.BuildSolve
globalThis.BuildTrend = bundle.BuildTrend
globalThis.Ceil = bundle.Ceil
globalThis.Centroid = bundle.Centroid
globalThis.CheckVertices = bundle.CheckVertices
globalThis.ChessboardDistance = bundle.ChessboardDistance
globalThis.CircleFromGeneral = bundle.CircleFromGeneral
globalThis.CircleGeneral = bundle.CircleGeneral
globalThis.CircleLineIntersect = bundle.CircleLineIntersect
globalThis.CircleLinearIntersect = bundle.CircleLinearIntersect
globalThis.Circumcentre = bundle.Circumcentre
globalThis.ComboDisplay = bundle.ComboDisplay
globalThis.CompassBearing = bundle.CompassBearing
globalThis.ConstraintText = bundle.ConstraintText
globalThis.ConstraintsFromPoints = bundle.ConstraintsFromPoints
globalThis.Coord = bundle.Coord
globalThis.CosineLawAngle = bundle.CosineLawAngle
globalThis.CosineLawLength = bundle.CosineLawLength
globalThis.Crammer = bundle.Crammer
globalThis.Degree = bundle.Degree
globalThis.Dfrac = bundle.Dfrac
globalThis.Dir = bundle.Dir
globalThis.Discriminant = bundle.Discriminant
globalThis.Distance = bundle.Distance
globalThis.Divide = bundle.Divide
globalThis.Embed = bundle.Embed
globalThis.EmbedX = bundle.EmbedX
globalThis.EmbedY = bundle.EmbedY
globalThis.EmbedZ = bundle.EmbedZ
globalThis.ExplainTransforms = bundle.ExplainTransforms
globalThis.Extrude = bundle.Extrude
globalThis.Factorial = bundle.Factorial
globalThis.FeasibleIntegral = bundle.FeasibleIntegral
globalThis.FeasibleIsBounded = bundle.FeasibleIsBounded
globalThis.FeasiblePolygon = bundle.FeasiblePolygon
globalThis.FeasibleVertices = bundle.FeasibleVertices
globalThis.FieldAt = bundle.FieldAt
globalThis.Fix = bundle.Fix
globalThis.FixDown = bundle.FixDown
globalThis.FixUp = bundle.FixUp
globalThis.FlatZ = bundle.FlatZ
globalThis.Floor = bundle.Floor
globalThis.Flop = bundle.Flop
globalThis.Freq = bundle.Freq
globalThis.FreqTable = bundle.FreqTable
globalThis.Freqs = bundle.Freqs
globalThis.GSequence = bundle.GSequence
globalThis.GSsum = bundle.GSsum
globalThis.GSterm = bundle.GSterm
globalThis.GrammarJoin = bundle.GrammarJoin
globalThis.GroupCumFreqTable = bundle.GroupCumFreqTable
globalThis.GroupFreqTable = bundle.GroupFreqTable
globalThis.HCF = bundle.HCF
globalThis.HeightBySAS = bundle.HeightBySAS
globalThis.HeightBySSS = bundle.HeightBySSS
globalThis.HeightsBySAS = bundle.HeightsBySAS
globalThis.HeightsBySSS = bundle.HeightsBySSS
globalThis.Heron = bundle.Heron
globalThis.IQR = bundle.IQR
globalThis.Incentre = bundle.Incentre
globalThis.IndexToSurd = bundle.IndexToSurd
globalThis.IneqSign = bundle.IneqSign
globalThis.IntersectAngle = bundle.IntersectAngle
globalThis.Intersection = bundle.Intersection
globalThis.IsAbsBetween = bundle.IsAbsBetween
globalThis.IsAroundPoint = bundle.IsAroundPoint
globalThis.IsBetween = bundle.IsBetween
globalThis.IsConvexPolygon = bundle.IsConvexPolygon
globalThis.IsDecimal = bundle.IsDecimal
globalThis.IsEven = bundle.IsEven
globalThis.IsInteger = bundle.IsInteger
globalThis.IsNegative = bundle.IsNegative
globalThis.IsNonNegative = bundle.IsNonNegative
globalThis.IsNonNegativeInteger = bundle.IsNonNegativeInteger
globalThis.IsNonZero = bundle.IsNonZero
globalThis.IsNum = bundle.IsNum
globalThis.IsOdd = bundle.IsOdd
globalThis.IsPositive = bundle.IsPositive
globalThis.IsPositiveInteger = bundle.IsPositiveInteger
globalThis.IsProbability = bundle.IsProbability
globalThis.IsRational = bundle.IsRational
globalThis.IsReflex = bundle.IsReflex
globalThis.IsSquareNum = bundle.IsSquareNum
globalThis.IsTerminating = bundle.IsTerminating
globalThis.IsTriangle = bundle.IsTriangle
globalThis.LCM = bundle.LCM
globalThis.Lace = bundle.Lace
globalThis.LineFeat = bundle.LineFeat
globalThis.LineFromBisector = bundle.LineFromBisector
globalThis.LineFromIntercepts = bundle.LineFromIntercepts
globalThis.LineFromPointSlope = bundle.LineFromPointSlope
globalThis.LineFromTwoPoints = bundle.LineFromTwoPoints
globalThis.LinearFromBisector = bundle.LinearFromBisector
globalThis.LinearFromIntercepts = bundle.LinearFromIntercepts
globalThis.LinearFromPointSlope = bundle.LinearFromPointSlope
globalThis.LinearFromTwoPoints = bundle.LinearFromTwoPoints
globalThis.LongDivision = bundle.LongDivision
globalThis.LowerQ = bundle.LowerQ
globalThis.LowerQAt = bundle.LowerQAt
globalThis.LucasSequence = bundle.LucasSequence
globalThis.Max = bundle.Max
globalThis.MaximizeField = bundle.MaximizeField
globalThis.MaximizePoint = bundle.MaximizePoint
globalThis.Mean = bundle.Mean
globalThis.Median = bundle.Median
globalThis.MedianAt = bundle.MedianAt
globalThis.Mid = bundle.Mid
globalThis.Mid3D = bundle.Mid3D
globalThis.Min = bundle.Min
globalThis.MinimizeField = bundle.MinimizeField
globalThis.MinimizePoint = bundle.MinimizePoint
globalThis.Mode = bundle.Mode
globalThis.Move = bundle.Move
globalThis.MoveX = bundle.MoveX
globalThis.MoveY = bundle.MoveY
globalThis.OnCircle = bundle.OnCircle
globalThis.OptimizeField = bundle.OptimizeField
globalThis.OptimizePoint = bundle.OptimizePoint
globalThis.Orthocentre = bundle.Orthocentre
globalThis.PairTable = bundle.PairTable
globalThis.Partition = bundle.Partition
globalThis.PdFoot = bundle.PdFoot
globalThis.PdFoot3D = bundle.PdFoot3D
globalThis.PhyConst = bundle.PhyConst
globalThis.PhyEq = bundle.PhyEq
globalThis.PhyEqCls = bundle.PhyEqCls
globalThis.PolToRect = bundle.PolToRect
globalThis.PolarDiff = bundle.PolarDiff
globalThis.PolarReduce = bundle.PolarReduce
globalThis.PolyFunction = bundle.PolyFunction
globalThis.PolyPrint = bundle.PolyPrint
globalThis.PolySimplify = bundle.PolySimplify
globalThis.PolySort = bundle.PolySort
globalThis.PrimeFactorize = bundle.PrimeFactorize
globalThis.PrimeFactors = bundle.PrimeFactors
globalThis.Product = bundle.Product
globalThis.Pyth = bundle.Pyth
globalThis.PythLeg = bundle.PythLeg
globalThis.Quadrant = bundle.Quadrant
globalThis.QuadraticFromRoot = bundle.QuadraticFromRoot
globalThis.QuadraticFromVertex = bundle.QuadraticFromVertex
globalThis.QuadraticRoot = bundle.QuadraticRoot
globalThis.QuadraticSequence = bundle.QuadraticSequence
globalThis.QuadraticVertex = bundle.QuadraticVertex
globalThis.Radian = bundle.Radian
globalThis.Ratio = bundle.Ratio
globalThis.RectToPol = bundle.RectToPol
globalThis.ReflectX = bundle.ReflectX
globalThis.ReflectY = bundle.ReflectY
globalThis.RegularPolygon = bundle.RegularPolygon
globalThis.RndAngles = bundle.RndAngles
globalThis.RndCapitals = bundle.RndCapitals
globalThis.RndComposite = bundle.RndComposite
globalThis.RndConvexPolygon = bundle.RndConvexPolygon
globalThis.RndData = bundle.RndData
globalThis.RndEven = bundle.RndEven
globalThis.RndHe = bundle.RndHe
globalThis.RndLetters = bundle.RndLetters
globalThis.RndN = bundle.RndN
globalThis.RndNs = bundle.RndNs
globalThis.RndOdd = bundle.RndOdd
globalThis.RndOnCircle = bundle.RndOnCircle
globalThis.RndP = bundle.RndP
globalThis.RndPartition = bundle.RndPartition
globalThis.RndPick = bundle.RndPick
globalThis.RndPickN = bundle.RndPickN
globalThis.RndPickUnique = bundle.RndPickUnique
globalThis.RndPoint = bundle.RndPoint
globalThis.RndPointPolar = bundle.RndPointPolar
globalThis.RndPoints = bundle.RndPoints
globalThis.RndPoly = bundle.RndPoly
globalThis.RndPolynomial = bundle.RndPolynomial
globalThis.RndPyth = bundle.RndPyth
globalThis.RndQ = bundle.RndQ
globalThis.RndQs = bundle.RndQs
globalThis.RndR = bundle.RndR
globalThis.RndRatio = bundle.RndRatio
globalThis.RndRs = bundle.RndRs
globalThis.RndShake = bundle.RndShake
globalThis.RndShakeBase = bundle.RndShakeBase
globalThis.RndShakeCombo = bundle.RndShakeCombo
globalThis.RndShakeCompoundInequality = bundle.RndShakeCompoundInequality
globalThis.RndShakeConstraint = bundle.RndShakeConstraint
globalThis.RndShakeConstraints = bundle.RndShakeConstraints
globalThis.RndShakeG = bundle.RndShakeG
globalThis.RndShakeIneq = bundle.RndShakeIneq
globalThis.RndShakeN = bundle.RndShakeN
globalThis.RndShakePoint = bundle.RndShakePoint
globalThis.RndShakePointPolar = bundle.RndShakePointPolar
globalThis.RndShakeQ = bundle.RndShakeQ
globalThis.RndShakeQuantity = bundle.RndShakeQuantity
globalThis.RndShakeR = bundle.RndShakeR
globalThis.RndShakeRatio = bundle.RndShakeRatio
globalThis.RndShakeTrig = bundle.RndShakeTrig
globalThis.RndShakeTrigValue = bundle.RndShakeTrigValue
globalThis.RndShe = bundle.RndShe
globalThis.RndShuffle = bundle.RndShuffle
globalThis.RndT = bundle.RndT
globalThis.RndTriangle = bundle.RndTriangle
globalThis.RndTrigEqv = bundle.RndTrigEqv
globalThis.RndTrigValue = bundle.RndTrigValue
globalThis.RndU = bundle.RndU
globalThis.RndZ = bundle.RndZ
globalThis.RndZs = bundle.RndZs
globalThis.Rng = bundle.Rng
globalThis.Rotate = bundle.Rotate
globalThis.Round = bundle.Round
globalThis.RoundDown = bundle.RoundDown
globalThis.RoundUp = bundle.RoundUp
globalThis.ScaleCentroidToInt = bundle.ScaleCentroidToInt
globalThis.ScaleCircumcentreToInt = bundle.ScaleCircumcentreToInt
globalThis.ScaleIncentreToInt = bundle.ScaleIncentreToInt
globalThis.ScaleOrthocentreToInt = bundle.ScaleOrthocentreToInt
globalThis.ScaleTo = bundle.ScaleTo
globalThis.Sci = bundle.Sci
globalThis.SectorArea = bundle.SectorArea
globalThis.ShakeBase = bundle.ShakeBase
globalThis.ShakeCompoundInequality = bundle.ShakeCompoundInequality
globalThis.ShakeConstraint = bundle.ShakeConstraint
globalThis.ShakeConstraints = bundle.ShakeConstraints
globalThis.ShakeG = bundle.ShakeG
globalThis.ShakeIneq = bundle.ShakeIneq
globalThis.ShakeN = bundle.ShakeN
globalThis.ShakePoint = bundle.ShakePoint
globalThis.ShakePointPolar = bundle.ShakePointPolar
globalThis.ShakeQ = bundle.ShakeQ
globalThis.ShakeQuantity = bundle.ShakeQuantity
globalThis.ShakeR = bundle.ShakeR
globalThis.ShakeRatio = bundle.ShakeRatio
globalThis.ShakeTrigValue = bundle.ShakeTrigValue
globalThis.ShortDivision = bundle.ShortDivision
globalThis.SigFig = bundle.SigFig
globalThis.Sign = bundle.Sign
globalThis.SineLawAngle = bundle.SineLawAngle
globalThis.SineLawLength = bundle.SineLawLength
globalThis.Slide = bundle.Slide
globalThis.Slide3D = bundle.Slide3D
globalThis.Slope = bundle.Slope
globalThis.SlopePd = bundle.SlopePd
globalThis.SolveAAS = bundle.SolveAAS
globalThis.SolveASA = bundle.SolveASA
globalThis.SolveSAS = bundle.SolveSAS
globalThis.SolveSSA = bundle.SolveSSA
globalThis.SolveSSS = bundle.SolveSSS
globalThis.SolveTriangle = bundle.SolveTriangle
globalThis.Sort = bundle.Sort
globalThis.SortBy = bundle.SortBy
globalThis.Sqrt = bundle.Sqrt
globalThis.StatRange = bundle.StatRange
globalThis.StdDev = bundle.StdDev
globalThis.StemAndLeaf = bundle.StemAndLeaf
globalThis.Sum = bundle.Sum
globalThis.Summary = bundle.Summary
globalThis.Table = bundle.Table
globalThis.ToBase = bundle.ToBase
globalThis.ToFrac = bundle.ToFrac
globalThis.TransformFunc = bundle.TransformFunc
globalThis.TriangleFromPoint = bundle.TriangleFromPoint
globalThis.TriangleFromVertex = bundle.TriangleFromVertex
globalThis.TrigSolve = bundle.TrigSolve
globalThis.UniMode = bundle.UniMode
globalThis.UpperQ = bundle.UpperQ
globalThis.UpperQAt = bundle.UpperQAt
globalThis.VecAdd = bundle.VecAdd
globalThis.WholeBearing = bundle.WholeBearing
globalThis.ZScore = bundle.ZScore
globalThis.arccos = bundle.arccos
globalThis.arcsin = bundle.arcsin
globalThis.arctan = bundle.arctan
globalThis.cos = bundle.cos
globalThis.differentiate = bundle.differentiate
globalThis.functionize = bundle.functionize
globalThis.getMaxDeg = bundle.getMaxDeg
globalThis.integrate = bundle.integrate
globalThis.isConstrained = bundle.isConstrained
globalThis.isLooseConstrained = bundle.isLooseConstrained
globalThis.log = bundle.log
globalThis.nCr = bundle.nCr
globalThis.nPr = bundle.nPr
globalThis.sin = bundle.sin
globalThis.tan = bundle.tan
globalThis.xPolynomial = bundle.xPolynomial
