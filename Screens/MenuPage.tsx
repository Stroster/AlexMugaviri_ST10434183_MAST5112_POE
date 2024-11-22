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

  const { addDish, removeDish, dishes } = context;

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

    if (!dishName.trim() || !dishDescription.trim() || !dishPrice.trim()) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the fields.',
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

  const handleRemoveDish = (id: number) => {
    removeDish(id);
    Alert.alert(
      'Success',
      `Dish removed successfully!`,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftSide} />
      <View style={styles.rightSide} />

      <ScrollView style={styles.background} contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>Add New Dish</Text>

        <Text style={styles.labelText}>Course Type</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            {['Starter', 'Main', 'Side', 'Dessert'].map((label, index) => (
              <View style={styles.radioButton} key={label}>
                <RadioButton.Android
                  value={String(index + 1)}
                  status={selectedValue === String(index + 1) ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue(String(index + 1))}
                  color="#007BFF"
                />
                <Text style={styles.radioLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.subHeading}>Dish Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter dish name"
          placeholderTextColor="#666"
          onChangeText={setDishName}
          value={dishName}
        />

        <Text style={styles.subHeading}>Dish Description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Enter dish description"
          placeholderTextColor="#666"
          onChangeText={setDishDescription}
          value={dishDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.subHeading}>Dish Price</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter dish price"
          placeholderTextColor="#666"
          onChangeText={setDishPrice}
          value={dishPrice}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Add Dish" onPress={handleAddDish} color="#007BFF" />
        </View>

        <Text style={styles.subHeading}>Current Menu</Text>
        {dishes.map((dish) => (
          <View key={dish.id} style={styles.dishItem}>
            <Text style={styles.dishName}>{dish.dishName}</Text>
            <Button title="Remove" onPress={() => handleRemoveDish(dish.id)} color="#FF0000" />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} color="#007BFF" />
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
    marginBottom: 20,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  radioLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 10,
  },
  dishItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuPage;
