import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Radio } from 'react-native';

const questions = [
  {
    question: 'Which programming language emphasizes readability and ease of use?',
    options: ['C++', 'Python', 'Java'],
    correctAnswer: 'Python',
  },
  {
    question: 'In OOP, what is a blueprint for creating objects?',
    options: ['Class', 'Object', 'Method'],
    correctAnswer: 'Class',
  },
  {
    question: 'What does HTML stand for?',
    options: ['Hypertext Markup', 'High-Level Text', 'Hyperlink and Text'],
    correctAnswer: 'Hypertext Markup',
  },
  {
    question: 'Common language for mobile app development?',
    options: ['Ruby', 'Swift', 'Rust'],
    correctAnswer: 'Swift',
  },
  {
    question: 'Purpose of "else" in conditional statements?',
    options: ['Start a loop', 'Define a function', 'Specify an alternative action'],
    correctAnswer: 'Specify an alternative action',
  },
  {
    question: 'Print output to console in JavaScript?',
    options: ['console.log()', 'print()', 'display()'],
    correctAnswer: 'console.log()',
  },
  {
    question: 'C programming paradigm?',
    options: ['Procedural', 'Object-Oriented', 'Functional'],
    correctAnswer: 'Procedural',
  },
  {
    question: 'Dynamically-typed language?',
    options: ['Java', 'C#', 'JavaScript'],
    correctAnswer: 'JavaScript',
  },
  {
    question: 'SQL purpose in databases?',
    options: ['Structured Query Language', 'Simple Question Language', 'Scripted Query Logic'],
    correctAnswer: 'Structured Query Language',
  },
  {
    question: 'Purpose of "elif" in Python conditionals?',
    options: ['Define a variable', 'Specify an alternative action', 'End a loop'],
    correctAnswer: 'Specify an alternative action',
  }
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState(0);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSkippedQuestions(0);
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = questions[currentQuestion].options[selectedOption] === questions[currentQuestion].correctAnswer;

    setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect }]);
    nextQuestion();
  };

  const handleSkip = () => {
    setSkippedQuestions(skippedQuestions + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(null);
    }
  };

  const displayResult = () => {

    const totalQuestions = questions.length;
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    const wrongAnswers = totalQuestions - correctAnswers - skippedQuestions;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.result}>Quiz Result : </Text>
        <Text style={styles.resultText}>Total Questions: {totalQuestions}</Text>
        <Text style={styles.resultText}>Correct Answers: {correctAnswers}</Text>
        <Text style={styles.resultText}>Wrong Answers: {wrongAnswers}</Text>
        <Text style={styles.resultText}>Skipped Questions: {skippedQuestions}</Text>
        <TouchableOpacity style={styles.returnButton} onPress={resetQuiz}>
          <Text style={styles.returnButtonText}>Return to Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentQuestion !== null ? (
        <>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(index)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text>{"\n"}</Text>
          <Button title="Skip" onPress={handleSkip} />
        </>
      ) : (
        displayResult()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black'
  },
  optionButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    width: 150,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center'
  },
  resultContainer: {
    alignItems: 'center',
  },
  result: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  returnButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  returnButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
