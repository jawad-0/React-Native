import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const years = Array.from({ length: 10 }, (_, i) => `${2022 + i}`);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text>Day:</Text>
        <Picker
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="" value="" />
          {days.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.dropdownContainer}>
        <Text>Month:</Text>
        <Picker
          selectedValue={month}
          onValueChange={(itemValue) => setMonth(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="" value="" />
          {months.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.dropdownContainer}>
        <Text>Year:</Text>
        <Picker
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="" value="" />
          {years.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default App;
