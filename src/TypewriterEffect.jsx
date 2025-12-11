import { useState, useRef } from "react";

const TypewriterEffect = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const intervalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const sentence = input; // <-- FIXED: remove FormData
    setOutput("");

    intervalRef.current = setInterval(() => {
      setOutput((prev) => {
        if (prev.length === sentence.length) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + sentence[prev.length];
      });
    }, 500);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="sentence"
          placeholder="Type a sentence"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>

      <p data-testid="output">{output}</p>
    </div>
  );
};

export default TypewriterEffect;
