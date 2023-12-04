import React, {useState, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';

function App() {
  let languages = [
    'DDL - (Table,DB)',
    'DML - (Insert,Select,',
    'Delete,Update)',
    'Construction->useEffect',
    'npm install react-native-sqlite-storage --save',
    'Java',
    'JavaScript',
    'C-Sharp',
    'Python',
    'PHP',
    'Node',
    'Angular',
    'Dart',
];

  const myStyle = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    txt1: {
      marginTop: 50,
      fontSize: 32,
      fontFamily: 'fantasy',
      alignSelf: 'center',
      color: 'yellow',
    },
    txt2: {
        marginTop: 10,
        fontSize: 32,
        fontFamily: 'fantasy',
        alignSelf: 'center',
        color: 'white',
      },
      name: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'fantasy',
      },
});

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <Text style={myStyle.txt1}>Top Languages 💛</Text>
        <Text style={myStyle.name}>
          By M.Jawad Gujjar ©
          {'\n'}{'\n'}
        </Text>
        {/* <FlatList
          data={languages}
          renderItem={({ item }) => (
            <View>
              <Text style={myStyle.txt2}> {item} </Text>
            </View>
          )}
        /> */}
        <ScrollView style={{ height: 650 }}>
          {languages.map((item, index) => (
            <View key={index}>
              <Text style={myStyle.txt2}> {item} </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default App;
