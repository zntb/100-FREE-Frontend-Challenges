// 1 - Sort Colors
/* Write a function sortColors that takes an array of integers nums representing colors, where:

    0 represents red,
    1 represents white,
    2 represents blue.

The function should sort the array in place so that the colors are in the order red, white, and blue.*/
function sortColors(nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    return [];
  }

  let i = 0,
    j = 0,
    k = nums.length - 1;

  while (j <= k) {
    if (nums[j] === 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j++;
    } else if (nums[j] === 2) {
      [nums[j], nums[k]] = [nums[k], nums[j]];
      k--;
    } else {
      j++;
    }
  }

  return nums;
}

// 2 - Permutations
// Write a function permute that takes an array of distinct integers
// and returns all possible permutations.
function permute(nums) {
  const result = [];

  function backtrack(currentPermutation) {
    if (currentPermutation.length === nums.length) {
      result.push(currentPermutation.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (currentPermutation.includes(nums[i])) {
        continue;
      }
      currentPermutation.push(nums[i]);
      backtrack(currentPermutation);
      currentPermutation.pop();
    }
  }

  backtrack([]);

  return result;
}

// 3 - Longest Palindromic Substring
// Write a function longestPalindrome that takes a string and returns
// the longest palindromic substring.
function longestPalindrome(s) {
  let maxLength = 1;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    let oddLength = expandAroundCenter(s, i, i);
    let evenLength = expandAroundCenter(s, i, i + 1);

    let currentLength = Math.max(oddLength, evenLength);
    if (currentLength > maxLength) {
      maxLength = currentLength;
      start = i - ((currentLength - 1) >> 1);
    }
  }

  return s.substring(start, start + maxLength);
}

function expandAroundCenter(s, left, right) {
  let l = left;
  let r = right;

  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }

  return r - l - 1;
}

// 4 - Top N Frequent Words
// Write a function topNFrequentWords that takes a large text document
// as input and returns the top N most frequent words.
// The function should be optimized for performance
function topNFrequentWords(text, N) {
  const words = text.toLowerCase().match(/\b\w+\b/g);

  const frequencyMap = new Map();
  words.forEach((word) => {
    frequencyMap.set(
      word,
      frequencyMap.has(word) ? frequencyMap.get(word) + 1 : 1,
    );
  });

  const sortedWords = [...frequencyMap.entries()].sort((a, b) => b[1] - a[1]);

  const topNWords = sortedWords.slice(0, N).map((entry) => entry[0]);

  return topNWords;
}

// 5 - Search in Rotated Sorted Array
// Write a function search that takes a rotated sorted array and a
// target value, and returns the index if the target is found.
// If not, returns -1.
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// 6 - Top K Frequent Elements
// Write a function topKFrequent that takes an array of integers and
// an integer k, and returns the k most frequent elements.
function topKFrequent(nums, k) {
  const frequencyMap = new Map();
  nums.forEach((num) => {
    frequencyMap.set(
      num,
      frequencyMap.has(num) ? frequencyMap.get(num) + 1 : 1,
    );
  });

  const sortedNums = [...frequencyMap.entries()].sort((a, b) => b[1] - a[1]);

  const topK = sortedNums.slice(0, k).map((entry) => entry[0]);

  return topK;
}

// 7 - Subsets
// Write a function subsets that takes an array of distinct integers
// and returns all possible subsets.
function subsets(nums) {
  const result = [[]];

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const size = result.length;
    for (let j = 0; j < size; j++) {
      const subset = [...result[j], num];
      result.push(subset);
    }
  }

  return result;
}

// 8 - Word Break
// Write a function wordBreak that takes a string s and a dictionary of
// strings wordDict, and returns true if s can be segmented into a
// space-separated sequence of one or more dictionary words.
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);

  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      const substring = s.substring(start, end);
      if (dp[start] && wordSet.has(substring)) {
        dp[end] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
