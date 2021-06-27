import { GridSize, GridSizeAndRobotInstructions } from '../models/grid';
import {
  Position,
  RobotInstruction,
  RobotInstructions,
  Orientation,
  Commands,
} from '../models/robot';

export const parseInput = (
  input: string,
): GridSizeAndRobotInstructions | null => {
  const lines = input
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length);

  if (!lines.length) return null;

  const [x, y] = (lines.shift() as string)
    .split(' ')
    .map((i) => parseInt(i, 10));

  const gridSize: GridSize = { x, y };

  const robotInstructions: RobotInstructions = lines
    .reduce<string[][]>(pairArrItems, [])
    .map(mapCommands);

  return {
    gridSize,
    robotInstructions,
  };
};

export const pairArrItems = <T>(
  current: T[][],
  _: T,
  i: number,
  arr: T[],
): T[][] => {
  if (i % 2 === 0) {
    current.push(arr.slice(i, i + 2));
  }
  return current;
};

export const mapCommands = ([
  posStr,
  commandsStr,
]: string[]): RobotInstruction => {
  const [x, y, orientation] = posStr.split(' ');

  const startingPos: Position = {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    orientation: orientation as Orientation,
  };

  const commands = commandsStr.split('') as Commands;

  return {
    startingPos,
    commands,
  };
};
