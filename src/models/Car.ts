// export interface Car {
//     id: number;
//     model: string;
//     brand: string;
//     type: string;
//     transmission: string;
//     capacity: string;
//     bags: string;
//     pricePerDay: number;
//     totalPrice: number;
//     image: string;
//   }
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  availability: boolean;
}

export const initialCars: Car[] = [
  { id: 'car1', make: 'Toyota', model: 'Camry', year: 2020, pricePerDay: 50, availability: true },
  { id: 'car2', make: 'Honda', model: 'Civic', year: 2019, pricePerDay: 45, availability: true },
  { id: 'car3', make: 'Ford', model: 'Focus', year: 2018, pricePerDay: 40, availability: false },
  { id: 'car4', make: 'Chevrolet', model: 'Malibu', year: 2021, pricePerDay: 60, availability: true },
  { id: 'car5', make: 'Nissan', model: 'Altima', year: 2017, pricePerDay: 35, availability: false },
  { id: 'car6', make: 'BMW', model: '3 Series', year: 2022, pricePerDay: 80, availability: true },
  { id: 'car7', make: 'Mercedes-Benz', model: 'C-Class', year: 2020, pricePerDay: 90, availability: true },
  { id: 'car8', make: 'Audi', model: 'A4', year: 2019, pricePerDay: 85, availability: false },
  { id: 'car9', make: 'Tesla', model: 'Model 3', year: 2021, pricePerDay: 100, availability: true },
  { id: 'car10', make: 'Hyundai', model: 'Elantra', year: 2018, pricePerDay: 40, availability: true },
];