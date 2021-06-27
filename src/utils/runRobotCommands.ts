import { GridSize } from '../models/grid';
import { Orientation, Position, RobotInstructions } from '../models/robot';

export const runRobotCommands = (
  gridSize: GridSize,
  robotInstructions: RobotInstructions,
): string => {
  const lostPositions: string[] = [];

  return robotInstructions
    .map(({ startingPos, commands }) => {
      let currentPos = startingPos;
      let isLost = false;

      for (let i = 0; i < commands.length; i++) {
        switch (commands[i]) {
          case 'F': {
            try {
              currentPos = attemptMove(currentPos, gridSize, lostPositions);
            } catch (e) {
              isLost = true;
            }
            break;
          }
          case 'L': {
            const orientation = turn('L', currentPos.orientation);
            currentPos = { ...currentPos, orientation };
            break;
          }
          case 'R': {
            const orientation = turn('R', currentPos.orientation);
            currentPos = { ...currentPos, orientation };
            break;
          }
        }
        if (isLost) {
          break;
        }
      }

      return `${currentPos.x} ${currentPos.y} ${currentPos.orientation} ${
        isLost ? 'LOST' : ''
      }`.trim();
    })
    .join('\n');
};

export const attemptMove = (
  currentPos: Position,
  gridSize: GridSize,
  lostPositions: string[],
): Position => {
  const currentGridPos = JSON.stringify({ x: currentPos.x, y: currentPos.y });
  const newPos = getNewPosition(currentPos);
  const isNewPosOutsideGrid = isOutsideGrid(newPos, gridSize);
  const hasRobotLostScent = lostPositions.includes(currentGridPos);

  if (isNewPosOutsideGrid && !hasRobotLostScent) {
    lostPositions.push(currentGridPos);
    throw new Error('Position out of grid');
  }

  if (!isNewPosOutsideGrid) {
    return newPos;
  }

  return currentPos;
};

export const getNewPosition = (currentPos: Position): Position => {
  switch (currentPos.orientation) {
    case 'N': {
      return { ...currentPos, y: currentPos.y + 1 };
    }
    case 'S': {
      return { ...currentPos, y: currentPos.y - 1 };
    }
    case 'E': {
      return { ...currentPos, x: currentPos.x + 1 };
    }
    case 'W': {
      return { ...currentPos, x: currentPos.x - 1 };
    }
  }
};

export const turn = (
  direction: 'L' | 'R',
  orientation: Orientation,
): Orientation => {
  const orientations: Orientation[] = ['N', 'E', 'S', 'W'];
  const current = orientations.indexOf(orientation);
  switch (direction) {
    case 'L': {
      return orientations[current - 1] || orientations[orientations.length - 1];
    }
    case 'R': {
      return orientations[current + 1] || orientations[0];
    }
    default: {
      return orientation;
    }
  }
};

export const isOutsideGrid = (pos: Position, gridSize: GridSize): boolean => {
  return pos.x > gridSize.x || pos.x < 0 || pos.y > gridSize.y || pos.y < 0;
};
