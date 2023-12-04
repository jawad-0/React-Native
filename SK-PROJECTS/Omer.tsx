import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male'); // Default gender selection
  const [role, setRole] = useState('user'); // Default role selection

  const a = 'your_username'; // Replace with the actual username
  const b = 'your_password'; // Replace with the actual password

  const handleLogin = () => {
    if (username === a && password === b) {
      // Username and password match
      console.log('Login successful');
      Alert.alert(
        'Success',
        `Login successful\nUsername: ${username}\nPassword: ${password}\nGender: ${gender}\nRole: ${role}`,
      );
    } else {
      // Username and password do not match
      console.log('Login failed');
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Select Gender:</Text>
        <RadioButton.Group
          onValueChange={value => setGender(value)}
          value={gender}>
          <View style={styles.radioButton}>
            <Text>Male</Text>
            <RadioButton value="male" />
          </View>
          <View style={styles.radioButton}>
            <Text>Female</Text>
            <RadioButton value="female" />
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Select Role:</Text>
        <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
          <View style={styles.radioButton}>
            <Text>User</Text>
            <RadioButton value="user" />
          </View>
          <View style={styles.radioButton}>
            <Text>Admin</Text>
            <RadioButton value="admin" />
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#3498db',
    borderWidth: 2,
    marginBottom: 20,
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    marginRight: 10,
    color: '#fff',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
