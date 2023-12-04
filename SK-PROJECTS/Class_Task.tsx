import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import CheckBox  from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import SQLite from 'react-native-sqlite-storage';

function App(){
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [isCR, setIsCR] = useState(false);
  const [matchedResults, setMatchedResults] = useState([]);

  useEffect(() => {
    const db = SQLite.openDatabase(
      { name: 'testDB', createFromLocation: '~mydb.db' },
      () => console.log('Database opened successfully'),
      error => console.error('Error opening database', error)
    );

    db.transaction(tx => {
      tx.executeSql(
        'SELECT DISTINCT course FROM students',
        [],
        (tx, results) => {
          const coursesArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            coursesArray.push(results.rows.item(i).course);
          }
          setCourses(coursesArray);
        },
        error => console.error('Error fetching courses', error)
      );
    });

    return () => {
      db.close(error => console.error('Error closing database', error));
    };
  }, []);

  const handleSelectButton = () => {
    const db = SQLite.openDatabase(
      { name: 'testDB', createFromLocation: '~mydb.db' },
      () => console.log('Database opened successfully'),
      error => console.error('Error opening database', error)
    );

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM students WHERE course = ? AND marks = ? AND isCR = ?',
        [selectedCourse, marks, isCR ? 1 : 0],
        (tx, results) => {
          const matchedResultsArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            matchedResultsArray.push(results.rows.item(i));
          }
          setMatchedResults(matchedResultsArray);
        },
        error => console.error('Error fetching matched results', error)
      );
    });
  };

  return (
    <View>
      <Text>Select Course:</Text>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}>
        {courses.map(course => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>

      <Text>Enter Course Marks:</Text>
      <TextInput
        value={marks}
        onChangeText={text => setMarks(text)}
        keyboardType="numeric"
      />

      <Text>IsCR:</Text>
      <CheckBox value={isCR} onValueChange={() => setIsCR(!isCR)} />

      <Button title="Select" onPress={handleSelectButton} />

      {matchedResults.length > 0 && (
        <View>
          <Text>Matched Results:</Text>
          {matchedResults.map(result => (
            <Text key={result.studentId}>{result.studentName}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default App;
