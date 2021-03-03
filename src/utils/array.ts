/**
 * 数组合并并去重
 * @param arr1 数组1
 * @param arr2 数组2
 */
export function mergeUnique<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const arr: Array<T> = arr1;
  for (let index = 0, len = arr2.length; index < len; index += 1) {
    if (!arr.includes(arr2[index])) {
      arr.push(arr2[index]);
    }
  }

  return arr;
}

/**
 * 数组去重
 * @param arr 数组
 */
export function unique<T>(arr: Array<T>): Array<T> {
  const array: Array<T> = [];
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (!array.includes(arr[index])) {
      array.push(arr[index]);
    }
  }
  return array;
}
