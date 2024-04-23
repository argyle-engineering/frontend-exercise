import { useState } from "react";
import { useWordsToNumberConverter } from "./hooks/useWordsToNumberConverter";

function App() {
  const [text, setText] = useState("");
  const convertedNumber = useWordsToNumberConverter(text);

  return (
    <div>
      <input
        type="text"
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <p>
          Output: {convertedNumber === null ? "incorrect" : convertedNumber}
        </p>
      </div>
    </div>
  );
}

export default App;
