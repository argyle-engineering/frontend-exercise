import { numbersMap, separators } from "./constants/numbers-map";
import { useState } from 'react';

const INCORRECT_TEXT = "incorrect";
const LINK_WORD = "and";
const ZERO_CASE_WORD = "zero";

function App() {
  const [text, setText] = useState('');

  function transformTextToNumber(inputWord) {
    if (inputWord.toLowerCase().trim() === ZERO_CASE_WORD) {
      return 0;
    }
    const numberWords = inputWord.toLowerCase().trim().split(" ");

    // Condition for first number
    if (numberWords[0] && numberWords[0] > 99) {
      return INCORRECT_TEXT;
    }

    let total = 0;
    let temporaryTotal = 0;
    let digitBlockedForChange = [false, false, false];
    let nextMaxSeparator = Math.max(...separators);

    for (let index = 0; index < numberWords.length; index++) {

      // Check "AND" link word is on correct position
      if (numberWords[index] === LINK_WORD) {
        if (isLinkWordOnSemanticPosition(temporaryTotal, index, numberWords.length)) {
          continue;
        } else {
          return INCORRECT_TEXT;
        }
      }

      const value = numbersMap[numberWords[index]];

      // Check if the current word is a number word
      if (!value) {
        return INCORRECT_TEXT;
      }

      // if (temporaryTotal > 999) {
      //   return INCORRECT_TEXT;
      // }

      if (separators.includes(value)) {
        if (value <= nextMaxSeparator) {
          total = total + temporaryTotal * value;
          temporaryTotal = 0;
          nextMaxSeparator = getNextMaxSeparator(nextMaxSeparator);
          digitBlockedForChange = [false, false, false];
        } else {
          return INCORRECT_TEXT;
        }
      } else {
        if (value > 99) {
          temporaryTotal = temporaryTotal * value;
          // actually last digits were hundred digits, so we need to unblock them and block ony the hundreds digit
          digitBlockedForChange = [true, false, false];

          // Condition for too big temporary total
          if (temporaryTotal > 999) {
            return INCORRECT_TEXT;
          }
        } else {
          if (isAddingNewNumberAllowed(value, digitBlockedForChange)) {
            temporaryTotal += value;
          } else {
            return INCORRECT_TEXT;
          }
        }
      }
    }

    return total + temporaryTotal;
  }

  function isAddingNewNumberAllowed(value, digitBlockedForChange) {
    const valueToAdd = value
      .toString()
      .padStart(3, "0")
      .split("")
      .map((value) => +value);

    for (let i = 0; i < 3; i++) {
      if (valueToAdd[i]) {
        if (digitBlockedForChange[i]) {
          return false;
        } else {
          for (let j = 0; j <= i; j++) {
            digitBlockedForChange[j] = true;
          }
        }
      }
    }
    return true;
  }

  function isLinkWordOnSemanticPosition(temporaryTotal, index, numberOfWords) {
    return index !== 0 && (temporaryTotal === 0 || temporaryTotal % 100 === 0) && numberOfWords - 1  !== index;
  }

  function getNextMaxSeparator(currentMax) {
    return Math.max(
      ...separators.filter((separator) => separator !== currentMax)
    );
  }


  function handleChange(event) {
    setText(transformTextToNumber(event.target.value))
  }


  // console.log(9 / 100);

  // console.log(transformTextToNumber("fifty four"));
  // console.log(transformTextToNumber("two thousand and forty five"));
  // console.log(transformTextToNumber("three million one hundred thousand and ninety"));
  // console.log(transformTextToNumber("nine hundred ninety nine million nine hundred and ninety nine thousand nine hundred ninety nine"));
  // console.log(transformTextToNumber("twenty and nine"));
  // console.log(transformTextToNumber("one hundred ninety nine"));

  // console.log(transformTextToNumber("one hundred two twenty two"));

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <div>
        <p>Output: {text}</p>
      </div>
    </div>
  );
}

export default App;
