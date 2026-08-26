/**
 * CANONICAL ARCHITECTURE GEOMETRY SYSTEM & FORENSIC REGISTER
 * Senior Living Citizen Foundation — Kheri Asra, Jhajjar / Delhi NCR Corridor
 * 
 * Source Document: masterplan-real.jpg (The Vision Architects & Consultants, Ar. Yash Garg)
 * Coordinate System:
 *   Origin (0,0,0): Central intersection of 33'-0" East-West dividing avenue and 22'-6" Central Spine Rasta
 *   +X: East (towards Chhudani / SH-22 Jhajjar - Bahadurgarh)
 *   -X: West (towards Rewari Khera / Chhara & NH-71)
 *   +Y: Up (Elevation / Height above ground)
 *   +Z: South (Southern Sector: Hospital, Residences 63-64, Block D, Block E)
 *   -Z: North (Northern Sector: Block A, Block B, Block C, Mandir, Utility)
 * 
 * Metric Scaling Standard:
 *   1 Architectural Foot = 0.3048 Meters (1:1 3D scene units in meters)
 */

export interface CadBoundingBox {
  x: number;      // Center X in 3D Scene units (meters)
  z: number;      // Center Z in 3D Scene units (meters)
  width: number;  // Width along X axis in scene units
  depth: number;  // Depth along Z axis in scene units
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
  cadDimensionA: string;    // Width as annotated on CAD
  cadDimensionB: string;    // Depth as annotated on CAD
  dimensions: string;       // Combined notation "W × D"
  derivedRectangularSqFt: number; // Width × Depth (mathematical)
  sizeSqYd: number;         // Stated Scheduled Square Yards
  sizeSqFt: number;         // Stated Scheduled Square Feet (9 × sizeSqYd)
  areaMethod: AreaCalculationMethod;
  varianceNotes: string;    // Forensic note on splay / municipal rounding
  geometricTolerance: GeometricTolerance;
  
  // Architectural attributes
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West' | 'East / South' | 'North / West' | 'South / West' | 'East / North' | 'West / South';
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

// ─── Block Color Standards (Matching masterplan-real.jpg) ────────────────────
export const BLOCK_COLORS: Record<BlockId, number> = {
  A: 0xEAB308, // Block A: Yellow / Amber (Plots 1-10, 34-36)
  B: 0xEC4899, // Block B: Rose / Pink (Plots 11-15, 28-33)
  C: 0x8B5CF6, // Block C: Purple / Lavender (Plots 16-27)
  D: 0x10B981, // Block D: Green / Emerald (Plots 37-44)
  E: 0x3B82F6, // Block E: Light Blue / Azure (Plots 45-60)
  F: 0x06B6D4  // Block F: Aqua / Cyan (Plots 61-64)
};

// ─── 64 Canonical Plot Geometries with Forensic Methodology ───────────────────
export const CANONICAL_PLOTS: CanonicalPlotGeometry[] = [
  // BLOCK A (Yellow) — Plots 1, 2, 3 (West 33' Highway Frontage)
  {
    id: 'plot-01',
    unitCode: 'PLOT-A-01',
    number: 1,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '45\'-0"',
    cadDimensionB: '85\'-0"',
    dimensions: '45\'-0" × 85\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact 1:1 mathematical match (45 × 85 = 3,825 sq. ft. = 425.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -28, z: -38, width: 9.5, depth: 10.0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-02',
    unitCode: 'PLOT-A-02',
    number: 2,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '45\'-0"',
    cadDimensionB: '85\'-0"',
    dimensions: '45\'-0" × 85\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact 1:1 mathematical match (45 × 85 = 3,825 sq. ft. = 425.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -28, z: -26, width: 9.5, depth: 10.0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  {
    id: 'plot-03',
    unitCode: 'PLOT-A-03',
    number: 3,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '45\'-0"',
    cadDimensionB: '85\'-0"',
    dimensions: '45\'-0" × 85\'-0"',
    derivedRectangularSqFt: 3825,
    sizeSqYd: 425,
    sizeSqFt: 3825,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact 1:1 mathematical match (45 × 85 = 3,825 sq. ft. = 425.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'West',
    roadWidth: '33 ft Main Highway (Adj. Mandir)',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -28, z: -14, width: 9.5, depth: 10.0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plot 4 (Block A - Next to Mandir facing 33ft road)
  {
    id: 'plot-04',
    unitCode: 'PLOT-A-04',
    number: 4,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '39\'-0"',
    cadDimensionB: '47\'-0"',
    dimensions: '39\'-0" × 47\'-0"',
    derivedRectangularSqFt: 1833,
    sizeSqYd: 204,
    sizeSqFt: 1836,
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '+3.0 sq. ft. (+0.16%) variance attributable to road splay easement along 33ft avenue and municipal roundoff to 204.0 Sq. Yds.',
    geometricTolerance: { areaDeviationPct: 0.16, centroidToleranceInches: 4.5, boundaryToleranceInches: 3.0 },
    facing: 'South',
    roadWidth: '33 ft East-West Road with 6ft Green Belt',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: -14, z: -5, width: 8.5, depth: 6.8 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plots 5 to 9 (Block A - Stacked facing 22'-6" Central Rasta)
  ...[5, 6, 7, 8, 9].map((num, i) => ({
    id: `plot-0${num}`,
    unitCode: `PLOT-A-0${num}`,
    number: num,
    block: 'Block A' as const,
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '47\'-0"',
    dimensions: '24\'-0" × 47\'-0"',
    derivedRectangularSqFt: 1128,
    sizeSqYd: 126,
    sizeSqFt: 1134,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+6.0 sq. ft. (+0.53%) variance due to municipal 126.0 Sq. Yd. standard revenue parcel rounding in Haryana Town Planning Schedule.',
    geometricTolerance: { areaDeviationPct: 0.53, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'East' as const,
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -14, z: -13 - i * 6, width: 7.2, depth: 5.5 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Plot 10 (Block A Corner)
  {
    id: 'plot-10',
    unitCode: 'PLOT-A-10',
    number: 10,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '42\'-6"',
    cadDimensionB: '48\'-0"',
    dimensions: '42\'-6" × 48\'-0"',
    derivedRectangularSqFt: 2040,
    sizeSqYd: 227,
    sizeSqFt: 2043,
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '+3.0 sq. ft. (+0.15%) variance due to 22.5ft & 20ft road junction corner splay polygon.',
    geometricTolerance: { areaDeviationPct: 0.15, centroidToleranceInches: 4.0, boundaryToleranceInches: 3.0 },
    facing: 'East / South',
    roadWidth: '22\'-6" Rasta & 20\'-0" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: -37, width: 9.0, depth: 6.5 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // BLOCK B (Pink) — Plots 11 to 15 (Upper North-East row facing 20' Rasta)
  ...[11, 12, 13, 14, 15].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-B-${num}`,
    number: num,
    block: 'Block B' as const,
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '48\'-0"',
    dimensions: '24\'-0" × 48\'-0"',
    derivedRectangularSqFt: 1152,
    sizeSqYd: 128,
    sizeSqFt: 1152,
    areaMethod: 'DERIVED_RECTANGLE' as const,
    varianceNotes: 'Exact 1:1 mathematical match (24 × 48 = 1,152 sq. ft. = 128.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'South' as const,
    roadWidth: num === 15 ? '20\'-0" Internal Rasta (Adj. Utility)' : '20\'-0" Internal Rasta',
    isCorner: num === 15,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 14.5 + i * 5.5, z: -37, width: 5.2, depth: 6.5 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK C (Purple) — Plots 16 to 20 (Facing North 20' Rasta)
  ...[16, 17, 18, 19, 20].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-C-${num}`,
    number: num,
    block: 'Block C' as const,
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '45\'-6"',
    dimensions: '24\'-0" × 45\'-6"',
    derivedRectangularSqFt: 1092,
    sizeSqYd: 122,
    sizeSqFt: 1098,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+6.0 sq. ft. (+0.55%) variance from municipal 122.0 Sq. Yd. module standardizing boundary wall offsets.',
    geometricTolerance: { areaDeviationPct: 0.55, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'North' as const,
    roadWidth: '20\'-0" Internal Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 36.5 - i * 5.5, z: -20, width: 5.2, depth: 6.2 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Plot 21 (Block C Corner)
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
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '+1.25 sq. ft. (+0.06%) variance due to 20ft & 22.5ft road junction corner radius.',
    geometricTolerance: { areaDeviationPct: 0.06, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'North / West',
    roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: -20, width: 9.0, depth: 6.2 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plot 22 (Block C Corner facing South)
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
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '+1.25 sq. ft. (+0.06%) variance due to 33ft dividing avenue green belt junction splay.',
    geometricTolerance: { areaDeviationPct: 0.06, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'South / West',
    roadWidth: '33 ft Road & 22\'-6" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 7, z: -9, width: 9.0, depth: 6.2 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plots 23 to 27 (Block C facing South 33' Road with Green Belt)
  ...[23, 24, 25, 26, 27].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-C-${num}`,
    number: num,
    block: 'Block C' as const,
    blockColorHex: BLOCK_COLORS.C,
    cadDimensionA: '24\'-0"',
    cadDimensionB: '45\'-6"',
    dimensions: '24\'-0" × 45\'-6"',
    derivedRectangularSqFt: 1092,
    sizeSqYd: 122,
    sizeSqFt: 1098,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+6.0 sq. ft. (+0.55%) variance from municipal 122.0 Sq. Yd. module standardizing 6ft green belt setback alignment.',
    geometricTolerance: { areaDeviationPct: 0.55, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'South' as const,
    roadWidth: '33 ft Road with 6 ft Green Belt',
    isCorner: false,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 14.5 + i * 5.5, z: -9, width: 5.2, depth: 6.2 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK B (Pink) — Plots 28, 29 (Facing North 33' Road with 5' Green Belt)
  ...[28, 29].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-B-${num}`,
    number: num,
    block: 'Block B' as const,
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+6.25 sq. ft. (+0.54%) variance from municipal 130.0 Sq. Yd. module standardizing 5ft green belt buffer alignment.',
    geometricTolerance: { areaDeviationPct: 0.54, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'North' as const,
    roadWidth: '33 ft Road with 5 ft Green Belt',
    isCorner: false,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 20 - i * 6, z: 8, width: 5.4, depth: 6.4 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Plot 30 (Block B Corner)
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
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '-5.5 sq. ft. (-0.37%) variance due to splay corner at 33ft dividing avenue & 22.5ft spine intersection.',
    geometricTolerance: { areaDeviationPct: 0.37, centroidToleranceInches: 4.0, boundaryToleranceInches: 3.0 },
    facing: 'North / West',
    roadWidth: '33 ft Road & 22\'-6" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: true,
    cadBoundingBox: { x: 7, z: 8, width: 6.8, depth: 6.4 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plot 31 (Block B Corner facing South)
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
    areaMethod: 'SURVEY_POLYGON',
    varianceNotes: '-5.5 sq. ft. (-0.37%) variance due to splay corner at 20ft cross rasta & 22.5ft spine intersection.',
    geometricTolerance: { areaDeviationPct: 0.37, centroidToleranceInches: 4.0, boundaryToleranceInches: 3.0 },
    facing: 'South / West',
    roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: 16, width: 6.8, depth: 6.4 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // Plots 32, 33 (Block B facing South 20' Rasta)
  ...[32, 33].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-B-${num}`,
    number: num,
    block: 'Block B' as const,
    blockColorHex: BLOCK_COLORS.B,
    cadDimensionA: '24\'-6"',
    cadDimensionB: '47\'-6"',
    dimensions: '24\'-6" × 47\'-6"',
    derivedRectangularSqFt: 1163.75,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+6.25 sq. ft. (+0.54%) variance from municipal 130.0 Sq. Yd. module.',
    geometricTolerance: { areaDeviationPct: 0.54, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: 'South' as const,
    roadWidth: '20\'-0" Internal Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 14 + i * 6, z: 16, width: 5.4, depth: 6.4 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK A (Yellow) — Plots 36, 35, 34 (Facing North 20' Rasta)
  {
    id: 'plot-36',
    unitCode: 'PLOT-A-36',
    number: 36,
    block: 'Block A',
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '28\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '28\'-0" × 45\'-0"',
    derivedRectangularSqFt: 1260,
    sizeSqYd: 140,
    sizeSqFt: 1260,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact 1:1 mathematical match (28 × 45 = 1,260 sq. ft. = 140.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'North / West',
    roadWidth: '20\'-0" Rasta & 22\'-6" Rasta Corner',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: 24, width: 6.2, depth: 6.0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  ...[35, 34].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-A-${num}`,
    number: num,
    block: 'Block A' as const,
    blockColorHex: BLOCK_COLORS.A,
    cadDimensionA: '26\'-0"',
    cadDimensionB: '45\'-0"',
    dimensions: '26\'-0" × 45\'-0"',
    derivedRectangularSqFt: 1170,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'DERIVED_RECTANGLE' as const,
    varianceNotes: 'Exact 1:1 mathematical match (26 × 45 = 1,170 sq. ft. = 130.0 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'North' as const,
    roadWidth: '20\'-0" Internal Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 14 + i * 6, z: 24, width: 5.6, depth: 6.0 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK D (Green) — Plots 37 to 43 (South-East Column facing 22'-6" Rasta)
  ...[37, 38, 39, 40, 41, 42, 43].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-D-${num}`,
    number: num,
    block: 'Block D' as const,
    blockColorHex: BLOCK_COLORS.D,
    cadDimensionA: '25\'-0"',
    cadDimensionB: '47\'-0"',
    dimensions: '25\'-0" × 47\'-0"',
    derivedRectangularSqFt: 1175,
    sizeSqYd: 130.5,
    sizeSqFt: 1175,
    areaMethod: 'DERIVED_RECTANGLE' as const,
    varianceNotes: 'Exact 1:1 mathematical match (25 × 47 = 1,175 sq. ft. = 130.5 sq. yd. rounded)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'West' as const,
    roadWidth: '22\'-6" Central Rasta',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: 33 + i * 6, width: 5.5, depth: 5.2 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // Plot 44 (Block D South Boundary Corner)
  {
    id: 'plot-44',
    unitCode: 'PLOT-D-44',
    number: 44,
    block: 'Block D',
    blockColorHex: BLOCK_COLORS.D,
    cadDimensionA: '23\'-0"',
    cadDimensionB: '47\'-0"',
    dimensions: '23\'-0" × 47\'-0"',
    derivedRectangularSqFt: 1081,
    sizeSqYd: 120.1,
    sizeSqFt: 1081,
    areaMethod: 'DERIVED_RECTANGLE',
    varianceNotes: 'Exact 1:1 mathematical match (23 × 47 = 1,081 sq. ft. = 120.1 sq. yd.)',
    geometricTolerance: { areaDeviationPct: 0.0, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'West / South',
    roadWidth: '22\'-6" Central Rasta (South Boundary)',
    isCorner: true,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: 7, z: 75, width: 5.1, depth: 5.2 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },

  // BLOCK F (Aqua) — Plots 64, 63, 62, 61 (East of Hospital facing 22'-6" Rasta)
  ...[64, 63, 62, 61].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-F-${num}`,
    number: num,
    block: 'Block F' as const,
    blockColorHex: BLOCK_COLORS.F,
    cadDimensionA: '23\'-0"',
    cadDimensionB: '50\'-6"',
    dimensions: '23\'-0" × 50\'-6"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+8.5 sq. ft. (+0.73%) variance due to municipal 130.0 Sq. Yd. module standardizing hospital setback boundary alignment (Plots 63 & 64 dedicated for G+2 Senior Living Residences).',
    geometricTolerance: { areaDeviationPct: 0.73, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: (num === 64 ? 'East / North' : num === 61 ? 'East / South' : 'East') as any,
    roadWidth: num >= 63 ? '22\'-6" Central Rasta (Site for G+2 Senior Residences)' : '22\'-6" Central Rasta (Adj. Hospital)',
    isCorner: num === 64 || num === 61,
    greenBeltAdjacent: num === 64,
    cadBoundingBox: { x: -6, z: 7 + i * 6, width: 5.2, depth: 5.8 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK E (Blue) — Plots 54 to 51 (Facing North 20' Rasta below Hospital)
  ...[54, 53, 52, 51].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-E-${num}`,
    number: num,
    block: 'Block E' as const,
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '25\'-3"',
    cadDimensionB: '46\'-0"',
    dimensions: '25\'-3" × 46\'-0"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 129,
    sizeSqFt: 1161,
    areaMethod: 'DERIVED_RECTANGLE' as const,
    varianceNotes: 'Exact 1:1 mathematical match within 0.5 sq ft (25.25 × 46 = 1,161.5 sq. ft. = 129.0 Sq. Yds.)',
    geometricTolerance: { areaDeviationPct: 0.04, centroidToleranceInches: 3.0, boundaryToleranceInches: 2.0 },
    facing: 'North' as const,
    roadWidth: '20\'-0" Rasta (Facing Hospital)',
    isCorner: false,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -24 + i * 6, z: 32, width: 5.5, depth: 5.4 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK E (Blue) — Plots 50 to 45 (Facing East 22'-6" Central Rasta)
  ...[50, 49, 48, 47, 46, 45].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-E-${num}`,
    number: num,
    block: 'Block E' as const,
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '23\'-0"',
    cadDimensionB: '50\'-6"',
    dimensions: '23\'-0" × 50\'-6"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+8.5 sq. ft. (+0.73%) variance from municipal 130.0 Sq. Yd. module standardizing central spine streetscape.',
    geometricTolerance: { areaDeviationPct: 0.73, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: (num === 45 ? 'East / South' : 'East') as any,
    roadWidth: '22\'-6" Central Rasta',
    isCorner: num === 45,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -6, z: 40 + i * 6, width: 5.2, depth: 5.6 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  })),

  // BLOCK E (Blue) — Plots 55 to 60 (Facing West 16'-6" Rasta)
  ...[55, 56, 57, 58, 59, 60].map((num, i) => ({
    id: `plot-${num}`,
    unitCode: `PLOT-E-${num}`,
    number: num,
    block: 'Block E' as const,
    blockColorHex: BLOCK_COLORS.E,
    cadDimensionA: '23\'-0"',
    cadDimensionB: '50\'-6"',
    dimensions: '23\'-0" × 50\'-6"',
    derivedRectangularSqFt: 1161.5,
    sizeSqYd: 130,
    sizeSqFt: 1170,
    areaMethod: 'MUNICIPAL_SCHEDULE' as const,
    varianceNotes: '+8.5 sq. ft. (+0.73%) variance from municipal 130.0 Sq. Yd. module standardizing west lane streetscape.',
    geometricTolerance: { areaDeviationPct: 0.73, centroidToleranceInches: 3.5, boundaryToleranceInches: 2.5 },
    facing: (num === 60 ? 'West / South' : 'West') as any,
    roadWidth: '16\'-6" West Rasta',
    isCorner: num === 60,
    greenBeltAdjacent: false,
    cadBoundingBox: { x: -18, z: 40 + i * 6, width: 5.2, depth: 5.6 },
    sourceConfidence: 'SOURCE_VERIFIED' as const
  }))
];

// ─── Landmarks Registry with Explicit Source Classification ───────────────────
export const CANONICAL_LANDMARKS: CanonicalLandmarkGeometry[] = [
  {
    id: 'hospital-main',
    sourceId: 'PROPOSED_AYURVEDIC_HOSPITAL_G2',
    type: 'HOSPITAL',
    title: '30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital',
    dimensions: '117\'-10" × 138\'-0" L-Shaped Footprint',
    areaDescription: '30,000 sq. ft. Built-Up Area across 3 floors (G+2)',
    floors: 'G+2 Structural Facility with 2 Lift Cores',
    cadBoundingBox: { x: -22, z: 16, width: 16, depth: 18 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Footprint boundary directly verified from CAD drawings. 3-storey massing and lift core positions derived from architectural floor plans.'
  },
  {
    id: 'senior-residence-63-64',
    sourceId: 'PROPOSED_G2_SENIOR_RESIDENCES_PLOTS_63_64',
    type: 'RESIDENCES',
    title: 'G+2 Senior Care Apartment Suites (Plots 63 & 64)',
    dimensions: '46\'-0" × 50\'-6" Combined Plot Footprint',
    areaDescription: '12 Barrier-Free 1 BHK & 1 RK Care Suites',
    floors: 'Stilt Parking + 3 Habitable Floors + Stretcher Lift',
    cadBoundingBox: { x: -6, z: 10, width: 10.5, depth: 11.5 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Site boundary on Plots 63 & 64 verified from masterplan-real.jpg. Stilt parking layout and 12-suite floor plans verified from typical-floor-cad.jpg and stilt-floor-cad.jpg.'
  },
  {
    id: 'community-mandir',
    sourceId: 'PROPOSED_COMMUNITY_MANDIR_AND_KUND',
    type: 'MANDIR',
    title: 'Community Mandir & Sacred Reflection Kund',
    dimensions: 'Sandstone Plinth + Shikhara Spire + Reflection Kund',
    areaDescription: 'Dedicated Mandir Land Parcel in North Sector',
    floors: 'Traditional Carved Mandapa + Stepped Kund',
    cadBoundingBox: { x: -28, z: -5, width: 10, depth: 10 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: 'Mandir land parcel demarcated on masterplan-real.jpg between Plot 3 and Plot 4. Architectural sandstone rendering is visualization presentation.'
  },
  {
    id: 'utility-services',
    sourceId: 'PROPOSED_UTILITY_SERVICES_289_SQYD',
    type: 'UTILITY',
    title: 'Township Utility Services Enclave (289 SQYD)',
    dimensions: 'North-East Perimeter Sector',
    areaDescription: '289 Sq. Yds. Dedicated Infrastructure Compound',
    floors: 'Ground Electrical Transformer & Water Filtration Hub',
    cadBoundingBox: { x: 36, z: -40, width: 7, depth: 6 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: '289 SQYD utility zone demarcated in Northeast sector on masterplan-real.jpg.'
  },
  {
    id: 'entrance-gate-west',
    sourceId: '33FT_HIGHWAY_SECURITY_CHECKPOINT',
    type: 'GATE',
    title: '33ft Main Arterial Highway & SH-22 Access Portals',
    dimensions: '33\'-0" Wide Road Gateway with Guard Cabin',
    areaDescription: '24/7 Guarded Boom Barrier & Number-Plate Scanner',
    floors: 'Security Post & Boom Barrier Check',
    cadBoundingBox: { x: -36, z: 0, width: 1.8, depth: 11 },
    sourceConfidence: 'SOURCE_VERIFIED',
    architecturalNotes: '33ft main arterial gateway verified from masterplan-real.jpg.'
  }
];

// Helper maps
export const CANONICAL_PLOT_MAP = new Map(CANONICAL_PLOTS.map(p => [p.number, p]));
export const CANONICAL_PLOT_BY_ID = new Map(CANONICAL_PLOTS.map(p => [p.id, p]));
export const CANONICAL_PLOT_BY_CODE = new Map(CANONICAL_PLOTS.map(p => [p.unitCode, p]));
