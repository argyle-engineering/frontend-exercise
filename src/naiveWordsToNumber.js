import {DIGIT, TEEN, TENS, PERIODS} from './constants'

function tens(tokens) {
  let ones = 0
  let tens = 0

  const l = tokens.length
  for (let i = 0; i < l; i++) {
    const token = tokens[i]

    if (TENS[token]) {
      if (tens > 0) {
        throw new Error(`Encountered a redundant "${token}" in "${tokens.join(' ')}"`)
      } else {
        tens = TENS[token]
      }
    }

    if (TEEN[token]) {
      if (tens > 0 || ones > 0) {
        throw new Error(`Encountered a redundant "${token}" in "${tokens.join(' ')}"`)

       } else {
        ones = TEEN[token]

      }
    }

    if (DIGIT[token]) {
      if (ones > 0) {
        throw new Error(`Encountered a redundant "${token}" in "${tokens.join(' ')}"`)

      } else {
        ones = DIGIT[token]
      }
    }
  }

  return tens + ones
}

function hundreds(tokens) {
  if (tokens.length === 1 && tokens[0] === 'hundred') {
    throw new Error(`No place value / dangling "hundred"`)
  }

  const l = tokens.length
  let delimiterIndex = 0
  for (let i = 0; i < l; i++) {
    const token = tokens[i].toLowerCase()
    if (token === 'hundred') {
      if (delimiterIndex > 0) {
        throw new Error(`Encountered a redundant "hundred" in "${tokens.join(' ')}"`)
      } else {
        delimiterIndex = i
      }
    }
  }

  return tens(tokens.slice(0, delimiterIndex)) * 100 + tens(tokens.slice(delimiterIndex))
}

function period(tokens, period = undefined) {
  if (tokens.indexOf(period) > -1) {
    throw new Error(`Encountered a redundant "${period}" in "${tokens.join(' ')}"`)
  }

  return hundreds(tokens) * (PERIODS[period] || 1)
}


export function naiveWordsToNumber(string) {
  const tokens = string.split(' ')

  let sum = 0
  const periodsProcessed = []
  let accumulatedTokens = []

  const l = tokens.length
  for (let i = 0; i < l; i++) {
    const token = tokens[i]
    if (PERIODS[token]) {
      if (periodsProcessed.some(p => p <= PERIODS[token])) {
        throw new Error(`Encountered a redundant "${token}" in "${tokens.slice(0, i+1).join(' ')}"`)
      }
      periodsProcessed.push(PERIODS[token])
      sum += period(accumulatedTokens, token)
      accumulatedTokens = []
    } else {
      accumulatedTokens.push(token)
    }
  }

  sum += period(accumulatedTokens)

  return sum
}