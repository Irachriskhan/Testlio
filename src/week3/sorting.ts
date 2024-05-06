/**
 * How do you sort an array of integers in ascending order? without using  any inbuilt functions in typescript
 * Example: numbers= [4, 2, 7, 1, 9, 3];
 * Output: [1, 2, 3, 4, 7, 9]
 * Instructions:
 * Please provide the comments/sudo code for each line of code
 * Please do not use any hard coded /Static information to pull data
 * Code needs to executed for any kind of input
 */

// ----------------------------------------------------------------
const numbers = [4, 2, 7, 1, 9, 3]; // input array of numbers to be sorted   order

// sortArray function takes an array of unsorted numbers and returns an array of sorted numbers
function sortArray(numbers: number[]): number[] {
  let temp: number; // temporary variable to store the sorted numbers

  // outer loop that iterate every element in the array
  for (let i = 0; i < numbers.length; i++) {
    // inner loop that compare a current element at every iteration by the next number in the array
    for (let j = i + 1; j < numbers.length; j++) {
      // compare current number with of the next number then swap their positions
      if (numbers[i] > numbers[j]) {
        temp = numbers[i]; // keep the current number in temp variable
        numbers[i] = numbers[j];
        numbers[j] = temp;
      }
    }
  }
  // return the sorted array of numbers
  return numbers;
}

console.log(sortArray(numbers));
