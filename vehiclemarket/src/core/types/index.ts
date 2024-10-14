// Définition des types principaux utilisés dans l'application
export interface Vehicle {
  id: number;
  title: string;
  listingType: "sale" | "rent";
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  fuelType: string;
  images: string[];
  createdAt: string;
  sellerId: number;
  rentalDuration?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  userId: number;
  vehicleId: number;
  vehicleTitle: string;
  type: "purchase" | "rental";
  amount: number;
  date: string;
}

export interface Favorite {
  userId: number;
  vehicleId: number;
}
