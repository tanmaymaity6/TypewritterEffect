import { useState, useRef } from "react";

const TypewriterEffect = () => {
  const [output, setOutput] = useState("");
  const intervalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const sentence = new FormData(e.target).get("sentence") || "";
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
    console.log(sentence);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input type="text" name="sentence" placeholder="Type a sentence" style={{ width: "300px" }} />
        <button type="submit">Display with typewriter effect</button>
      </form>

      <p>{output}</p>
    </div>
  );
};

export default TypewriterEffect;
