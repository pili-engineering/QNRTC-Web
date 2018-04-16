export * from './request';
import seedrandom from 'seedrandom';

export function getElementFromArray<T>(array: T[], key: string, value: any): T | null {
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    if (item[key] === value) {
      return item;
    }
  }

  return null;
}

export function getColorFromUserId(userId: string): string {
  const colors = [
    '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#009688', '#4caf50', '#ff9800', '#795548',
  ];
  const rand = seedrandom(userId);
  return colors[Math.min(Math.floor(rand() * 8), 7)];
}
