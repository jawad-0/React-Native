import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet
} from 'react-native';


const App = () => {
    const handleButton1Press = () => {
      console.log('Button 1 pressed');
    };

    const handleButton2Press = () => {
      console.log('Button 2 pressed');
    };

    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.text}>
                -- NAVIGATION -- {"\n"}
            </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={handleButton1Press}
        >
          <Text style={styles.buttonText}>BUTTON 1</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={handleButton2Press}
        >
          <Text style={styles.buttonText}>BUTTON 2</Text>
        </Pressable>
      </View>
    );
  };

  const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 200,
      height: 70,
      backgroundColor: '#00b39b',
      padding: 10,
      margin: 5,
      borderRadius: 30,
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 24,
    },
  });

  export default App;
