import { Position } from '../models/robot';
// eslint-disable-next-line jest/no-mocks-import
import { gridSize, robotInstructions } from '../__mocks__/input';
import {
  attemptMove,
  getNewPosition,
  runRobotCommands,
  turn,
} from './runRobotCommands';

describe('runRobotCommands', () => {
  test('returns grid size and robot instructions', async () => {
    const result = runRobotCommands(gridSize, robotInstructions);
    const expected = `1 1 E
3 3 N LOST
2 3 S`;
    expect(result).toEqual(expected);
  });

  test('returns new position', async () => {
    const args1: Position = { x: 1, y: 1, orientation: 'N' };
    const result1 = getNewPosition(args1);
    const expected1: Position = { x: 1, y: 2, orientation: 'N' };
    expect(result1).toEqual(expected1);

    const args2: Position = { x: 1, y: 1, orientation: 'S' };
    const result2 = getNewPosition(args2);
    const expected2: Position = { x: 1, y: 0, orientation: 'S' };
    expect(result2).toEqual(expected2);

    const args3: Position = { x: 1, y: 1, orientation: 'E' };
    const result3 = getNewPosition(args3);
    const expected3: Position = { x: 2, y: 1, orientation: 'E' };
    expect(result3).toEqual(expected3);

    const args4: Position = { x: 1, y: 1, orientation: 'W' };
    const result4 = getNewPosition(args4);
    const expected4: Position = { x: 0, y: 1, orientation: 'W' };
    expect(result4).toEqual(expected4);
  });

  test('returns correct orientation after turning right', async () => {
    const result1 = turn('R', 'N');
    const expected1 = 'E';
    expect(result1).toEqual(expected1);

    const result2 = turn('R', 'E');
    const expected2 = 'S';
    expect(result2).toEqual(expected2);

    const result3 = turn('R', 'S');
    const expected3 = 'W';
    expect(result3).toEqual(expected3);

    const result4 = turn('R', 'W');
    const expected4 = 'N';
    expect(result4).toEqual(expected4);
  });

  test('returns correct orientation after turning left', async () => {
    const result1 = turn('L', 'N');
    const expected1 = 'W';
    expect(result1).toEqual(expected1);

    const result2 = turn('L', 'E');
    const expected2 = 'N';
    expect(result2).toEqual(expected2);

    const result3 = turn('L', 'S');
    const expected3 = 'E';
    expect(result3).toEqual(expected3);

    const result4 = turn('L', 'W');
    const expected4 = 'S';
    expect(result4).toEqual(expected4);
  });

  test('return new position if attempting to move to valid position', async () => {
    const pos: Position = { x: 2, y: 2, orientation: 'E' };
    const lostPositions: string[] = [];
    const result = attemptMove(pos, gridSize, lostPositions);
    const expected = { x: 3, y: 2, orientation: 'E' };
    expect(result).toEqual(expected);
  });

  test('return error position if attempting to move to position "off" grid', async () => {
    const pos: Position = { x: 5, y: 2, orientation: 'E' };
    const lostPositions: string[] = [];
    const result = () => attemptMove(pos, gridSize, lostPositions);
    const expected = new Error('Position out of grid');
    expect(result).toThrow(expected);
  });

  test('return current position if attempting to "off" grid but previous robot has left a "scent"', async () => {
    const pos: Position = { x: 5, y: 2, orientation: 'E' };
    const lostPositions: string[] = [JSON.stringify({ x: 5, y: 2 })];
    const result = attemptMove(pos, gridSize, lostPositions);
    const expected = { x: 5, y: 2, orientation: 'E' };
    expect(result).toEqual(expected);
  });
});
