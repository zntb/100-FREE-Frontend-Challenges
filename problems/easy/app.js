// 1 - Find Max
// Write a function findMax that takes an array of integers and returns the maximum value.
function findMax(nums) {
  if (nums.length === 0) {
    throw new Error('The array is empty');
  }

  let maxValue = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > maxValue) {
      maxValue = nums[i];
    }
  }

  return maxValue;
}

// 2 - Reverse String
// Write a function reverseString that takes a string and returns it reversed.
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 3 - Sum Array
// Write a function sumArray that takes an array of integers and returns the sum of all elements.
function sumArray(nums) {
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  return sum;
}

// 4 - Multiply
// Write a function multiply that takes two integers a and b and returns their product.
function multiply(a, b) {
  return a * b;
}

// 5 - Count Vowels
// Write a function countVowels that takes a string and returns the number of vowels in it.
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

// 6 - Is Even
// Write a function isEven that takes an integer and returns true if it is even, false otherwise.
function isEven(num) {
  return num % 2 === 0;
}

// 7 - Factorial
// Write a function factorial that takes a non-negative integer and returns its factorial.
function factorial(num) {
  if (num < 0) {
    throw new Error('Input must be a non-negative integer');
  }

  if (num === 0 || num === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}

// 8 - Find Min
// Write a function findMin that takes an array of integers and returns the minimum value.
function findMin(nums) {
  if (nums.length === 0) {
    throw new Error('The array is empty');
  }

  let minValue = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < minValue) {
      minValue = nums[i];
    }
  }

  return minValue;
}

// 9 - Sort Array
// Write a function sortArray that takes an array of integers and returns
// a new array with the elements sorted in ascending order.
function sortArray(nums) {
  return nums.slice().sort((a, b) => a - b);
}

// 10 - Two Sum
// Write a function twoSum that takes two integers a and b and returns their sum.
function twoSum(a, b) {
  return a + b;
}

// 11 - Palindrome
// Write a function isPalindrome that determines if a given string is a palindrome.
// A string is considered a palindrome if it reads the same forward and backward,
// ignoring cases, spaces, and punctuation.
function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replace(/[^a-z0-9]/g, '');

  const reversedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedString;
}
