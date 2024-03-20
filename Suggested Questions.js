//SuggestedQuestions.js
import React from 'react';

const QuestionList = ({ suggestQuestions, onQuestionClick }) => {
  const handleClick = (question) => {
    // Call the onQuestionClick callback with the clicked question
    onQuestionClick(question);
  };

  return (
    <div>
      <h2>Suggested Questions</h2>
      <ul>
        {suggestQuestions.map((question, index) => (
          <li key={index} onClick={() => handleClick(question.text)}>
            {question.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;




import React, { useState } from 'react';
import QuestionList from './QuestionList';

const App = () => {
  const suggestQuestions = [
    {"id":1, "text":"What is your name?"},
    {"id":2, "text":"How are you?"},
    {"id":3, "text":"What do you do?"},
    {"id":4, "text":"Where are you from?"}
    // Add more questions as needed
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    // Handle the clicked question
    setSelectedQuestion(question);
  };

  return (
    <div className="App">
      <h1>Question List</h1>
      <QuestionList suggestQuestions={suggestQuestions} onQuestionClick={handleQuestionClick} />
      {selectedQuestion && <p>You clicked: {selectedQuestion}</p>}
    </div>
  );
};

export default App;

