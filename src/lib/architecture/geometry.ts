/**
 * CANONICAL ARCHITECTURE GEOMETRY SYSTEM & FORENSIC REGISTER
 * Senior Living Citizens Foundation — Kheri Asra, Jhajjar / Delhi NCR Corridor
 * 
 * Source Document: masterplan-real.jpg (The Vision Architects & Consultants, Ar. Yash Garg)
 * Coordinate System:
 *   Origin (0,0,0): Central intersection of 33'-0" East-West dividing highway and 22'-6" Central Spine Rasta
 *   +X: East (towards Chhudani / SH-22 Jhajjar - Bahadurgarh & Reliance MET City)
 *   -X: West (towards Rewari Khera / Chhara & NH-71)
 *   +Y: Up (Elevation / Height above ground)
 *   +Z: South (Southern Sector: Hospital, Block B, Block C 34-36, Block D, Block E, Block A 61-64)
 *   -Z: North (Northern Sector: Block A 1-9, Block C 10/21/22, Block F 11-20/23-27, Mandir, Utility)
 * 
 * Metric Scaling Standard:
 *   1 Architectural Foot = 0.3048 Meters (1:1 3D scene units in meters)
 */

export interface CadBoundingBox {
  x: number;      // Center X in 3D Scene units (meters)
  z: number;      // Center Z in 3D Scene units (meters)
  width: number;  // Width along X axis in scene units (meters)
  depth: number;  // Depth along Z axis in scene units (meters)
}

export type BlockId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type SourceClassification = 
  | 'SOURCE_VERIFIED'    // Directly verified from approved CAD drawings
  | 'SOURCE_DERIVED'     // Calculated from CAD massing / room schedules
  | 'VISUALIZATION_ONLY' // Architectural rendering aesthetic (trees, ambient vehicles, lighting)
  | 'UNVERIFIED';        // Pending surveyor ground confirmation

export type AreaCalculationMethod =
  | 'SOURCE_SCHEDULE'    // Listed on municipal schedule / drawing schedule title block
  | 'DERIVED_RECTANGLE'  // Strict mathematical product (Width × Depth)
  | 'SURVEY_POLYGON'     // Splayed / non-orthogonal boundary polygon
  | 'MUNICIPAL_STANDARD' // Standardized Haryana town planning yardage module
  | 'MUNICIPAL_SCHEDULE' // Certified standard municipal block sizing
  | 'APPROXIMATE';

export interface GeometricTolerance {
  areaDeviationPct: number;       // Variance between derived rectangle & scheduled area
  centroidToleranceInches: number;// Tolerable centroid coordinate delta
  boundaryToleranceInches: number;// Tolerable boundary coordinate delta
}

export interface CanonicalPlotGeometry {
  id: string;               // e.g. "plot-01"
  unitCode: string;         // e.g. "PLOT-A-01"
  number: number;           // 1 to 64
  block: `Block ${BlockId}`;
  blockColorHex: number;    // Exact hex tint matching masterplan-real.jpg
  
  // Dimensions & Calculations
  cadDimensionA: string;    // Width as annotated on CAD (e.g. 24'-0")
  cadDimensionB: string;    // Depth as annotated on CAD (e.g. 47'-0")
  dimensions: string;       // Combined notation "W × D"
  derivedRectangularSqFt: number; // Width × Depth (mathematical)
  sizeSqYd: number;         // Stated Scheduled Square Yards
  sizeSqFt: number;         // Stated Scheduled Square Feet (9 × sizeSqYd)
  areaMethod: AreaCalculationMethod;
  varianceNotes: string;    // Forensic note on splay / municipal rounding
  geometricTolerance: GeometricTolerance;
  
  facing: string;
  roadWidth: string;
  isCorner: boolean;
  greenBeltAdjacent: boolean;
  
  // 3D Geometry
  cadBoundingBox: CadBoundingBox;
  sourceConfidence: SourceClassification;
}

export interface CanonicalLandmarkGeometry {
  id: string;
  sourceId: string;
  type: 'HOSPITAL' | 'RESIDENCES' | 'MANDIR' | 'UTILITY' | 'GATE' | 'GREEN_BELT';
  title: string;
  dimensions: string;
  areaDescription: string;
  floors: string;
  cadBoundingBox: CadBoundingBox;
  sourceConfidence: SourceClassification;
  architecturalNotes: string;
}

// ─── Block Color Standards (Matching masterplan-real.jpg CAD Legend) ──────────
export const BLOCK_COLORS: Record<BlockId, number> = {
  A: 0x06B6D4, // Block A: Cyan / Light Blue (Plots 1-9, 61-64)
  B: 0xEC4899, // Block B: Pink / Rose Crosshatch (Plots 28-33)
  C: 0xEAB308, // Block C: Yellow / Amber (Plots 10, 21, 22, 34-36)
  D: 0x10B981, // Block D: Green / Emerald Crosshatch (Plots 37-44)
  E: 0x3B82F6, // Block E: Light Blue / Azure Diagonal Hatch (Plots 45-60)
  F: 0x8B5CF6  // Block F: Purple / Lavender (Plots 11-20, 23-27)
};

// ─── 64 Canonical Plot Geometries with Strict 2D CAD Alignment ────────────────
export const CANONICAL_PLOTS: CanonicalPlotGeometry[] = [
  // ============================================================================
  // NORTHERN SECTOR: WEST STRIP (BLOCK A — 425 SQYD PLOTS & MANDIR)
  // ============================================================================
  {
    id: 'plot-01',
    unitCode: 'PLOT-A-01',
    number: 1,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '85\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '85\'-0" × 45\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 85 × 45 = 3,825 sq ft = 425.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -30.71, z: -48.49, width: 25.91, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-02',
    unitCode: 'PLOT-A-02',
    number: 2,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '85\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '85\'-0" × 45\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 85 × 45 = 3,825 sq ft = 425.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -30.71, z: -34.77, width: 25.91, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-03',
    unitCode: 'PLOT-A-03',
    number: 3,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '85\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '85\'-0" × 45\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 85 × 45 = 3,825 sq ft = 425.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -30.71, z: -21.05, width: 25.91, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // ============================================================================
  // NORTHERN SECTOR: MIDDLE-WEST COLUMN (BLOCK A — PLOTS 4 TO 9)
  // ============================================================================
  {
    id: 'plot-04',
    unitCode: 'PLOT-A-04',
    number: 4,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '39\'-0"',
    dimensions: '47\'-0" × 39\'-0"',
    derivedRectangularSqFt: 1833,
    sizeSqYd: 204,
    sizeSqFt: 1836,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 204 Sq Yds (1,833 sq ft rectangular product, rounded to 204 sq yd module)',
    geometricTolerance: { areaDeviationPct: 0.16, centroidToleranceInches: 1.5, boundaryToleranceInches: 1.0 },
    facing: 'East / South',
    roadWidth: '22\'-6" Central Rasta & 33ft Road',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: -10.59, z: -12.80, width: 14.33, depth: 11.89 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-05',
    unitCode: 'PLOT-A-05',
    number: 5,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '24\'-0"',
    dimensions: '47\'-0" × 24\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 126 Sq Yds (24 × 47 = 1,128 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East',
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -10.59, z: -22.41, width: 14.33, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-06',
    unitCode: 'PLOT-A-06',
    number: 6,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '24\'-0"',
    dimensions: '47\'-0" × 24\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 126 Sq Yds (24 × 47 = 1,128 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East',
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -10.59, z: -29.73, width: 14.33, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-07',
    unitCode: 'PLOT-A-07',
    number: 7,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '24\'-0"',
    dimensions: '47\'-0" × 24\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 126 Sq Yds (24 × 47 = 1,128 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East',
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -10.59, z: -37.05, width: 14.33, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-08',
    unitCode: 'PLOT-A-08',
    number: 8,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '24\'-0"',
    dimensions: '47\'-0" × 24\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 126 Sq Yds (24 × 47 = 1,128 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East',
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -10.59, z: -44.37, width: 14.33, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-09',
    unitCode: 'PLOT-A-09',
    number: 9,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '24\'-0"',
    dimensions: '47\'-0" × 24\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 126 Sq Yds (24 × 47 = 1,128 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East / North',
    roadWidth: '22\'-6" Central Rasta & 11ft Perimeter Road',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -10.59, z: -51.69, width: 14.33, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // ============================================================================
  // NORTHERN SECTOR: BLOCK C (PLOTS 10, 21, 22) & BLOCK F (PLOTS 11-20, 23-27)
  // ============================================================================
  {
    id: 'plot-10',
    unitCode: 'PLOT-C-10',
    number: 10,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '42\'-6"',
    cadDimensionB: '48\'-0"',
    dimensions: '42\'-6" × 48\'-0"',
    derivedRectangularSqFt: 2040,
    sizeSqYd: 227,
    sizeSqFt: 2043,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 227 Sq Yds (42.5 × 48 = 2,040 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.15, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West / South',
    roadWidth: '22\'-6" Central Rasta & 20ft North Road',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 9.91, z: -48.02, width: 12.95, depth: 14.63 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  // Plots 11 to 15 (Block F — Top Row)
  ...[11, 12, 13, 14, 15].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-F-${num}`,
    number: num,
    block: 'Block F' as const,
    blockColorHex: BLOCK_COLORS.F,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '48\'-0"',
    dimensions: '24\'-0" × 48\'-0"',
    derivedRectangularSqFt: 1152,
    sizeSqYd: 128,
    sizeSqFt: 1152,
    areaMethod: 'DERIVED_RECTANGLE' as const,
    varianceNotes: 'Exact mathematical match: 24 × 48 = 1,152 sq ft = 128.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'South' as const,
    roadWidth: '20ft North Rasta & 11ft North Perimeter Road',
    isCorner: num === 15,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 20.04 + idx * 7.32, z: -48.02, width: 7.32, depth: 14.63 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Middle Row: Plot 21 (Block C) & Plots 20 to 16 (Block F)
  {
    id: 'plot-21',
    unitCode: 'PLOT-C-21',
    number: 21,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '42\'-6"',
    cadDimensionB: '45\'-6"',
    dimensions: '42\'-6" × 45\'-6"',
    derivedRectangularSqFt: 1933.75,
    sizeSqYd: 215,
    sizeSqFt: 1935,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 215 Sq Yds (42.5 × 45.5 = 1,933.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.06, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West / North',
    roadWidth: '22\'-6" Central Rasta & 20ft Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 9.91, z: -27.67, width: 12.95, depth: 13.87 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  // Plots 20 to 16 (Block F — Middle Row, West to East)
  ...[20, 19, 18, 17, 16].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-F-${num}`,
    number: num,
    block: 'Block F' as const,
    blockColorHex: BLOCK_COLORS.F,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '45\'-6"',
    dimensions: '24\'-0" × 45\'-6"',
    derivedRectangularSqFt: 1092,
    sizeSqYd: 122,
    sizeSqFt: 1098,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 122 Sq Yds (24 × 45.5 = 1,092 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North' as const,
    roadWidth: '20ft North Rasta',
    isCorner: num === 16,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 20.04 + idx * 7.32, z: -27.67, width: 7.32, depth: 13.87 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Bottom Row: Plot 22 (Block C) & Plots 23 to 27 (Block F)
  {
    id: 'plot-22',
    unitCode: 'PLOT-C-22',
    number: 22,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '42\'-6"',
    cadDimensionB: '45\'-6"',
    dimensions: '42\'-6" × 45\'-6"',
    derivedRectangularSqFt: 1933.75,
    sizeSqYd: 215,
    sizeSqFt: 1935,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 215 Sq Yds (42.5 × 45.5 = 1,933.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.06, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West / South',
    roadWidth: '22\'-6" Central Rasta & 33ft Central Road',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 9.91, z: -13.80, width: 12.95, depth: 13.87 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  // Plots 23 to 27 (Block F — Bottom Row, West to East)
  ...[23, 24, 25, 26, 27].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-F-${num}`,
    number: num,
    block: 'Block F' as const,
    blockColorHex: BLOCK_COLORS.F,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '45\'-6"',
    dimensions: '24\'-0" × 45\'-6"',
    derivedRectangularSqFt: 1092,
    sizeSqYd: 122,
    sizeSqFt: 1098,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 122 Sq Yds (24 × 45.5 = 1,092 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'South' as const,
    roadWidth: '33ft Central Road with 6ft Green Belt',
    isCorner: num === 27,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 20.04 + idx * 7.32, z: -13.80, width: 7.32, depth: 13.87 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // ============================================================================
  // SOUTHERN SECTOR: BLOCK B (PLOTS 28 TO 33)
  // ============================================================================
  // Top Row (facing 5' Green Belt / 33' Highway): Plots 30, 29, 28 (West to East)
  {
    id: 'plot-30',
    unitCode: 'PLOT-B-30',
    number: 30,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '31\'-0"',
    cadDimensionB: '47\'-6"',
    dimensions: '31\'-0" × 47\'-6"',
    derivedRectangularSqFt: 1472.5,
    sizeSqYd: 163,
    sizeSqFt: 1467,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 163 Sq Yds (31 × 47.5 = 1,472.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.37, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North / West',
    roadWidth: '33ft Central Road & 22\'-6" Spine',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 8.16, z: 13.79, width: 9.45, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-29',
    unitCode: 'PLOT-B-29',
    number: 29,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 130 Sq Yds (24.5 × 47.5 = 1,163.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '33ft Central Road with 5ft Green Belt',
    isCorner: false,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 16.62, z: 13.79, width: 7.47, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-28',
    unitCode: 'PLOT-B-28',
    number: 28,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 130 Sq Yds (24.5 × 47.5 = 1,163.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '33ft Central Road with 5ft Green Belt',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 24.09, z: 13.79, width: 7.47, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  // Bottom Row (facing 20' South Rasta): Plots 31, 32, 33 (West to East)
  {
    id: 'plot-31',
    unitCode: 'PLOT-B-31',
    number: 31,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '31\'-0"',
    cadDimensionB: '47\'-6"',
    dimensions: '31\'-0" × 47\'-6"',
    derivedRectangularSqFt: 1472.5,
    sizeSqYd: 163,
    sizeSqFt: 1467,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 163 Sq Yds (31 × 47.5 = 1,472.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.37, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'South / West',
    roadWidth: '20ft Rasta & 22\'-6" Spine',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 8.16, z: 28.27, width: 9.45, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-32',
    unitCode: 'PLOT-B-32',
    number: 32,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 130 Sq Yds (24.5 × 47.5 = 1,163.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'South',
    roadWidth: '20ft Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 16.62, z: 28.27, width: 7.47, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-33',
    unitCode: 'PLOT-B-33',
    number: 33,
    block: 'Block B',
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 130 Sq Yds (24.5 × 47.5 = 1,163.75 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.5, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'South',
    roadWidth: '20ft Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 24.09, z: 28.27, width: 7.47, depth: 14.48 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // ============================================================================
  // SOUTHERN SECTOR: BLOCK C (PLOTS 34 TO 36)
  // ============================================================================
  {
    id: 'plot-36',
    unitCode: 'PLOT-C-36',
    number: 36,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '28\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '28\'-0" × 45\'-0"',
    derivedRectangularSqFt: 1260,
    sizeSqYd: 140,
    sizeSqFt: 1260,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 28 × 45 = 1,260 sq ft = 140.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North / West',
    roadWidth: '20ft Rasta & 22\'-6" Spine',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7.70, z: 48.47, width: 8.53, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-35',
    unitCode: 'PLOT-C-35',
    number: 35,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '26\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '26\'-0" × 45\'-0"',
    derivedRectangularSqFt: 1170,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 26 × 45 = 1,170 sq ft = 130.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '20ft Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 15.92, z: 48.47, width: 7.92, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-34',
    unitCode: 'PLOT-C-34',
    number: 34,
    block: 'Block C',
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '26\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '26\'-0" × 45\'-0"',
    derivedRectangularSqFt: 1170,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact mathematical match: 26 × 45 = 1,170 sq ft = 130.0 sq yd',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '20ft Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 23.84, z: 48.47, width: 7.92, depth: 13.72 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // ============================================================================
  // SOUTHERN SECTOR: BLOCK D (PLOTS 37 TO 44 — EAST COLUMN)
  // ============================================================================
  ...[37, 38, 39, 40, 41, 42, 43].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-D-${num}`,
    number: num,
    block: 'Block D' as const,
    blockColorHex: BLOCK_COLORS.D,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '25\'-0"',
    dimensions: '47\'-0" × 25\'-0"',
    derivedRectangularSqFt: 1175,
    sizeSqYd: 130.5,
    sizeSqFt: 1174.5,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 130.5 Sq Yds (25 × 47 = 1,175 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.04, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West' as const,
    roadWidth: '22\'-6" Central Spine Rasta',
    isCorner: num === 37,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 10.60, z: 59.14 + idx * 7.62, width: 14.33, depth: 7.62 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),
  {
    id: 'plot-44',
    unitCode: 'PLOT-D-44',
    number: 44,
    block: 'Block D',
    blockColorHex: BLOCK_COLORS.D,
    cadDimensionA: '47\'-0"',
    cadDimensionB: '23\'-0"',
    dimensions: '47\'-0" × 23\'-0"',
    derivedRectangularSqFt: 1081,
    sizeSqYd: 120.1,
    sizeSqFt: 1080.9,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 120.1 Sq Yds (23 × 47 = 1,081 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.01, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West / South',
    roadWidth: '22\'-6" Central Spine Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 10.60, z: 112.18, width: 14.33, depth: 7.01 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // ============================================================================
  // SOUTHERN SECTOR: BLOCK A (PLOTS 61 TO 64 — EAST OF HOSPITAL)
  // ============================================================================
  ...[64, 63, 62, 61].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-A-${num}`,
    number: num,
    block: 'Block A' as const,
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '50\'-6"',
    cadDimensionB: '23\'-0"',
    dimensions: '50\'-6" × 23\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 130 Sq Yds (23 × 50.5 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.7, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East' as const,
    roadWidth: '22\'-6" Central Spine Rasta',
    isCorner: num === 61 || num === 64,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -11.13, z: 10.06 + idx * 7.01, width: 15.39, depth: 7.01 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // ============================================================================
  // SOUTHERN SECTOR: BLOCK E (PLOTS 45 TO 60 — SOUTH-WEST SECTOR)
  // ============================================================================
  // Top Row: Plots 54, 53, 52, 51 (Facing North 20' Rasta below Hospital)
  {
    id: 'plot-54',
    unitCode: 'PLOT-E-54',
    number: 54,
    block: 'Block E',
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '25\'-3"',
    cadDimensionB: '46\'-0"',
    dimensions: '25\'-3" × 46\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 129,
    sizeSqFt: 1161,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 129 Sq Yds (25.25 × 46 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.04, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North / West',
    roadWidth: '20ft Rasta & 16\'-6" West Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -30.38, z: 61.72, width: 7.70, depth: 14.02 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-53',
    unitCode: 'PLOT-E-53',
    number: 53,
    block: 'Block E',
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '25\'-3"',
    cadDimensionB: '46\'-0"',
    dimensions: '25\'-3" × 46\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 129,
    sizeSqFt: 1161,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 129 Sq Yds (25.25 × 46 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.04, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '20ft Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -22.68, z: 61.72, width: 7.70, depth: 14.02 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-52',
    unitCode: 'PLOT-E-52',
    number: 52,
    block: 'Block E',
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '25\'-3"',
    cadDimensionB: '46\'-0"',
    dimensions: '25\'-3" × 46\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 129,
    sizeSqFt: 1161,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 129 Sq Yds (25.25 × 46 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.04, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North',
    roadWidth: '20ft Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -14.98, z: 61.72, width: 7.70, depth: 14.02 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-51',
    unitCode: 'PLOT-E-51',
    number: 51,
    block: 'Block E',
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '25\'-3"',
    cadDimensionB: '46\'-0"',
    dimensions: '25\'-3" × 46\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130.5,
    sizeSqFt: 1174.5,
    areaMethod: 'SOURCE_SCHEDULE',
    varianceNotes: 'CAD stated 130.5 Sq Yds (25.25 × 46 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 1.1, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'North / East',
    roadWidth: '20ft Rasta & 22\'-6" Central Spine Rasta',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -7.28, z: 61.72, width: 7.70, depth: 14.02 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Eastern Column: Plots 50 to 45 (Facing East 22'-6" Spine)
  ...[50, 49, 48, 47, 46, 45].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-E-${num}`,
    number: num,
    block: 'Block E' as const,
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '50\'-6"',
    cadDimensionB: '23\'-0"',
    dimensions: '50\'-6" × 23\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 130 Sq Yds (23 × 50.5 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.7, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'East' as const,
    roadWidth: '22\'-6" Central Spine Rasta',
    isCorner: num === 45,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -11.13, z: 72.24 + idx * 7.01, width: 15.39, depth: 7.01 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Western Column: Plots 55 to 60 (Facing West 16'-6" Rasta)
  ...[55, 56, 57, 58, 59, 60].map((num, idx) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-E-${num}`,
    number: num,
    block: 'Block E' as const,
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '50\'-6"',
    cadDimensionB: '23\'-0"',
    dimensions: '50\'-6" × 23\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'SOURCE_SCHEDULE' as const,
    varianceNotes: 'CAD stated 130 Sq Yds (23 × 50.5 = 1,161.5 sq ft)',
    geometricTolerance: { areaDeviationPct: 0.7, centroidToleranceInches: 1.0, boundaryToleranceInches: 1.0 },
    facing: 'West' as const,
    roadWidth: '16\'-6" West Rasta',
    isCorner: num === 60,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -26.53, z: 72.24 + idx * 7.01, width: 15.39, depth: 7.01 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  }))
];

// ─── Certified Landmarks Register ───────────────────────────────────────────
export const CANONICAL_LANDMARKS: CanonicalLandmarkGeometry[] = [
  {
    id: 'landmark-hospital',
    sourceId: 'cad-landmark-01',
    type: 'HOSPITAL',
    title: 'Multi-Speciality Ayurvedic Hospital (G+2, 30,000 SQFT)',
    dimensions: '117\'-10" × 138\'-0"',
    areaDescription: '30,000 sq ft Built-Up Area with Panchakarma Suites & Emergency Wing (hospital-main)',
    floors: 'G+2 Multi-Storey Healthcare Facility',
    cadBoundingBox: { x: -25.77, z: 27.58, width: 35.81, depth: 42.06 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Positioned in South-West healthcare zone, buffered by 5ft Green Belt along 33ft Dividing Road and facing West Highway network.'
  },
  {
    id: 'landmark-mandir',
    sourceId: 'cad-landmark-02',
    type: 'MANDIR',
    title: 'Community Mandir & Sacred Reflection Kund',
    dimensions: '85\'-0" × 45\'-0" Dedicated Mandir Land Parcel (425 SQYD)',
    areaDescription: 'Sandstone Plinth with 7-Tier Shikhara Spire + Meditation Kund (community-mandir)',
    floors: 'Traditional Plinth & Temple Sanctum',
    cadBoundingBox: { x: -30.71, z: -10.53, width: 25.91, depth: 7.32 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Located at the southwest corner of Northern Sector, adjacent to 6ft Green Belt and 33ft dividing avenue.'
  },
  {
    id: 'landmark-utility',
    sourceId: 'cad-landmark-03',
    type: 'UTILITY',
    title: 'Utility Services Enclave (289 SQYD)',
    dimensions: '48\'-0" × 54\'-0"',
    areaDescription: '289 Sq. Yds. Dedicated Civic Infrastructure Compound (utility-services)',
    floors: 'Ground Distribution & Substation Plinth',
    cadBoundingBox: { x: 45.66, z: -62.65, width: 14.63, depth: 14.63 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Positioned at the North-East perimeter corner behind Plot 15, housing water filtration and transformer substation.'
  },
  {
    id: 'landmark-residences',
    sourceId: 'cad-landmark-04',
    type: 'RESIDENCES',
    title: 'Senior Living Residences (Plots 63 & 64)',
    dimensions: '50\'-6" × 46\'-0"',
    areaDescription: 'G+2 Barrier-Free 1 BHK & 1 RK Assisted Living Suites (senior-residence-63-64)',
    floors: 'Stilt Parking (14 Bays, 3 Gates, 16 Columns) + 3 Residential Floors',
    cadBoundingBox: { x: -11.13, z: 13.56, width: 15.39, depth: 14.02 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Built on canonical plots 63 & 64, adjacent to Ayurvedic hospital for zero-response-time geriatric healthcare.'
  },
  {
    id: 'landmark-gate',
    sourceId: 'cad-landmark-05',
    type: 'GATE',
    title: 'Main Arterial Highway Entrance & Security Checkpoint',
    dimensions: '33\'-0" Wide Highway Access Corridors',
    areaDescription: '24/7 Manned Security Post & Automatic Boom Barrier (entrance-gate-west)',
    floors: 'Ground Security Control & Visitor Registration',
    cadBoundingBox: { x: -43.67, z: 0, width: 10.06, depth: 180 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Direct highway access from State Highway 22 (Jhajjar-Bahadurgarh Road) and NH-71 / Reliance MET City corridor.'
  }
];

// Helper export to fetch geometry by plot number
export const CANONICAL_PLOT_MAP = new Map<number, CanonicalPlotGeometry>(
  CANONICAL_PLOTS.map((p) => [p.number, p])
);

export function getPlotGeometryByNumber(num: number): CanonicalPlotGeometry | undefined {
  return CANONICAL_PLOT_MAP.get(num);
}


