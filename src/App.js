import { useEffect, useState } from 'react'
import { numberFromWord } from './utils/numberFromWord'

function App() {
    const [value, setValue] = useState('one hundred twenty and one')
    const [result, setResult] = useState(0)

    useEffect(() => {
        setResult(numberFromWord(value))
    }, [value])

    return (
        <div>
            <input
                type="text"
                defaultValue={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
            />
            <div>
                <p>Output: {result}</p>
            </div>
        </div>
    )
}

export default App
