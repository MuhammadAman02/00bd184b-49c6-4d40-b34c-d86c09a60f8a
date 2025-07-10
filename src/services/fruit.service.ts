import { AppError } from '../utils/AppError';

export interface Fruit {
  id: number;
  name: string;
  color: string;
  taste: string;
}

// In-memory fruit data
const fruits: Fruit[] = [
  { id: 1, name: "Apple", color: "red", taste: "sweet" },
  { id: 2, name: "Banana", color: "yellow", taste: "sweet" },
  { id: 3, name: "Orange", color: "orange", taste: "citrus" },
  { id: 4, name: "Grape", color: "purple", taste: "sweet" },
  { id: 5, name: "Lemon", color: "yellow", taste: "sour" },
  { id: 6, name: "Strawberry", color: "red", taste: "sweet" },
  { id: 7, name: "Blueberry", color: "blue", taste: "sweet" },
  { id: 8, name: "Lime", color: "green", taste: "sour" },
  { id: 9, name: "Cherry", color: "red", taste: "sweet" },
  { id: 10, name: "Kiwi", color: "green", taste: "tangy" },
];

export async function getFruits(color?: string, limit: number = 10): Promise<Fruit[]> {
  console.log(`Getting fruits - color filter: ${color || 'none'}, limit: ${limit}`);
  
  let filteredFruits = fruits;
  
  if (color) {
    filteredFruits = fruits.filter(fruit => 
      fruit.color.toLowerCase() === color.toLowerCase()
    );
  }
  
  return filteredFruits.slice(0, limit);
}

export async function getFruitById(id: number): Promise<Fruit> {
  console.log(`Getting fruit by ID: ${id}`);
  
  const fruit = fruits.find(f => f.id === id);
  
  if (!fruit) {
    throw new AppError(`Fruit with ID ${id} not found`, 404);
  }
  
  return fruit;
}