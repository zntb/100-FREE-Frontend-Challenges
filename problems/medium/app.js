// 1 - Merge Intervals
// Write a function mergeIntervals that takes an array of intervals and merges all overlapping intervals.
function mergeIntervals(intervals) {
  if (intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  merged.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    const lastInterval = merged[merged.length - 1];
    const currentInterval = intervals[i];

    if (currentInterval[0] <= lastInterval[1]) {
      lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);
    } else {
      merged.push(currentInterval);
    }
  }
  return merged;
}

// 2 - Group Anagrams
// Write a function groupAnagrams that takes an array of strings and groups the anagrams together.
function groupAnagrams(strs) {
  const map = new Map();

  for (let str of strs) {
    const sortedStr = str.split('').sort().join('');

    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }

    map.get(sortedStr).push(str);
  }

  return Array.from(map.values());
}

// - Merge Sorted Lists
// Write a function mergeSortedLists that takes two sorted linked lists and merges them into one sorted list.
function mergeSortedLists(l1, l2) {
  let merged = [];
  let i = 0;
  let j = 0;

  while (i < l1.length && j < l2.length) {
    if (l1[i] <= l2[j]) {
      merged.push(l1[i]);
      i++;
    } else {
      merged.push(l2[j]);
      j++;
    }
  }

  while (i < l1.length) {
    merged.push(l1[i]);
    i++;
  }

  while (j < l2.length) {
    merged.push(l2[j]);
    j++;
  }

  return merged;
}

// 3 - Three Sum
// Write a function threeSum that takes an array of integers and returns all unique
// triplets that sum up to zero.
function threeSum(nums) {
  nums.sort((a, b) => a - b);

  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// 4 - Product of Array Except Self
// Write a function productExceptSelf that takes an array of integers and returns
// an array such that each element at index i is the product of all the numbers
// in the original array except the one at i.
function productExceptSelf(nums) {
  const length = nums.length;
  const leftProducts = new Array(length);
  const rightProducts = new Array(length);
  const result = new Array(length);

  leftProducts[0] = 1;
  for (let i = 1; i < length; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }

  rightProducts[length - 1] = 1;
  for (let i = length - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < length; i++) {
    result[i] = leftProducts[i] * rightProducts[i];
  }

  return result;
}

// 5 - Maximum Subarray
// Write a function maxSubArray that takes an array of integers and returns
// the contiguous subarray (containing at least one number) which has the largest sum.
function maxSubArray(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// 6 - First Missing Positive
// Write a function firstMissingPositive that takes an array of integers and finds
// the smallest missing positive integer.
function firstMissingPositive(nums) {
  if (!nums || nums.length === 0) {
    return 1;
  }

  const n = nums.length;

  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0) {
      continue;
    }
    while (nums[i] !== i + 1) {
      const num = Math.abs(nums[nums[i] - 1]);
      if (num === nums[i]) {
        break;
      }
      [nums[i], nums[num - 1]] = [num, nums[i]];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return n + 1;
}
