export const rightValue = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type RightValue = typeof rightValue[number];
export type AccessRight = RightValue[];

export const rightKeys = [
  'mainOperator',
  'subOperator',
  'hotel',
  'bus',
  'accounting',
  'it',
  'mgr',
  'mdm',
] as const;

export type RightKeys = typeof rightKeys[number];
export type Right = { [keys in RightKeys]: RightValue };

const right: Right = {
  mainOperator: 1,
  subOperator: 2,
  hotel: 3,
  bus: 4,
  accounting: 5,
  it: 6,
  mgr: 7,
  mdm: 8,
};

export default right;
