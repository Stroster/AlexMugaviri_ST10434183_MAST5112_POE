// HomePage.tsx
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { DishesContext, Dish } from './DishesContext';

const HomePage = ({ navigation }: any) => {
  const context = useContext(DishesContext);

  if (!context) {
    return null;
  }

  const { dishes, removeDish } = context;

  const handleRemoveDish = (id: number) => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this dish?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeDish(id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Background Split into Two Colors */}
      <View style={styles.leftSide} />
      <View style={styles.rightSide} />

      <ScrollView style={styles.background} contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>Christoffels Restaurant</Text>

        <Button
          title="Add to Menu"
          onPress={() => navigation.navigate('Menu')}
          color="#007BFF"
        />

        <Text style={styles.totalItemsText}>Total Menu Items: {dishes.length}</Text>

        {dishes.map((dish: Dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <Text style={styles.courseType}>{dish.courseType}</Text>
            <Text style={styles.dishName}>{dish.dishName}</Text>
            <Text style={styles.dishDescription}>{dish.dishDescription}</Text>
            <Text style={styles.dishPrice}>Price: R{dish.dishPrice}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveDish(dish.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
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
    textAlign: 'center',
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
  removeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomePage;
