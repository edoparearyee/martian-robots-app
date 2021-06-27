export interface RobotInstruction {
  startingPos: Position;
  commands: Commands;
}

export type RobotInstructions = RobotInstruction[];

export interface Position {
  x: number;
  y: number;
  orientation: Orientation;
}

export type Command = 'L' | 'R' | 'F';
export type Commands = Command[];
export type Orientation = 'N' | 'S' | 'E' | 'W';
