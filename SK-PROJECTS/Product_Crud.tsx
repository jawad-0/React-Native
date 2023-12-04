import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [selectedValue, setSelectedValue] = useState('Select value');
  const [textValue, setTextValue] = useState('');
  const [pickerItems, setPickerItems] = useState([{ label: '--Select value--', value: 'Select value' }]);

  const onButtonPress = () => {
    if (textValue !== '') {
      setPickerItems([...pickerItems, { label: textValue, value: textValue }]);
      setSelectedValue(textValue);
      setTextValue('');
    }
  };

  const onPickerValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Selected Value: {selectedValue}</Text>

      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter a value"
        onChangeText={(text) => setTextValue(text)}
        value={textValue}
      />

      <View style={{ minHeight: 300 }}>
        <Picker
          style={{ width: 200 }}
          selectedValue={selectedValue}
          onValueChange={onPickerValueChange}
        >
          {pickerItems.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <Button title="Add as Picker Value" onPress={onButtonPress} />
    </ScrollView>
  );
}
