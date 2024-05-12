import { numbersMap, separators } from "./constants/numbers-map";
import { useState } from 'react';

const INCORRECT_TEXT = "incorrect";
const LINK_WORD = "and";
const ZERO_CASE_WORD = "zero";

function App() {
  const [text, setText] = useState('');

  function transformTextToNumber(inputWord) {
    // Do not display anything if input has only spaces or it's empty
    if(!inputWord.trim()){
      return "";
    }
    // Condition for zero case
    if (inputWord.toLowerCase().trim() === ZERO_CASE_WORD) {
      return 0;
    }

    // will lowercase, trim and remove excessive whitespace characters to enhance user experience
    const numberWords = inputWord.toLowerCase().trim().split(" ").filter(word => word !== "");

    // Condition for first number
    // it should be a number lower then 100
    if (numbersMap[numberWords[0]] > 99) {
      return INCORRECT_TEXT;
    }

    // Array to keep track of the digits that are available to be modified in the block total
    // It has the following representation
    // [0] -> hundreds
    // [1] -> tens
    // [2] -> units
    let digitBlockedForChange = [false, false, false];
    let total = 0;
    let blockTotal = 0;
    let nextMaxSeparator = Math.max(...separators);

    // Will iterate one by one 
    for (let index = 0; index < numberWords.length; index++) {
      // Will not enforce "AND" word in order to enhance user experience as some users  
      // usually type numbers without it but we will not accept "AND" word in a non semantic position
      if (numberWords[index] === LINK_WORD) {
        if (isLinkWordInCorrectPosition(index, numberWords)) {
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

      // If it's a separator lower then maximum allowed we will do the following:
      // - add block total to the total
      // - calculate next maximum separator
      // - refresh block array of blocked digits
      if (separators.includes(value)) {
        if (value <= nextMaxSeparator) {
          total = total + blockTotal * value;
          blockTotal = 0;
          nextMaxSeparator = getNextMaxSeparator(value);
          digitBlockedForChange = [false, false, false];
        } else {
          return INCORRECT_TEXT;
        }
      } else {
        if (value > 99) {
          blockTotal = blockTotal * value;

          // Actually last numbers were linked to hundred digits, so we need to unblock them and block only the hundreds digit
          digitBlockedForChange = [true, false, false];

          // Condition for too big temporary total or too small for 2 cases:
          // - hundreds encountered after tens 
          // - hundreds encountered without any number before in the block
          if (blockTotal > 999 || blockTotal === 0) {
            return INCORRECT_TEXT;
          }
        } else {
          // Check if the encountered number can be added
          // - basically checks if the order of numbers is correct
          if (isNumbersOrderCorrect(value, digitBlockedForChange)) {
            blockTotal += value;
          } else {
            return INCORRECT_TEXT;
          }
        }
      }
    }

    return total + blockTotal;
  }

  function isNumbersOrderCorrect(value, digitBlockedForChange) {
    const digits = value
      .toString()
      .padStart(3, "0")
      .split("")
      .map((value) => +value);

    for (let i = 0; i < 3; i++) {
      if (digits[i]) {
        //if the digit is blocked (already changed) will return false because the order of words is wrong
        if (digitBlockedForChange[i]) {
          return false;
        } else {
          //if the digit is not blocked (already changed) will block all digits from previous positions, including this one
          // in order to prevent future adding in this block
          for (let j = 0; j <= i; j++) {
            digitBlockedForChange[j] = true;
          }
        }
      }
    }
    return true;
  }

  function isLinkWordInCorrectPosition(index, words) {
    return numbersMap[words[index-1]] > 99 && numbersMap[words[index+1]] <= 99
  }

  function getNextMaxSeparator(currentMax) {
    return Math.max(
      ...separators.filter((separator) => separator < currentMax)
    );
  }


  function handleChange(event) {
    setText(transformTextToNumber(event.target.value))
  }

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
