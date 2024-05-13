import React from 'react'
import {naiveWordsToNumber} from "./naiveWordsToNumber";
import {validateInput} from "./validate";

function App() {
  const [words, setWords] = React.useState('')
  const [strictMode, setStrictMode] = React.useState(true)
  const result = React.useMemo(() => {
    const trimmed = words.trim()
    if (trimmed === '') {
      return {output: 0}
    }
    try {
      if (strictMode) {
        validateInput(trimmed)
      }
      const number = naiveWordsToNumber(trimmed)
      return {
        output: number.toString(), error: ''
      }
    } catch (e) {
      return {
        output: 'incorrect', error: e.message
      }
    }
  }, [words, strictMode])

  return (<div>
      <input aria-label="number-input" type='text' value={words}
             onChange={event => setWords(event.currentTarget.value)}/>
      <div>
        {result.error && (<p aria-label="error-message" style={{
          color: 'red',
        }}>{result.error}</p>)}
        <p aria-label="result">
          Output: {result.output}
        </p>
        <input id="strict" aria-label="strict-mode" type="checkbox" checked={strictMode} onChange={event => {
          setStrictMode(event.target.checked)
        }} />
        <label htmlFor="strict">Strict mode</label>
      </div>
    </div>)
}

export default App
