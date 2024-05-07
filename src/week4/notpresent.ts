// Given Two Arrays—Can You Find Which Number Is Not Present in the Second
// Array? using TypeScript and should be added on git code
// Array1= {1, 2, 3, 4, 5, 10} Array2= {2, 3, 1, 0, 5};
// Output: Average: 4,10

// inputs arrays
let arr1: number[] = [1, 2, 3, 4, 5, 10];
let arr2: number[] = [2, 3, 1, 0, 5];

const notPresent = (arr1: number[], arr2: number[]): number[] => {
  let result: any = []; // output array
  // iterate over arrays
  for (let i = 0; i < arr1.length; i++) {
    // pass through array one
    let found = false; // set the flag to false

    for (let j = 0; j < arr2.length; j++) {
      // pass through array two
      if (arr1[i] === arr2[j]) {
        // compare element from array one to elements of array 2
        found = true; // when found, jump to the next iteration
        break;
      }
    }

    if (!found) {
      // when not found, keep the element in the result
      result.push(arr1[i]);
    }
  }
  return result.join(","); // remove square brackets of the array
};

export { arr1, arr2, notPresent }; // export arrays and the function
