import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, FlatList, Modal, StyleSheet } from 'react-native';
import SQLite from  'react-native-sqlite-storage';

const App = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [data, setData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleAddButton = () => {
      setData([...data, { id: data.length + 1, name, department, designation }]);
      setName('');
      setDepartment('');
      setDesignation('');
    };

    const handleDeleteButton = (itemId) => {
      const updatedData = data.filter((item) => item.id !== itemId);
      setData(updatedData);
    };

    const handleUpdateButton = (itemId) => {
        setSelectedItemId(itemId);
        const selectedItem = data.find((item) => item.id === itemId);
        if (selectedItem) {
          setName(selectedItem.name);
          setDepartment(selectedItem.department);
          setDesignation(selectedItem.designation);
        }
      };

      const handleUpdateConfirm = () => {
        const updatedData = data.map((item) =>
          item.id === selectedItemId
            ? { ...item, name, department, designation }
            : item
        );

        setData(updatedData);
        setSelectedItemId(null);
        setName('');
        setDepartment('');
        setDesignation('');
      };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Department"
          value={department}
          onChangeText={(text) => setDepartment(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Designation"
          value={designation}
          onChangeText={(text) => setDesignation(text)}
        />

        <Button title="Add" onPress={handleAddButton} />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>Name: {item.name}</Text>
              <Text>Department: {item.department}</Text>
              <Text>Designation: {item.designation}</Text>

              {/* Buttons for Delete and Update */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDeleteButton(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleUpdateButton(item.id)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Modal visible={selectedItemId !== null} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Update Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Update Department"
              value={department}
              onChangeText={(text) => setDepartment(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Update Designation"
              value={designation}
              onChangeText={(text) => setDesignation(text)}
            />

            <Button title="Update" onPress={handleUpdateConfirm} />
          </View>
        </View>
      </Modal>
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  listItem: {
    fontSize: 24,
    marginBottom: 10,
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
  },
});

export default App;
