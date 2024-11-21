import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { DishesContext } from './DishesContext';

const MenuPage = ({ navigation }: any) => {
  const context = useContext(DishesContext);

  if (!context) {
    return null;
  }

  const { addDish } = context;

  const [selectedValue, setSelectedValue] = useState<string>('0');
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [dishPrice, setDishPrice] = useState('');

  const handleAddDish = () => {
    let courseType = '';
    switch (selectedValue) {
      case '1':
        courseType = 'Starter';
        break;
      case '2':
        courseType = 'Main';
        break;
      case '3':
        courseType = 'Side';
        break;
      case '4':
        courseType = 'Dessert';
        break;
      default:
        Alert.alert(
          'Selection Required',
          'Please select a course type before adding a dish.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return;
    }

    if (!dishName.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter the dish name.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    if (!dishDescription.trim()) {
      Alert.alert(
        'Missing Information',
        'Please describe your dish.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    if (!dishPrice.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter the dish price.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    const priceNumber = parseFloat(dishPrice);
    if (isNaN(priceNumber) || priceNumber < 0) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price for the dish.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    addDish({
      courseType,
      dishName: dishName.trim(),
      dishDescription: dishDescription.trim(),
      dishPrice: priceNumber.toFixed(2),
    });

    // Reset input fields
    setSelectedValue('0');
    setDishName('');
    setDishDescription('');
    setDishPrice('');

    Alert.alert(
      'Success',
      'Dish added successfully!',
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Background Split into Two Colors */}
      <View style={styles.leftSide} />
      <View style={styles.rightSide} />

      <ScrollView style={styles.background} contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>Add New Dish</Text>

        {/* Course Type Selection */}
        <Text style={styles.labelText}>Course Type</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="1"
                status={selectedValue === '1' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('1')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Starter</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="2"
                status={selectedValue === '2' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('2')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Main</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="3"
                status={selectedValue === '3' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('3')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Side</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton.Android
                value="4"
                status={selectedValue === '4' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('4')}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Dessert</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subHeading}>Dish Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter dish name"
          placeholderTextColor="#666"
          onChangeText={(newText) => setDishName(newText)}
          value={dishName}
        />

        <Text style={styles.subHeading}>Dish Description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Enter dish description"
          placeholderTextColor="#666"
          onChangeText={(newText) => setDishDescription(newText)}
          value={dishDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.subHeading}>Dish Price</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter dish price"
          placeholderTextColor="#666"
          onChangeText={(newText) => setDishPrice(newText)}
          value={dishPrice}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Add Dish" onPress={handleAddDish} color="#007BFF" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  leftSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#EBB22F',
    zIndex: -2,
  },
  rightSide: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#991F1F',
    zIndex: -2,
  },
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    padding: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  radioContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  radioLabel: {
    marginLeft: 3,
    fontSize: 14,
    color: 'white',
  },
  subHeading: {
    fontSize: 16,
    paddingVertical: 5,
    color: 'white',
  },
  textInput: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default MenuPage;
