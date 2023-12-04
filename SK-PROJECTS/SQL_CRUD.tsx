import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Alert,
    TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'mydb.db', location: 'default' },
  () => console.log('Database opened'),
  (error) => console.error('Error opening database', error)
);

const App = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [data, setData] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [designationError, setDesignationError] = useState(false);

  const handleDeleteButton = (itemName) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM users WHERE name = ?',
          [itemName],
          (_, results) => {
            console.log('Record deleted successfully');
            fetchData();
          },
          (_, error) => {
            console.error('Error deleting record', error);
          }
        );
      },
      null,
      null
    );
  };

  const fetchData = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, results) => {
            console.log('Fetched Successfully');
            const rows = results.rows.raw();
            setData(rows);
          },
          (_, error) => {
            console.error('Error fetching data', error);
          }
        );
      },
      null,
      null
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButton = () => {

    if (!name || !department || !designation) {
        Alert.alert('Missing Information', 'Please fill in all fields before adding.');
        setNameError(!name);
        setDepartmentError(!department);
        setDesignationError(!designation);
        return;
      }
    db.transaction(
        (tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, department TEXT, designation TEXT)',
            [],
            () => {
              console.log('Table created successfully or already exists');
            },
            (_, error) => {
              console.error('Error creating table', error);
            }
          );
        },
        null,
        null
      );
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO users (name, department, designation) VALUES (?, ?, ?)',
          [name, department, designation],
          (_, results) => {
            console.log('Data added successfully');
            fetchData();
          },
          (_, error) => {
            console.error('Error adding data', error);
          }
        );
      },
      null,
      null
    );
    setName('');
    setDepartment('');
    setDesignation('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, nameError && styles.errorInput]}
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError(false);
        }}
      />

      <TextInput
        style={[styles.input, departmentError && styles.errorInput]}
        placeholder="Enter Department"
        value={department}
        onChangeText={(text) => {
          setDepartment(text);
          setDepartmentError(false);
        }}
      />

      <TextInput
        style={[styles.input, designationError && styles.errorInput]}
        placeholder="Enter Designation"
        value={designation}
        onChangeText={(text) => {
          setDesignation(text);
          setDesignationError(false);
        }}
      />

      <TouchableOpacity onPress={handleAddButton} style={styles.addbutton}>
      <Text style={styles.buttonText}>Add Record</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handleDeleteButton} style={styles.delbutton}>
      <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity> */}

      <Text></Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listdataText}>Name: {item.name}</Text>
            <Text style={styles.listdataText}>Department: {item.department}</Text>
            <Text style={styles.listdataText}>Designation: {item.designation}</Text>
            <TouchableOpacity onPress={()=>handleDeleteButton(item.name)} style={styles.delbutton}>
            <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
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
    padding: 16,
    backgroundColor:'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
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
  addbutton: {
    backgroundColor: 'green',
    padding: 8,
    width: 150,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  delbutton: {
    backgroundColor: 'red',
    width: 75,
    borderRadius: 7,
    marginVertical: 5,
    marginLeft: 250,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listdataText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily:'georgia',
    fontSize:18,
  },
});

export default App;
