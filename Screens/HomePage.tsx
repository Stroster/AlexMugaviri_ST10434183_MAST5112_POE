import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DishesContext, Dish } from './DishesContext';

const HomePage = ({ navigation }: any) => {
  const context = useContext(DishesContext);

  if (!context) {
    return null;
  }

  const { dishes } = context;
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const filteredDishes =
    selectedCourse === 'All'
      ? dishes
      : dishes.filter((dish) => dish.courseType === selectedCourse);

  const courses = ['Starter', 'Main', 'Side', 'Dessert'];

  // Function to calculate the average price of dishes by course
  const calculateAveragePriceByCourse = () => {
    const averages: { [key: string]: number } = {};
    courses.forEach((course) => {
      const courseDishes = dishes.filter((dish) => dish.courseType === course);
      if (courseDishes.length > 0) {
        const total = courseDishes.reduce(
          (sum, dish) => sum + parseFloat(dish.dishPrice),
          0
        );
        averages[course] = parseFloat((total / courseDishes.length).toFixed(2));
      } else {
        averages[course] = 0;
      }
    });
    return averages;
  };

  const averagePrices = calculateAveragePriceByCourse();

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftSide} />
      <View style={styles.rightSide} />

      <ScrollView style={styles.background} contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>Christoffels Restaurant</Text>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by Course:</Text>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(itemValue) => setSelectedCourse(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            {courses.map((course) => (
              <Picker.Item key={course} label={course} value={course} />
            ))}
          </Picker>
        </View>

        <Button
          title="Add to Menu"
          onPress={() => navigation.navigate('Menu')}
          color="#007BFF"
        />

        <Text style={styles.totalItemsText}>Total Menu Items: {dishes.length}</Text>

        <View style={styles.averagesContainer}>
          <Text style={styles.averageHeading}>Average Prices by Course:</Text>
          {courses.map((course) => (
            <Text key={course} style={styles.averageText}>
              {course}: R{averagePrices[course]}
            </Text>
          ))}
        </View>

        {filteredDishes.map((dish: Dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <Text style={styles.courseType}>{dish.courseType}</Text>
            <Text style={styles.dishName}>{dish.dishName}</Text>
            <Text style={styles.dishDescription}>{dish.dishDescription}</Text>
            <Text style={styles.dishPrice}>Price: R{dish.dishPrice}</Text>
          </View>
        ))}
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
  totalItemsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white',
    textAlign: 'left',
  },
  filterContainer: {
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 10,
  },
  filterLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
  },
  averagesContainer: {
    marginVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
  },
  averageHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  averageText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 3,
  },
  dishContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  courseType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#007BFF',
  },
  dishName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
    color: '#333',
  },
  dishDescription: {
    fontSize: 12,
    marginBottom: 3,
    color: '#555',
  },
  dishPrice: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
});

export default HomePage;
