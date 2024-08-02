import { CarService } from "../services/car/carService";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlateNumber: string,
  pricePerDay: number;
  availability: boolean;
}

// const car = new CarService();
// car.getAllCars();

export const initialCars: Car[] =
[
  { id: 'car1', make: 'Toyota', model: 'Camry', year: 2020, licensePlateNumber: 'IOWA 531 JKY Jefferson', pricePerDay: 50, availability: true },
  { id: 'car2', make: 'Honda', model: 'Civic', year: 2019, licensePlateNumber: 'IOWA 532 JKY Jefferson', pricePerDay: 45, availability: true },
  { id: 'car3', make: 'Ford', model: 'Focus', year: 2018, licensePlateNumber: 'IOWA 533 JKY Jefferson', pricePerDay: 40, availability: false },
  { id: 'car4', make: 'Chevrolet', model: 'Malibu', year: 2021, licensePlateNumber: 'IOWA 535 JKY Jefferson', pricePerDay: 60, availability: true },
  { id: 'car5', make: 'Nissan', model: 'Altima', year: 2017, licensePlateNumber: 'IOWA 536 JKY Jefferson', pricePerDay: 35, availability: false },
  { id: 'car6', make: 'BMW', model: '3 Series', year: 2022, licensePlateNumber: 'IOWA 537 JKY Jefferson', pricePerDay: 80, availability: true },
  { id: 'car7', make: 'Mercedes-Benz', model: 'C-Class', year: 2020, licensePlateNumber: 'IOWA 538 JKY Jefferson', pricePerDay: 90, availability: true },
  { id: 'car8', make: 'Audi', model: 'A4', year: 2019, licensePlateNumber: 'IOWA 539 JKY Jefferson', pricePerDay: 85, availability: false },
  { id: 'car9', make: 'Tesla', model: 'Model 3', year: 2021, licensePlateNumber: 'IOWA 5310 JKY Jefferson', pricePerDay: 100, availability: true },
  { id: 'car10', make: 'Hyundai', model: 'Elantra', year: 2018, licensePlateNumber: 'IOWA 5311 JKY Jefferson', pricePerDay: 40, availability: true },
];

// const updateInitialCars = async () => {
//   try {
//       const fetchedCars = await car.getAllCars();
//       initialCars = fetchedCars;
//       console.log(initialCars);
//   } catch (error) {
//       console.error("Error fetching cars:", error);
//   }
// };

// updateInitialCars();