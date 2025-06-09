// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// My functions below:

// Function to validate credit card number using the Luhn algorithm
// will return true if valid, false if invalid
const validateCred = (arr) => {
  let sum = 0;
  // starting with farthest digit to the right ('check digit') and iterating to the left, skipping every other number
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    let double = arr[i] * 2;
    if (double > 9) {
      sum += double - 9;
    } else {
      sum += double;
    }
  }
  // the other numbers that were previously skipped over
  for (let j = arr.length - 1; j >= 0; j -= 2) {
    sum += arr[j];
  }
  if (sum % 10 !== 0) {
    return false;
  } else {
    return true;
  }
};

// Logging to the console to see if the above function worked:

console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));

console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));

let invalidCards = [];
// Function that checks through nested array for invalid numbers
// returns another nested array (invalidCards) of invalid cards
const findInvalidCards = (nestArr) => {
  for (let i = 0; i < nestArr.length; i++) {
    if (validateCred(nestArr[i]) === false) {
      invalidCards.push(nestArr[i]);
    }
  }
  return invalidCards;
};

// Logging to the console to see nested array of invalid cards
console.log(findInvalidCards(batch));

// Function to identify credit card companies that issued faulty card numbers
// returns an array (invalidCompanies) of companies that issued faulty card numbers
const idInvalidCardCompanies = (nestArrOfInvalNums) => {
  let invalidCompanies = [];
  for (let i = 0; i < nestArrOfInvalNums.length; i++) {
    if (nestArrOfInvalNums[i][0] === 3) {
      invalidCompanies.push("Amex (American Express)");
    } else if (nestArrOfInvalNums[i][0] === 4) {
      invalidCompanies.push("Visa");
    } else if (nestArrOfInvalNums[i][0] === 5) {
      invalidCompanies.push("Mastercard");
    } else if (nestArrOfInvalNums[i][0] === 6) {
      invalidCompanies.push("Discover");
    } else {
      console.log("Company not found");
    }
  }
  return [...new Set(invalidCompanies)]; // removes duplicates
};

// Logging to the console the companies that have issued faulty card numbers
console.log(idInvalidCardCompanies(invalidCards));
