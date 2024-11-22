import React, { createContext, useState, ReactNode } from 'react';

export interface Dish {
  id: number;
  courseType: string;
  dishName: string;
  dishDescription: string;
  dishPrice: string;
}

interface DishesContextProps {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, 'id'>) => void;
  removeDish: (id: number) => void;
}

export const DishesContext = createContext<DishesContextProps | null>(null);

export const DishesProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      id: dishes.length > 0 ? dishes[dishes.length - 1].id + 1 : 1,
      ...dish,
    };
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  const removeDish = (id: number) => {
    setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== id));
  };

  return (
    <DishesContext.Provider value={{ dishes, addDish, removeDish }}>
      {children}
    </DishesContext.Provider>
  );
};
