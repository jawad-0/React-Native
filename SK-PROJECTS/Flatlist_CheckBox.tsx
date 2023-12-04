import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

function App() {
  const languages = [
    'Java',
    'JavaScript',
    'C-Sharp',
    'Python',
    'PHP',
    'Node',
    'Angular',
    'Dart',
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
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
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: 'white',
      marginRight: 10,
    },
  });

  const toggleLanguageSelection = (language) => {
    setSelectedLanguages((prevSelectedLanguages) =>
      prevSelectedLanguages.includes(language)
        ? prevSelectedLanguages.filter((lang) => lang !== language)
        : [...prevSelectedLanguages, language]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' , paddingLeft: 40}}>
      <View>
        <Text style={myStyle.txt1}>Top Languages 💛 {"\n"}</Text>
        <FlatList
          data={languages}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleLanguageSelection(item)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={myStyle.checkbox}>
                {selectedLanguages.includes(item) && (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'yellow',
                    }}
                  />
                )}
              </View>
              <Text style={myStyle.txt2}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default App;
