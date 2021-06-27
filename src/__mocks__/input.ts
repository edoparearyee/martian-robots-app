import { GridSize } from '../models/grid';
import { RobotInstructions } from '../models/robot';

export const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

export const gridSize: GridSize = { x: 5, y: 3 };

export const robotInstructions: RobotInstructions = [
  {
    startingPos: { x: 1, y: 1, orientation: 'E' },
    commands: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
  },
  {
    startingPos: { x: 3, y: 2, orientation: 'N' },
    commands: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'],
  },
  {
    startingPos: { x: 0, y: 3, orientation: 'W' },
    commands: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'],
  },
];
