import { GridSizeAndRobotInstructions } from '../models/grid';
import { parseInput } from './parseInput';

const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

describe('parseInput', () => {
  test('returns grid size and robot instructions', async () => {
    const result = parseInput(input);
    const expected: GridSizeAndRobotInstructions = {
      gridSize: { x: 5, y: 3 },
      robotInstructions: [
        {
          startingPos: { x: 1, y: 1, orientation: 'E' },
          commands: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
        },
        {
          startingPos: { x: 3, y: 2, orientation: 'N' },
          commands: [
            'F',
            'R',
            'R',
            'F',
            'L',
            'L',
            'F',
            'F',
            'R',
            'R',
            'F',
            'L',
            'L',
          ],
        },
        {
          startingPos: { x: 0, y: 3, orientation: 'W' },
          commands: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'],
        },
      ],
    };
    expect(result).toEqual(expected);
  });
});
