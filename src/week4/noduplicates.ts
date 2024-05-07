// Given a string without spaces, the task is to remove duplicates from it.
// Example:input= “test”
// Output: “tes”

let input: string = "tes";

const removeDuplicates = (input: string): string => {
  // initialize the index and split the input
  let str: any = input.split("");
  let index = 0;
  // Traverse through all characters
  for (let i = 0; i < str.length; i++) {
    // Check if str[i] is present before it
    let j: number;
    for (j = 0; j < i; j++) {
      if (str[i] === str[j]) {
        // if the string is duplicated, end the loop
        break;
      }
    }

    // If not present, then add it to result.
    if (j === i) {
      str[index++] = str[i];
    }
  }
  return str.join("").slice(str, index); // return the answer
};

export { input, removeDuplicates }; // export the function and its arguments
