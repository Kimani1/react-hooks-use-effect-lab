import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // This effect runs when the component renders
    const timer = setTimeout(() => {
      // This code decrements the timer by 1 every second
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        setTimeRemaining(10);
        // Call onAnswered after 10 seconds
        onAnswered(false);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset the timer when the user answers
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
