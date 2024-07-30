const express = require("express");
// file deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>
const app = express();

app.use(express.json());

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

app.post("/sortColors", (req, res) => {
  const { nums } = req.body;
  const sortedNums = sortColors(nums);
  res.json(sortedNums);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
