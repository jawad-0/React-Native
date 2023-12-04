import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      result: '',
    };
  }

  handleInput = (value) => {
    if (value === '=') {
      try {
        this.setState({
          result: eval(this.state.input).toString(),
        });
      } catch (error) {
        this.setState({ result: 'Error' });
      }
    } else if (value === 'C') {
      this.setState({ input: '', result: '' });
    } else if (value === '⌫') {
        this.setState({
          input: this.state.input.slice(0, -1),
        });
    } else {
      this.setState({ input: this.state.input + value });
    }
  };

  renderButton = (value) => (
    <TouchableOpacity
      key={value}
      style={styles.button}
      onPress={() => this.handleInput(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  render() {
    const buttons = [
      '1','2','3','+',
      '4','5','6','-',
      '7','8','9','-',
      '/','0','=','⌫',
    ];

    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.txt1}>{'\n'} CALCULATOR 🧡</Text>
        <Text style={styles.name}>
          By M.Jawad Gujjar ©
          {'\n'}
        </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{this.state.input}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{this.state.result}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {buttons.slice(0, 4).map((button) => this.renderButton(button))}
          </View>
          <View style={styles.buttonRow}>
            {buttons.slice(4, 8).map((button) => this.renderButton(button))}
          </View>
          <View style={styles.buttonRow}>
            {buttons.slice(8, 12).map((button) => this.renderButton(button))}
          </View>
          <View style={styles.buttonRow}>
            {buttons.slice(12, 16).map((button) => this.renderButton(button))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  result: {
    fontSize: 40,
    color: '#333',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  input: {
    fontSize: 40,
    color: '#333',
  },
  buttonContainer: {
    flex: 4,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    margin: 5,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 40,
    color: 'white',
  },
  txt1: {
    fontSize: 35,
    fontFamily: 'fantasy',
    alignSelf: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
  name: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'fantasy',
  },
});

export default App;
