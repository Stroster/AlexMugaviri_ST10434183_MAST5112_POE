import React, { createContext, useState, ReactNode } from 'react';

export type Dish = {
  id: number;
  courseType: string;
  dishName: string;
  dishDescription: string;
  dishPrice: string;
};

type DishesContextType = {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, 'id'>) => void;
  removeDish: (id: number) => void;
};

export const DishesContext = createContext<DishesContextType | undefined>(undefined);

export const DishesProvider = ({ children }: { children: ReactNode }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = { id: nextId, ...dish };
    setDishes((prevDishes) => [...prevDishes, newDish]);
    setNextId((prevId) => prevId + 1);
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
