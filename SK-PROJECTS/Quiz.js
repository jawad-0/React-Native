import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'productDB' });

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [isAdmin, setIsAdmin] = useState(false);

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'create table if not exists user(name text, age int, gender text, isAdmin text)',
        [],
        (txn, res) => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error on creating table ' + error.message);
        }
      );
    });
  };

  const add = () => {
    console.log('Add user called');
    console.log('Add user in progress');
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO user (name, age, gender, isAdmin) VALUES (?, ?, ?, ?)',
        [name, age, gender, isAdmin],
        (db, txn) => {
          console.log(`"${name}" user added successfully`);
        },
        error => {
          console.log('Error on adding user ' + error.message);
        }
      );
    });
  };
  const fetchProducts = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM user ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("user retrieved successfully");
          let len = res.rows.length;
          let results = [];
          if (len > 0) {

            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }

          }
          setProductsList(results);

        },
        error => {
          console.log("error on getting user " + error.message);
        },
      );
    });
  }


  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={newValue => setName(newValue)} />
      <Text>Age:</Text>
      <TextInput value={age} onChangeText={newValue => setAge(newValue)} />
      <Text>Gender:</Text>
      <RadioButton.Group value={gender} onValueChange={value => setGender(value)}>
        <RadioButton.Item label="Male" value="male" />
        <RadioButton.Item label="Female" value="female" />
      </RadioButton.Group>
      <Text>isAdmin:</Text>
      <CheckBox
        value={isAdmin}
        onValueChange={() => setIsAdmin(!isAdmin)}
      />
      <Button title="Save" onPress={add} />
    </View>
  );
}
