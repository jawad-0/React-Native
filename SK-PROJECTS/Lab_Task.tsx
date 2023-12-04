import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

async function createTable() {
  let db = await SQLite.openDatabase({ name: 'demo.db' });
  db.transaction(function (t) {
    t.executeSql(
      'CREATE TABLE IF NOT EXISTS user (id INTEGER, name TEXT)',
      [],
      () => {
        alert('Table created');
      },
      e => {
        alert(JSON.stringify(e));
        console.log(JSON.stringify(e));
      }
    );
  });
}

async function getAllData() {
  let db = await SQLite.openDatabase({ name: 'demo.db' });
  db.transaction(function (t) {
    t.executeSql(
      'SELECT * FROM user',
      [],
      (tx, resultSet) => {
        for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(i));
        }
        console.log(JSON.stringify(resultSet));
      },
    );
  });
}

createTable();

// const SQLite = require('react-native-sqlite-storage');

// async function createTable() {
//   try {
//     let db = await SQLite.openDatabase({ name: 'demo.db' });

//     db.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS user (id INTEGER, name TEXT)',
//         [],
//         () => {
//           console.log('Table created');
//         },
//         (error) => {
//           console.error('Error creating table', JSON.stringify(error));
//         }
//       );
//     });
//   } catch (error) {
//     console.error('Error opening database', error);
//   }
// }

// createTable();
