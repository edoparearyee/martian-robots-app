import { RobotInstructions } from './robot';

export interface GridSizeAndRobotInstructions {
  gridSize: GridSize;
  robotInstructions: RobotInstructions;
}

export interface GridSize {
  x: number;
  y: number;
}
