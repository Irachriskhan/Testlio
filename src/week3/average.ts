// To find the average of numbers in a list using TypeScript
// Example: numberList = [10, 20, 30, 40, 50];

// Output: Average: 30

let numberList: number[] = [10, 20, 30, 40, 50];

const average = (numberList: number[]) => {
  let sum: number = 0;
  for (let i = 0; i < numberList.length; i++) {
    sum += numberList[i];
  }
  //   console.log(sum);
  return sum / numberList.length;
};

let answer: number = average(numberList);
console.log(answer);
