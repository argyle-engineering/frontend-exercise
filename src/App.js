import {useState} from "react";
import {transformNumber} from "./numberTransformer.js";

const getOutput = (value) => {
    try {
        return transformNumber(value);
    }
    catch (e) {
        return 'incorrect';
    }
}

function App() {
  const [value, setValue] = useState('');

  const output = getOutput(value);

  return (
    <div>
      <input
          type='text'
          value={value}
          onChange={
            (event) => setValue(event.target.value)
          }
      />
      <div>
        <p>
          Output: {output}
        </p>
      </div>
    </div>
  )
}

export default App
