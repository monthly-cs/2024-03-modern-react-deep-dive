// execute: node docs/dusunax/dil/2024-03-03_sample.js
// keyword: ['radix comparison', 'type coercion', 'number range in js', 'bigint in js']

// ---------------------------------------
// 1. Equality comparison of numbers
// ---------------------------------------

console.log("▷ Radix 2");
const binary_2 = 0b10; // 2
console.log("is binary_2 same as 0b10?", binary_2 == 0b10);
console.log(
  "is binary_2 & (2).toString(2) same?",
  binary_2 == (2).toString(2),
  "number 2 != string 2"
);
console.log(
  "is binary_2 & +(2).toString(2) same?",
  binary_2 == +(2).toString(2),
  "number 2 != Number 10"
);
console.log(
  "is binary_2 & parseInt((2).toString(2), 2) same?",
  binary_2 == parseInt((2).toString(2), 2),
  "number 2 == number 2(parseInt('2', 2)"
);
console.log(
  "is binary_2.toString(2) & (2).toString(2) same?",
  binary_2.toString(2) == (2).toString(2),
  "string 10 == string 10"
);

console.log("\n▷ Radix 8");
const octal_8 = 0o10; // 8
console.log("is octal_8 same as 0o10?", octal_8 == 0o10);
console.log(
  "is octal_8 & (8).toString(8) same?",
  octal_8 == (8).toString(8),
  "number 8 != string 8"
);
console.log(
  "is octal_8 & +(8).toString(8) same?",
  octal_8 == +(8).toString(8),
  "number 8 != number 10"
);
console.log(
  "is octal_8 & parseInt((8).toString(8), 8) same?",
  octal_8 == parseInt((8).toString(8), 8),
  "number 8 == number 8"
);
console.log(
  "is octal_8.toString(8) & (8).toString(8) same?",
  octal_8.toString(8) == (8).toString(8),
  "string 10 == string 10"
);

console.log("\n▷ Radix 16");
const hexadecimal_16 = 0x10; // 16
console.log("is hexadecimal_16 same as 0x10?", hexadecimal_16 == 0x10);
console.log(
  "is hexadecimal_16 & (16).toString(16) same?",
  hexadecimal_16 == (16).toString(16),
  "number 16 != string 16"
);
console.log(
  "is hexadecimal_16 & +(16).toString(16) same?",
  hexadecimal_16 == +(16).toString(16),
  "number 16 != number 10"
);
console.log(
  "is hexadecimal_16 & parseInt((16).toString(16), 16) same?",
  hexadecimal_16 == parseInt((16).toString(16), 16),
  "number 16 == number 16"
);
console.log(
  "is hexadecimal_16.toString(16) & (16).toString(16) same?",
  hexadecimal_16.toString(16) == (16).toString(16),
  "string 10 == string 10"
);

// ---------------------------------------
// 2. BigInt & Number
// ---------------------------------------

const biggestNum = Number.MAX_VALUE;
const outOfRangeA = biggestNum + 1;
const outOfRangeB = biggestNum + 100;
console.log("biggestNum + 1 === biggestNum + 100", outOfRangeA === outOfRangeB);

const notABigInt = 9007199254740991;
const bigIntA = BigInt(notABigInt);
const bigIntB = 9007199254740991n;
console.log("notABigInt == bigIntA", notABigInt === bigIntA); // value is same?
console.log("notABigInt === bigIntA", notABigInt === bigIntA); // Number !== BigInt, two variable's type is not same.
console.log("bigIntA == bigIntB", bigIntA == bigIntB);

const bigIntOutOfRangeA = bigIntA + 1n;
const bigIntOutOfRangeB = bigIntA + 100n;
console.log(
  "bigIntOutOfRangeA === bigIntOutOfRangeB",
  bigIntOutOfRangeA === bigIntOutOfRangeB
);
