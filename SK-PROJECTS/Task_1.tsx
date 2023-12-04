import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNPickerSelect from 'react-native-picker-select';
import Picker from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

const db = SQLite.openDatabase(
  { name: 'mydb.db', location: 'default' },
  () => console.log('Database opened'),
  (error) => console.error('Error opening database', error)
);

const App = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const designationData = ['Item 1', 'Item 2', 'Item 3'];
  const [data, setData] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [day, setDay] = useState('');
  const [startmonth, setstartMonth] = useState('');
  const [startyear, setstartYear] = useState('');
  const [startday, setstartDay] = useState('');
  const [salary, setSalary] = useState('');
  const [gender, setGender] = useState('male');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const handleCheckboxToggle1 = () => {
    setChecked1(!checked1);
  };

  const handleCheckboxToggle2 = () => {
    setChecked2(!checked2);
  };

  const handleCheckboxToggle3 = () => {
    setChecked3(!checked3);
  };

  const [checkedSkills, setCheckedSkills] = useState({
    csharp: false,
    java: false,
    js: false,
  });

  const handleRadioButtonPress = (selectedGender) => {
    setGender(selectedGender);
  };

//   const handleDeleteButton = () => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           'DELETE FROM users',
//           [],
//           (_, results) => {
//             console.log('Table Data deleted successfully');
//             fetchData();
//           },
//           (_, error) => {
//             console.error('Error deleting table data', error);
//           }
//         );
//       },
//       null,
//       null
//     );
//   };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveButton = () => {
    if (!name || !department || !designation) {
      Alert.alert('Missing Information', 'Please fill in all fields before adding.');
      return;
    }

    db.transaction(
      (tx) => {
        // Create USER table if not exists
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, department TEXT, designation TEXT, gender TEXT, startday INTEGER, startmonth INTEGER, startyear INTEGER, day INTEGER, month INTEGER, year INTEGER, salary TEXT, csharp INTEGER, java INTEGER, js INTEGER)',
          [],
          () => {
            console.log('USER Table created successfully or already exists');
          },
          (_, error) => {
            console.error('Error creating USER table', error);
          }
        );

        // Insert data into USER table
        tx.executeSql(
          'INSERT INTO USER (name, department, designation, gender, startday, startmonth, startyear, day, month, year, salary, csharp, java, js) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            name,
            department,
            designation,
            gender,
            parseInt(startday),
            parseInt(startmonth),
            parseInt(startyear),
            parseInt(day),
            parseInt(month),
            parseInt(year),
            salary,
            checkedSkills.csharp ? 1 : 0,
            checkedSkills.java ? 1 : 0,
            checkedSkills.js ? 1 : 0,
          ],
          (_, results) => {
            console.log('Data added to USER table successfully');
            fetchData();
          },
          (_, error) => {
            console.error('Error adding data to USER table', error);
          }
        );
      },
      null,
      null
    );

    // Clear input fields
    setName('');
    setDepartment('');
    setDesignation('');
    setGender('male');
    setstartDay('');
    setstartMonth('');
    setstartYear('');
    setDay('');
    setMonth('');
    setYear('');
    setSalary('');
    setCheckedSkills({
      csharp: false,
      java: false,
      js: false,
    });
  };

  const fetchData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM USER',
          [],
          (_, results) => {
            console.log('Fetched data from USER table successfully');
            const rows = results.rows.raw();
            setData(rows);
          },
          (_, error) => {
            console.error('Error fetching data from USER table', error);
          }
        );
      },
      null,
      null
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.startdate}>Start Date : </Text>
        <TextInput
          style={[styles.input]}
          placeholder='Day'
          value={startday}
          keyboardType='numeric'
          onChangeText={(text) => {
            setstartDay(text);
          }}
        />
        <TextInput
          style={[styles.input]}
          placeholder='Month'
          value={startmonth}
          keyboardType='numeric'
          onChangeText={(text) => {
            setstartMonth(text);
          }}
        />
        <TextInput
          style={[styles.input]}
          placeholder='Year'
          value={startyear}
          keyboardType='numeric'
          onChangeText={(text) => {
            setstartYear(text);
          }}
        />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.startdate}>End Date : </Text>
        <TextInput
          style={[styles.input]}
          placeholder='Day'
          value={day}
          keyboardType='numeric'
          onChangeText={(text) => {
            setDay(text);
          }}
        />
        <TextInput
          style={[styles.input]}
          placeholder='Month'
          value={month}
          keyboardType='numeric'
          onChangeText={(text) => {
            setMonth(text);
          }}
        />
        <TextInput
          style={[styles.input]}
          placeholder='Year'
          value={year}
          keyboardType='numeric'
          onChangeText={(text) => {
            setYear(text);
          }}
        />
      </View>

      <View>
        <Text style={styles.text}>Designation</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Salary</Text>
        <TextInput
          style={[styles.inputsalary]}
          value={salary}
          keyboardType='numeric'
          onChangeText={(text) => {
            setSalary(text);
          }}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>Gender</Text>
        <TouchableOpacity
          style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
          onPress={() => handleRadioButtonPress('male')}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
          onPress={() => handleRadioButtonPress('female')}>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Skills</Text>
      <View style={styles.cb_container}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle1}>
          <View style={[styles.checkbox, checked1 && styles.checkedCheckbox]} />
          <Text style={styles.checkboxLabel}>C#</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle2}>
          <View style={[styles.checkbox, checked2 && styles.checkedCheckbox]} />
          <Text style={styles.checkboxLabel}>JAVA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle3}>
          <View style={[styles.checkbox, checked3 && styles.checkedCheckbox]} />
          <Text style={styles.checkboxLabel}>JS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSaveButton} style={styles.savebutton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Text></Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listdataText}>Name: {item.name}</Text>
            <Text style={styles.listdataText}>Department: {item.department}</Text>
            <Text style={styles.listdataText}>Designation: {item.designation}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  cb_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  dateContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 70,
    borderRadius: 15,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  inputsalary: {
    textAlign: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    borderRadius: 15,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
  listItem: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'cyan',
  },
  savebutton: {
    backgroundColor: '#11ba1c',
    padding: 8,
    width: 150,
    borderRadius: 25,
    marginTop: 30,
    marginVertical: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startdate: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    fontSize: 18,
    marginTop: 7,
  },
  listdataText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'georgia',
    fontSize: 18,
  },
  picker: {
    width: 200,
    height: 40,
    color: 'white',
    backgroundColor: 'blue',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioText: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    marginVertical: 5,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedRadioButton: {
    backgroundColor: '#11ba1c',
    borderColor: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    marginLeft: 12,
  },
  checkedCheckbox: {
    backgroundColor: 'blue',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default App;
