const TYPES = {
  zero: "zero",
  tens: "tens",
  singleDigit: "singleDigit",
  doubleDigit: "doubleDigit",
  hundred: "hundred",
  multiplier: "multiplier",
  skip: "skip",
};

export class WordsNumbersConverter {
  static #numbersMap = {
    and: {
      value: 0,
      type: TYPES.skip,
    },
    zero: {
      value: 0,
      type: TYPES.zero,
    },
    one: {
      value: 1,
      type: TYPES.singleDigit,
    },
    two: {
      value: 2,
      type: TYPES.singleDigit,
    },
    three: {
      value: 3,
      type: TYPES.singleDigit,
    },
    four: {
      value: 4,
      type: TYPES.singleDigit,
    },
    five: {
      value: 5,
      type: TYPES.singleDigit,
    },
    six: {
      value: 6,
      type: TYPES.singleDigit,
    },
    seven: {
      value: 7,
      type: TYPES.singleDigit,
    },
    eight: {
      value: 8,
      type: TYPES.singleDigit,
    },
    nine: {
      value: 9,
      type: TYPES.singleDigit,
    },
    ten: {
      value: 10,
      type: TYPES.doubleDigit,
    },
    eleven: {
      value: 11,
      type: TYPES.doubleDigit,
    },
    twelve: {
      value: 12,
      type: TYPES.doubleDigit,
    },
    thirteen: {
      value: 13,
      type: TYPES.doubleDigit,
    },
    fourteen: {
      value: 14,
      type: TYPES.doubleDigit,
    },
    fifteen: {
      value: 15,
      type: TYPES.doubleDigit,
    },
    sixteen: {
      value: 16,
      type: TYPES.doubleDigit,
    },
    seventeen: {
      value: 17,
      type: TYPES.doubleDigit,
    },
    eighteen: {
      value: 18,
      type: TYPES.doubleDigit,
    },
    nineteen: {
      value: 19,
      type: TYPES.doubleDigit,
    },
    twenty: {
      value: 20,
      type: TYPES.tens,
    },
    thirty: {
      value: 30,
      type: TYPES.tens,
    },
    forty: {
      value: 40,
      type: TYPES.tens,
    },
    fifty: {
      value: 50,
      type: TYPES.tens,
    },
    sixty: {
      value: 60,
      type: TYPES.tens,
    },
    seventy: {
      value: 70,
      type: TYPES.tens,
    },
    eighty: {
      value: 80,
      type: TYPES.tens,
    },
    ninety: {
      value: 90,
      type: TYPES.tens,
    },
    hundred: {
      value: 100,
      type: TYPES.hundred,
    },
    thousand: {
      value: 1000,
      type: TYPES.multiplier,
      powerOfTen: 3,
    },
    million: {
      value: 1_000_000,
      type: TYPES.multiplier,
      powerOfTen: 6,
    },
  };
  static _validateString(value) {
    if (typeof value !== "string" || !value.trim()) {
      return false;
    }

    const isAlphaOnly = !!value.toLowerCase().match(/[a-z ]*/)[0];
    if (!isAlphaOnly) {
      return false;
    }

    return true;
  }

  static convertToNumbers(value) {
    if (!this._validateString(value)) {
      return null;
    }

    const lowerCasedValue = value.toLowerCase().trim();

    const parts = lowerCasedValue.split(" ");

    const resultReversed = [];

    let currentIndex = 0;

    while (parts.length) {
      const currentNumber = this.#numbersMap[parts.pop()];

      if (!currentNumber) {
        return null;
      }

      const currentNumberValue = currentNumber.value;

      if (currentNumber.type === TYPES.zero) {
        if (parts.length === 0) {
          return 0;
        } else {
          return null;
        }
      }

      if (
        currentNumber.type === TYPES.skip &&
        (currentIndex === 1 || currentIndex === 2) &&
        parts.length !== 0
      ) {
        // Skip "and" if it connects large part of number with double or single digit figures
        continue;
      }

      if (
        ![TYPES.singleDigit, TYPES.doubleDigit, TYPES.tens].includes(
          currentNumber.type
        ) &&
        parts.length === 0
      ) {
        // A number should be placed before "hundred", "thousand" and "million"
        return null;
      }

      if (
        currentNumber.type === TYPES.singleDigit &&
        // Single digits must be placed in the first and last part of hundreds
        (currentIndex - 1) % 3 !== 0
      ) {
        resultReversed[currentIndex] = currentNumberValue;
        currentIndex++;
      } else if (
        currentNumber.type === TYPES.doubleDigit &&
        currentIndex % 3 === 0
      ) {
        // Special case of double number that also contains single digit
        // Can only be placed in the second part of hundreds
        resultReversed[currentIndex] = currentNumberValue % 10;
        resultReversed[currentIndex + 1] = Math.floor(currentNumberValue / 10);
        currentIndex += 2;
      } else if (currentNumber.type === TYPES.tens) {
        if ((currentIndex - 1) % 3 === 0) {
          // If current index indicates the second part of hundreds then proceed with adding
          // numeric value on the spot
          resultReversed[currentIndex] = currentNumberValue / 10;
          currentIndex++;
        } else if (currentIndex === 0 || (currentIndex - 1) % 3 === 0) {
          // If current index indicates the first part of hundreds then add numeric value to
          // the second part of hundreds and add 0 to the first part of hundreds, then increase
          // current index by 2
          resultReversed[currentIndex] = resultReversed[currentIndex] ?? 0;
          resultReversed[currentIndex + 1] = currentNumberValue / 10;
          currentIndex += 2;
        } else {
          // If tens placement is in the third part of hundreds then the number is incorrect
          return null;
        }
      } else if (currentNumber.type === TYPES.hundred) {
        const indexRest = (currentIndex + 1) % 3;
        if (indexRest === 0) {
          // As this is not a number but an indicator for placement, if the current index is already
          // placed on the third part of hundreds then proceed to the next part to add the number
          continue;
        }
        const newIndex = currentIndex + 3 - indexRest;

        // If the current index is on any other part of hundreds then fill the skipped values with 0s
        for (let i = currentIndex; i < newIndex; i++) {
          resultReversed[i] = 0;
        }

        currentIndex = newIndex;
      } else if (
        currentNumber.type === TYPES.multiplier &&
        currentIndex <= currentNumber.powerOfTen
      ) {
        // Is correct only if the current index is not over its power of ten indicator
        // If the current index is below, fill all the missing numbers with 0s
        for (let i = currentIndex; i < currentNumber.powerOfTen; i++) {
          resultReversed[i] = 0;
        }
        currentIndex = currentNumber.powerOfTen;
        continue;
      } else {
        return null;
      }
    }

    const result = resultReversed.reverse().join("");
    return result;
  }
}
