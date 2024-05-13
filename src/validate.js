import {DIGIT, PERIODS, TEEN, TENS} from "./constants";

export function validateInput(words) {
  const validTokens = {
    ...DIGIT,
    ...TEEN,
    ...TENS,
    ...PERIODS,
    'hundred': 100,
    'and': 9999
  }
  const tokens = words.split(' ')
  const l = tokens.length
  for (let i = 0; i < l; i++) {
    const token = tokens[i]
    if (!validTokens[token]) {
      throw new Error(`Encountered an invalid word "${token}"`)
    }
  }

  return 42 // why not?
}