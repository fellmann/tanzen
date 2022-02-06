export function arrayWithZeros(n: number) {
  return Array.from({ length: n }, () => 0);
}

export function arrayWithIndex(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
export function array2dWithZeros(n: number, m: number) {
  return Array.from({ length: n }, () => arrayWithZeros(m));
}

