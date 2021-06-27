import { GridSizeAndRobotInstructions } from '../models/grid';
// eslint-disable-next-line jest/no-mocks-import
import { gridSize, input, robotInstructions } from '../__mocks__/input';
import { mapCommands, pairArrItems, parseInput } from './parseInput';

describe('parseInput', () => {
  test('returns grid size and robot instructions', async () => {
    const result = parseInput(input);
    const expected: GridSizeAndRobotInstructions = {
      gridSize: gridSize,
      robotInstructions,
    };
    expect(result).toEqual(expected);
  });

  test('pair array items', async () => {
    const arr = [1, 2, 3, 4];
    const result = arr.reduce<number[][]>(pairArrItems, []);
    const expected = [
      [1, 2],
      [3, 4],
    ];
    expect(result).toEqual(expected);
  });

  test('create string position and commands from input strings', async () => {
    const posStr = '1 1 E';
    const commandsStr = 'RFRFRFRF';
    const result = mapCommands([posStr, commandsStr]);
    const expected = {
      startingPos: { x: 1, y: 1, orientation: 'E' },
      commands: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
    };
    expect(result).toEqual(expected);
  });
});
