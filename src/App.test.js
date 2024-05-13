import {render, screen, fireEvent} from '@testing-library/react'
import App from "./App";

function numberInput(scope) {
  const input = scope.getByLabelText('number-input')
  return {
    type: (value) => {
      fireEvent.change(input, {target: {value}})
    }
  }
}

function strictModeCheckbox(scope) {
  const checkbox = screen.getByLabelText('strict-mode')
  const toggle = (checked) => {
    const value = checkbox.checked
    if ((!value && checked) || (value && !checked)) {
      fireEvent(checkbox, new MouseEvent('click', {
        bubbles: true, cancelable: true,
      }))
    }
  }
  return {
    check: () => toggle(true),
    uncheck: () => toggle(false)
  }
}

function resultOutput(scope) {
  const result = scope.getByLabelText('result')
  return {
    value: () => result.innerHTML,
    numberValue: () => {
      const match = /Output: (\d+)/.exec(result.innerHTML)
      return (match || [])[1]
    }
  }
}

describe('App', () => {
  beforeEach(() => {
    render(<App/>)
  })

  it('should convert "three" to number 3', () => {
    numberInput(screen).type('three')
    expect(resultOutput(screen).numberValue()).toBe('3')
  })

  it('should convert "fifty four" to number 54', () => {
    numberInput(screen).type('fifty four')
    expect(resultOutput(screen).numberValue()).toBe('54')
  })

  it('should convert "three hundred sixty seven" to number 367', () => {
    numberInput(screen).type('three hundred sixty seven')
    expect(resultOutput(screen).numberValue()).toBe('367')
  })

  it('should convert "sixty seven thousand nine hundred twelve" to number 67912', () => {
    numberInput(screen).type('sixty seven thousand nine hundred twelve')
    expect(resultOutput(screen).numberValue()).toBe('67912')
  })

  it('should convert "three million one hundred thousand and ninety" to number 3100090', () => {
    numberInput(screen).type('three million one hundred thousand and ninety')
    expect(resultOutput(screen).numberValue()).toBe('3100090')
  })

  it('should convert "nine hundred ninety nine million nine hundred nineteen thousand and nine hundred ninety nine" to 999919999', () => {
    numberInput(screen).type('nine hundred ninety nine million nine hundred nineteen thousand and nine hundred ninety nine')
    expect(resultOutput(screen).numberValue()).toBe('999919999')
  })

  it('should error on "nine thousand five thousand"', () => {
    numberInput(screen).type('nine thousand five thousand')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "twenty five hundred six hundred"', () => {
    numberInput(screen).type('twenty five hundred six hundred')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "five thousand two million"', () => {
    numberInput(screen).type('five thousand two million')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "one one"', () => {
    numberInput(screen).type('one one')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "eleven one"', () => {
    numberInput(screen).type('eleven one')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "asdasd" on strict mode', () => {
    numberInput(screen).type('asdasd')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should pass on "asdasd" not in strict mode', () => {
    strictModeCheckbox(screen).uncheck()
    numberInput(screen).type('twenty asdasd two')
    expect(resultOutput(screen).numberValue()).toBe('22')
  })

  it('should error on "hundred million"', () => {
    numberInput(screen).type('hundred million')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should error on "million hundred"', () => {
    numberInput(screen).type('million hundred')
    expect(resultOutput(screen).value()).toBe('Output: incorrect')
  })

  it('should convert "one million" to number 1000000', () => {
    numberInput(screen).type('one million')
    expect(resultOutput(screen).numberValue()).toBe('1000000')
  })
})
