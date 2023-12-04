import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity  } from 'react-native';
import { RadioButton } from 'react-native-paper';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male');
  var user = "Jawad";
  var pass = "123";

  const clearFields = () => {
        setUsername('');
        setPassword('');
        setShowSuccess(false);
        setShowFail(false);
  }

  const handleLogin = () => {
    // console.log('Username:', username);
    // console.log('Password:', password);
    if(username == user && password == pass){
    setShowFail(false);
    setShowSuccess(true);
    } else{
    setShowSuccess(false);
    setShowFail(true);
    }
  };

  return (
    <View style={styles.container}>
        <View>
        <Text style={styles.head}>LOGIN 🤍{"\n"}{"\n"}</Text>
        </View>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />

    <Text style={styles.label}>Gender</Text>

    <View style={{flexDirection: 'row'}}>
     <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, selectedGender === 'Male' ? styles.radioButtonSelected : {}]}
          onPress={() => {if (!showSuccess) {
            setSelectedGender('Male');
          }
        }}>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
     </View>

     <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, selectedGender === 'Female' ? styles.radioButtonSelected : {}]}
          onPress={() => {if (!showSuccess) {
            setSelectedGender('Female');
          }
        }}>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
    <Text style={styles.loginText}>LOGIN</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
    <Text style={styles.clearText}>CLEAR</Text>
    </TouchableOpacity>

    {showSuccess && (
        <View>
        <Text style={styles.successText}>Login successful !</Text>
        <Text style={styles.genderText}>Gender > {selectedGender}</Text>
        </View>
      )}
      {showFail && (
        <Text style={styles.failureText}>Login unsuccessful !</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  clearButton: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  head: {
    fontSize: 35,
    fontFamily: 'fantasy',
    alignSelf: 'center',
    color: '#00ff95',
  },
  successText: {
    color: '#00ff95',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  failureText: {
    color: 'red',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  genderText: {
    color: 'yellow',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  radioButton: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  radioButtonSelected: {
    backgroundColor: 'grey',
  },
  radioText: {
    color: 'white',
  },
});

export default App;
