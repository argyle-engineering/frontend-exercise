import {
    words as wordDictionary,
    multipliers as multipliersDictionary,
    min,
    max,
} from '../constants/words'

export const numberFromWord = (string) => {
    string = string.toLowerCase().replace(/-|\s+and\s+/g, ' ')
    let words = string.split(/\s+/)
    let current = 0
    let result = 0
    let lastMultiplier = 1
    let lastWasNumber = false
    let lastNumber = 0

    for (let word of words) {
        if (wordDictionary.hasOwnProperty(word)) {
            // exception for wordDictionary[word] === 0
            let numberValue = wordDictionary[word]
            if (lastWasNumber) {
                if (
                    !(lastNumber >= 20 && lastNumber < 100 && numberValue < 10)
                ) {
                    return 'incorrect'
                }
            }
            current = current + numberValue
            lastWasNumber = true
            lastNumber = numberValue
        } else if (multipliersDictionary[word]) {
            if (current === 0 && result === 0) {
                return 'incorrect'
            }
            current = current * multipliersDictionary[word]
            if (multipliersDictionary[word] > lastMultiplier) {
                result = result + current
                current = 0
            }
            lastMultiplier = multipliersDictionary[word]
            lastWasNumber = false
        } else {
            return 'incorrect'
        }
    }

    result = result + current
    if (result < min || result > max) {
        return 'incorrect'
    }
    return result
}
