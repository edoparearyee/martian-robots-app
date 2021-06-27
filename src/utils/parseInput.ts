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

  if (!lines.length) {
    throw new Error('Input is empty');
  }

  const [x, y] = (lines.shift() as string)
    .split(' ')
    .map((i) => parseInt(i, 10));

  const gridSize: GridSize = { x, y };

  if (isNaN(x) || isNaN(y)) {
    throw new Error('Grid size is not valid');
  }

  const robotInstructions: RobotInstructions = lines
    .reduce<string[][]>(pairArrItems, [])
    .map(mapCommands);

  if (
    !robotInstructions.length ||
    !robotInstructions.every(
      (r) =>
        r.commands.every((c) => ['R', 'F', 'L'].includes(c)) &&
        !isNaN(r.startingPos.x) &&
        !isNaN(r.startingPos.y) &&
        ['N', 'S', 'E', 'W'].includes(r.startingPos.orientation),
    )
  ) {
    throw new Error('Instructions or starting position are not valid');
  }

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
