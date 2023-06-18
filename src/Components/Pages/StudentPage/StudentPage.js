import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StudentPage.module.css'

const QuestionsPage = () => {
  const { numberOfQuestions } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Parse the questions from local storage
    const storedQuestions = JSON.parse(localStorage.getItem('questions'));

    // Shuffle the array of questions
    const shuffledQuestions = shuffleArray(storedQuestions);

    // Select the specified number of questions
    const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

    setQuestions(selectedQuestions);
    setAnswers(new Array(selectedQuestions.length).fill(''));
    setSubmitted(false);
  }, [numberOfQuestions]);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleAnswerChange = (index, e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const handleRestart = () => {
    setAnswers(new Array(questions.length).fill(''));
    setSubmitted(false);
  };

  return (
    <div>
      <h1>Questions</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
        {questions.map((question, index) => (
          <div key={index} className={styles.questions}>
            <h3>Question {index + 1}</h3>
            <p>{question.question}</p>
            {question.attachments.map((attachment, attachmentIndex) => (
              <img key={attachmentIndex} src={attachment} alt="Attachment" />
            ))}
            <ul className={styles.optionsContainer}>
              <div className={styles.options}>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} style={{listStyle:"none"}}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleAnswerChange(index, e)}
                      disabled={submitted}
                    />
                    {option}
                  </label>
                </li>
              ))}
              </div>
            </ul>
          </div>
        ))}
        {!submitted && (
          <button type="submit">Submit Answers</button>
        )}
        </div>
      </form>
      {submitted && (
        <div className={styles.result}>
          <h2>Results</h2>
          <div className={styles.card}>
          <p>Score: {calculateScore()} / {questions.length}</p>
          <ul style={{listStyle:"none"}}>
            {questions.map((question, index) => (
              <li key={index}>
                Question {index + 1}: {answers[index] === question.correctAnswer ? 'Correct' : 'Incorrect'}
              </li>
            ))}
          </ul>
          </div>
          <button onClick={handleRestart}>Start Again</button>
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
