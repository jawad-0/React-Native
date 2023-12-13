import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

const db = SQLite.openDatabase(
  { name: 'mydb.db', location: 'default' },
  () => console.log('Database opened'),
  (error) => console.error('Error opening database', error)
);

const App = () => {
  const [designation, setDesignation] = useState('');
  const designationData = ['HR Manager','Employee','CEO','CIO','HOD'];
  const [data, setData] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const years = Array.from({ length: 10 }, (_, i) => `${2023 + i}`);

  const [endday, setendDay] = useState('');
  const [endmonth, setendMonth] = useState('');
  const [endyear, setendYear] = useState('');
  const enddays = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const endmonths = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const endyears = Array.from({ length: 10 }, (_, i) => `${2023 + i}`);

  const [checkedSkills, setCheckedSkills] = useState({
    csharp: false,
    java: false,
    js: false,
  });

  const [salary, setSalary] = useState('');
  const [gender, setGender] = useState('male');

const handleCheckboxToggle1 = () => {
    setCheckedSkills((prevSkills) => ({
      ...prevSkills,
      csharp: !prevSkills.csharp,
    }));
  };

  const handleCheckboxToggle2 = () => {
    setCheckedSkills((prevSkills) => ({
      ...prevSkills,
      java: !prevSkills.java,
    }));
  };

  const handleCheckboxToggle3 = () => {
    setCheckedSkills((prevSkills) => ({
      ...prevSkills,
      js: !prevSkills.js,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveButton = () => {
    if (!designation || !salary) {
      Alert.alert('Missing Information', 'Please fill in all fields before adding.');
      return;
    }

    db.transaction(
      (tx) => {
        // Create USER table if not exists
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, designation TEXT, gender TEXT, day INTEGER, month INTEGER, year INTEGER, endday INTEGER, endmonth INTEGER, endyear INTEGER, salary TEXT, csharp INTEGER, java INTEGER, js INTEGER)',
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
          'INSERT INTO USER (designation, gender, day, month, year, endday, endmonth, endyear, salary, csharp, java, js) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            designation,
            gender,
            parseInt(day),
            parseInt(month),
            parseInt(year),
            parseInt(endday),
            parseInt(endmonth),
            parseInt(endyear),
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
    setDesignation('');
    setGender('male');
    setDay('');
    setMonth('');
    setYear('');
    setendDay('');
    setendMonth('');
    setendYear('');
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
      <ScrollView>
      <Text style={styles.startdate}>Start Date : </Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.datepicker}
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          <Picker.Item label="day" value="" />
          {days.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Picker
          style={styles.datepicker}
          selectedValue={month}
          onValueChange={(itemValue) => setMonth(itemValue)}
        >
          <Picker.Item label="month" value="" />
          {months.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Picker
          style={styles.datepicker}
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          <Picker.Item label="year" value="" />
          {years.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>
      <Text style={styles.startdate}>End Date : </Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.datepicker}
          selectedValue={endday}
          onValueChange={(itemValue) => setendDay(itemValue)}
        >
          <Picker.Item label="day" value="" />
          {enddays.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Picker
          style={styles.datepicker}
          selectedValue={endmonth}
          onValueChange={(itemValue) => setendMonth(itemValue)}
        >
          <Picker.Item label="month" value="" />
          {endmonths.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Picker
          style={styles.datepicker}
          selectedValue={endyear}
          onValueChange={(itemValue) => setendYear(itemValue)}
        >
          <Picker.Item label="year" value="" />
          {endyears.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <View>
        <Text style={styles.text}>Designation :</Text>
        <View style={styles.des_dropdownContainer}>
        <RNPickerSelect
            placeholder={{ label: 'Designation', value: null }}
            onValueChange={(value) => setDesignation(value)}
            items={designationData.map((item) => ({ label: item, value: item }))}
        />
        </View>
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
          onPress={() => setGender('male')}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
          onPress={() => setGender('female')}>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Skills</Text>
      <View style={styles.cb_container}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle1}>
        <View style={[styles.checkbox, checkedSkills.csharp && styles.checkedCheckbox]} />
        <Text style={styles.checkboxLabel}>C#</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle2}>
        <View style={[styles.checkbox, checkedSkills.java && styles.checkedCheckbox]} />
        <Text style={styles.checkboxLabel}>JAVA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle3}>
        <View style={[styles.checkbox, checkedSkills.js && styles.checkedCheckbox]} />
        <Text style={styles.checkboxLabel}>JS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSaveButton} style={styles.savebutton}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>

      <Text></Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listdataText}>Designation: {item.designation}</Text>
            <Text style={styles.listdataText}>Salary: {item.salary}</Text>
            <Text style={styles.listdataText}>Gender: {item.gender}</Text>
            <Text style={styles.listdataText}>CSharp : {item.csharp} -- Java : {item.java} -- JS : {item.js}</Text>
            <Text style={styles.listdataText}>Start Date: {item.day},{item.month},{item.year}</Text>
            <Text style={styles.listdataText}>Start Date: {item.endday},{item.endmonth},{item.endyear}</Text>
          </View>
        )}
      />

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    picker: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#02a2ab',
        // backgroundColor: 'darkcyan',
    },
    cb_container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
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
        borderColor: 'black',
        borderWidth: 2,
        width: 220,
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
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: 'cyan',
        width: 300,
    },
    savebutton: {
        backgroundColor: '#11ba1c',
        padding: 8,
        width: 150,
        borderRadius: 20,
        marginTop: 30,
        marginVertical: 5,
        alignSelf: 'center',
        borderWidth: 2,
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
        textAlign: 'left',
        fontSize: 18,
        marginTop: 7,
        marginLeft: 10,
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
    dropdownContainer2: {
        width: 130,
    },
    datepicker: {
        flex: 1,
        height: 40,
      },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15,
      },
    des_dropdownContainer: {
        marginRight: 10,
        width: 250,
        marginLeft: 100,
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
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    selectedRadioButton: {
        backgroundColor: 'blue',
        // backgroundColor: '#11ba1c',
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
