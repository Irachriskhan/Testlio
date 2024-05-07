// Given two strings S1 and S2 as input, the task is to merge them alternatively
//  i.e. the first character of S1 then the first character of S2 and so on till
//  the strings end
// Input:
// S1 = "Hello" S2 = "Bye"
// Output: HBeylelo

const s1: string = "Hello";
const s2: string = "Bye";
// controller function
const mergeAlternatively = (s1: string, s2: string): string => {
  let result: string = ""; //

  for (let i = 0; i <= s1.length || i <= s2.length; i++) {
    //loop condition checks if i is less than a.length or b.length
    if (i < s1.length)
      //if i is less than a.length add a[i] to string first.
      result += s1[i];
    if (i < s2.length)
      //if i is less than b.length add b[i] to string.
      result += s2[i];
  }

  return result; // return the result
};

export { s1, s2, mergeAlternatively }; // export the function and its arguments
