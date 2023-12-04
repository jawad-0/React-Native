import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,

} from 'react-native';

const App = () => {

  const [name, SetName] = useState('');
  const [submitted, SetSubmitted] = useState(false);

  const onPressHandler = () => {
    if(submitted){
        SetName('');
    }
    SetSubmitted(!submitted);
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>
        Please write your name:
      </Text>
      <TextInput
        style={styles.input}
        placeholder= 'e.g. Ali'
        onChangeText={(value) => SetName(value)}
      />
      {<Button
        title={submitted ? 'Clear' : 'Submit'}
        onPress={onPressHandler}
        color='#00f'
      /> }

      <Text style={styles.text}>{"\n"}{name}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
  },
});

export default App;
