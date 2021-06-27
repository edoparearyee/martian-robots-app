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

  test('returns error if input is empty', async () => {
    const result = () => parseInput(`      `);
    const expected = new Error('Input is empty');
    expect(result).toThrow(expected);
  });

  test('returns error if grid size is not valid', async () => {
    const result = () =>
      parseInput(`E A
1 1 E
RFRFRFRF`);
    const expected = new Error('Grid size is not valid');
    expect(result).toThrow(expected);
  });

  test('returns error if instructions are not valid', async () => {
    const result = () =>
      parseInput(`5 3
1 1 E
RFRFRFAAR`);
    const expected = new Error(
      'Instructions or starting position are not valid',
    );
    expect(result).toThrow(expected);
  });

  test('returns error if string position are not valid', async () => {
    const result = () =>
      parseInput(`5 3
1 E
RFRFRFAAR`);
    const expected = new Error(
      'Instructions or starting position are not valid',
    );
    expect(result).toThrow(expected);
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
