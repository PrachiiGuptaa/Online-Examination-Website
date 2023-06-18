import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import InputField from './../../Atoms/InputField/InputField';
import Button from './../../Atoms/Button/Button';

const AdminPage = () => {
  const [questions, setQuestions] = useState([
    {
      question:"What is the correct command to create a new React project?",
      options:['npm create-react-app', 'npx create-react-app', 'npm create-react-app myReactApp', 'npx create-react-app myReactApp'],
      correctAnswer:"npx create-react-app myReactApp",
      attachments:[]
    },
    {
      question:"A copy of the 'real' DOM that is kept in memory is called what?",
      options:['React DOM', 'DOM', 'Virtual DOM', 'Shadow DOM'],
      correctAnswer:"Virtual DOM",
      attachments:[]
    },
    {
      question:"Identify the Logo?",
      options:['JavaScript', 'React JS', 'Node JS', 'None of the Above'],
      correctAnswer:"React JS",
      attachments:["https://w7.pngwing.com/pngs/235/872/png-transparent-react-computer-icons-redux-javascript-others-logo-symmetry-nodejs-thumbnail.png"]
    },
    {
      question:"When rendering a list using the JavaScript map() method, what is required for each element rendered?",
      options:['data', 'index', 'id', 'Key'],
      correctAnswer:"Key",
      attachments:[]
    },
    {
      question:"What is a common use case for ref?",
      options:['To directly access the DOM node', 'To refer to another JS file', 'To bind the function', 'To call a function'],
      correctAnswer:"To directly access the DOM node",
      attachments:[]
    },
    {
      question:"Which operator can be used to conditionally render a React component?",
      options:['&&', '||', '::', '??'],
      correctAnswer:"&&",
      attachments:[]
    },
    {
      question: "React is mainly used for building ___?",
      options: ["Database", "Connectivity", "User Interface", "Design Platform"],
      correctAnswer: "User Interface",
      attachments: []      
    },
    {
      question: "What is used to pass data to a component from outside?",
      options: ["setState", "render with arguments", "PropTypes", "props"],
      correctAnswer: "props",
      attachments: []
    },
    {
      question: " What is the name of React.js Developer?",
      options: ["Tim Lee", "Jordan Lee", "Jordan Mike", "Jordan Walke"],
      correctAnswer: "Jordan Walke",
      attachments: []
    },
    {
      question:"What is Babel?",
      options:["A transpiler", "An interpreter", "A Compiler", "Both Compiler and Transpiler"],
      correctAnswer:"Both Compiler and Transpiler",
      attachments:[]
    },
    {
      question:"Keys are given to a list of elements in react. These keys should be.... ?",
      options:['Unique in the DOM', 'Unique among the siblings only', 'Do not requires to be unique', 'None of the Above'],
      correctAnswer:"Unique among the siblings only",
      attachments:[]
    },
    {
      question:"What do you call a React component that catches JavaScript errors anywhere in the child component tree?",
      options:['Error bosses', 'Error catchers', 'Error helpers', 'Error boundaries'],
      correctAnswer:"Error boundaries",
      attachments:[]
    },
  ]);

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      // Save the initial questions array in local storage
      localStorage.setItem('questions', JSON.stringify(questions));
    }
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setAttachments([...attachments, ...fileArray]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (!question || !options.every((option) => option !== '') || !correctAnswer) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    // Create a new question object
    const newQuestion = {
      id: editMode ? questions[editIndex].id : questions.length + 1,
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      attachments: attachments.map((attachment) => URL.createObjectURL(attachment)),
    };
  
    if (editMode) {
      // If in edit mode, update the question at the specified index
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditMode(false);
      setEditIndex(null);
    } else {
      // If not in edit mode, add the new question to the questions array
      setQuestions([...questions, newQuestion]);
    }
  
    // Update local storage
  const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
  if (editMode) {
    // If in edit mode, update the question in the storedQuestions array
    storedQuestions[editIndex] = newQuestion;
  } else {
    // If not in edit mode, add the new question to the storedQuestions array
    storedQuestions.push(newQuestion);
  }
  localStorage.setItem('questions', JSON.stringify(storedQuestions));
  
    // Reset the input values
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setAttachments([]);
  };
  

  const handleEdit = (index) => {
    const selectedQuestion = questions[index];
    setQuestion(selectedQuestion.question);
    setOptions(selectedQuestion.options);
    setCorrectAnswer(selectedQuestion.correctAnswer);
    setAttachments(selectedQuestion.attachments);
    setEditMode(true);
    setEditIndex(index);
  };

 const handleDelete = (index) => {
  const updatedQuestions = [...questions];
  updatedQuestions.splice(index, 1);
  setQuestions(updatedQuestions);

  // Update local storage
  localStorage.setItem('questions', JSON.stringify(updatedQuestions));
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.uploadQuestions}>
          <h2>Upload Questions</h2>
        <label>Question:</label>
        <InputField
          placeholder="Question"
          type="text"
          value={question}
          onChange={handleQuestionChange}
        />

        <label>Options:</label>
        {options.map((option, index) => (
          <InputField
            placeholder="Options"
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
          />
        ))}

        <label>Correct Answer:</label>
        <InputField
          placeholder="Correct Answer"
          type="text"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
        />

        <label>Attachments:</label>
        <InputField type="file" multiple onChange={handleAttachmentChange}/>
        <br />
        <Button
          type="submit"
          buttonText={editMode ? 'Update Question' : 'Upload Question'}
        />
        </div>
      </form>

      <div className={styles.questions}>
        {questions.map((question, index) => (
          <div key={index} className={styles.uploadedQuestions}>
            <h3>Question {index + 1}</h3>
            <p>{question.question}</p>
             {/* Display attachments */}
             {question.attachments.map((attachment, attachmentIndex) => (
              <img
                key={attachmentIndex}
                src={attachment}
                alt="Attachment"
              />
            ))}
            <ul>
              {question.options.map((option, optionIndex) => (
                <li type="A" key={optionIndex}>
                  {option}
                </li>
              ))}
            </ul>
            <p>Correct Answer: {question.correctAnswer}</p>
            
            <Button onClick={() => handleEdit(index)} buttonText="Edit" />
            <Button onClick={() => handleDelete(index)} buttonText="Delete" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;

